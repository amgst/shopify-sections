import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Request logging for /api routes
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse = undefined;
    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };
    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }
            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }
            log(logLine);
        }
    });
    next();
});
async function initApp() {
    const server = await registerRoutes(app);
    app.use((err, _req, res, _next) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
        // Log the error instead of throwing to avoid crashing the server
        console.error("API error:", err);
    });
    // In development, set up Vite middleware for HMR.
    // In production (including Vercel), serve prebuilt static assets.
    if (app.get("env") === "development") {
        await setupVite(app, server);
    }
    else {
        serveStatic(app);
    }
    return server;
}
const isVercel = !!process.env.VERCEL;
const initPromise = initApp();
// Export a serverless handler for Vercel.
export default async function handler(req, res) {
    await initPromise;
    app(req, res);
}
// Local / non-serverless execution: start a listener
if (!isVercel) {
    (async () => {
        const server = await initPromise;
        // Try a list of ports to avoid EADDRINUSE
        const primary = parseInt(process.env.PORT || "3000", 10);
        const portsToTry = [primary, 3001, 3002, 5174];
        let listenedPort;
        for (const p of portsToTry) {
            try {
                await new Promise((resolve, reject) => {
                    const onError = (err) => {
                        server.off("error", onError);
                        reject(err);
                    };
                    server.once("error", onError);
                    server.listen({ port: p, host: "localhost" }, () => {
                        server.off("error", onError);
                        resolve();
                    });
                });
                listenedPort = p;
                break;
            }
            catch (e) {
                if ((e === null || e === void 0 ? void 0 : e.code) !== "EADDRINUSE") {
                    console.error("Failed to start server:", e);
                }
            }
        }
        if (!listenedPort) {
            throw new Error("No available port to start server");
        }
        log(`serving on port ${listenedPort}`);
    })();
}

import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import viteConfig from "../../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
const viteLogger = createLogger();
export function log(message, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}
export async function setupVite(app, server) {
    const serverOptions = {
        middlewareMode: true,
        hmr: { server },
        allowedHosts: true,
    };
    const vite = await createViteServer(Object.assign(Object.assign({}, viteConfig), { configFile: false, customLogger: Object.assign(Object.assign({}, viteLogger), { error: (msg, options) => {
                viteLogger.error(msg, options);
                process.exit(1);
            } }), server: serverOptions, appType: "custom" }));
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
            const clientTemplate = path.resolve(import.meta.dirname, "..", "..", "client", "index.html");
            // always reload the index.html file from disk incase it changes
            let template = await fs.promises.readFile(clientTemplate, "utf-8");
            template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
            const page = await vite.transformIndexHtml(url, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(page);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
}
export function serveStatic(app) {
    // Resolve base directory in both ESM and CJS environments
    const baseDir = typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));
    // Candidate paths for built client assets
    const candidates = [
        path.resolve(process.cwd(), "dist", "public"),
        path.resolve(baseDir, "public"),
        path.resolve(baseDir, "..", "public"),
    ];
    const distPath = candidates.find((p) => fs.existsSync(p));
    if (!distPath) {
        console.warn("Could not find the build directory. Checked:", candidates.join(", "));
        // Minimal fallback to avoid crashing the function
        app.get("*", (_req, res) => {
            res
                .status(200)
                .send("<!doctype html><html><head><meta charset=\"utf-8\"><title>App</title></head><body><div id=\"root\"></div></body></html>");
        });
        return;
    }
    app.use(express.static(distPath));
    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}

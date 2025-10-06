import type { IncomingMessage, ServerResponse } from "http";
import { insertSectionSchema } from "../../shared/schema";
import { storage } from "../../server/storage";

async function readJson(req: IncomingMessage): Promise<any> {
  // If body is already parsed by Vercel, use it
  const anyReq = req as any;
  if (typeof anyReq.body !== "undefined") return anyReq.body;

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req
      .on("data", (chunk) => chunks.push(Buffer.from(chunk)))
      .on("end", () => {
        try {
          const raw = Buffer.concat(chunks).toString("utf8");
          if (!raw) return resolve({});
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(e);
        }
      })
      .on("error", reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req as any).method || "GET";

  try {
    if (method === "GET") {
      const sections = await storage.getAllSections();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(sections));
      return;
    }

    if (method === "POST") {
      const body = await readJson(req);
      const validated = insertSectionSchema.parse(body);
      const created = await storage.createSection(validated);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(created));
      return;
    }

    if (method === "DELETE") {
      const deleted = await storage.deleteAllSections();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ deleted }));
      return;
    }

    res.statusCode = 405;
    res.setHeader("Allow", "GET,POST,DELETE");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error?.message || "Internal Server Error" }));
  }
}
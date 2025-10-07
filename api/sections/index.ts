import type { IncomingMessage, ServerResponse } from "http";
import { insertSectionSchema } from "@shared/schema";
import { storage } from "@server/storage";

function genReqId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

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
  const reqId = genReqId();

  try {
    if (method === "GET") {
      console.log(`[sections] GET start req=${reqId}`);
      const sections = await storage.getAllSections();
      console.log(`[sections] GET ok req=${reqId} count=${sections.length}`);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(sections));
      return;
    }

    if (method === "POST") {
      const body = await readJson(req);
      const validated = insertSectionSchema.parse(body);
      const created = await storage.createSection(validated);
      console.log(`[sections] POST ok req=${reqId} id=${created.id}`);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(created));
      return;
    }

    if (method === "DELETE") {
      const deleted = await storage.deleteAllSections();
      console.log(`[sections] DELETE ok req=${reqId} deleted=${deleted}`);
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
    console.error(`[sections] error req=${reqId}`, error);
    const message = error?.message || "Internal Server Error";
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message, name: error?.name }));
  }
}
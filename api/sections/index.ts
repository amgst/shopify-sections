import type { IncomingMessage, ServerResponse } from "http";
import { insertSectionSchema, type Section } from "../shared/schema.js";
import { storage } from "../server/storage.js";

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
      const url = new URL((req as any).url || '/', `http://localhost`);
      const slug = url.searchParams.get('slug');
      const sections = await storage.getAllSections();

      if (slug) {
        // simple slugify helper to match client-side slugify
        const slugify = (text: string) =>
          text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/&/g, '-and-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');

  const found = (sections as Section[]).find((s) => slugify(s.title) === slug);
        if (!found) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Not Found' }));
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(found));
        return;
      }

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
    // Check if caller requested debug info or DEBUG_API is enabled
    const url = new URL((req as any).url || '/', `http://localhost`);
    const wantDebug = process.env.DEBUG_API === 'true' || url.searchParams.get('debug') === '1';

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    if (wantDebug) {
      res.end(JSON.stringify({ message, name: error?.name, stack: error?.stack }));
    } else {
      res.end(JSON.stringify({ message, name: error?.name }));
    }
  }
}
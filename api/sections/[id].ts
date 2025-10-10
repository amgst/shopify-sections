import type { IncomingMessage, ServerResponse } from "http";
import { storage } from "../server/storage.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req as any).method || "GET";
  const url = new URL((req as any).url || "", "http://x");
  const idOrSlug = url.pathname.split("/").pop();

  if (!idOrSlug) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Missing id or slug" }));
    return;
  }

  try {
    if (method === "GET") {
      // Try ID first, then fallback to slug for backward compatibility
      let section = await storage.getSectionById(idOrSlug);
      if (!section) {
        section = await storage.getSectionBySlug(idOrSlug);
      }
      if (!section) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Section not found" }));
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(section));
      return;
    }

    if (method === "DELETE") {
      await storage.deleteSection(idOrSlug);
      res.statusCode = 204;
      res.end();
      return;
    }

    res.statusCode = 405;
    res.setHeader("Allow", "GET,DELETE");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method Not Allowed" }));
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error?.message || "Internal Server Error" }));
  }
}

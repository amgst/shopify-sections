import type { IncomingMessage, ServerResponse } from "http";
import { storage } from "../server/storage.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req as any).method || "GET";
  const url = new URL((req as any).url || "", "http://x");
  const id = url.pathname.split("/").pop();

  if (!id) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Missing id" }));
    return;
  }

  try {
    if (method === "GET") {
      const section = await storage.getSectionById(id);
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
      await storage.deleteSection(id);
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
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSectionSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/sections", async (_req, res) => {
    try {
      const sections = await storage.getAllSections();
      res.json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/sections/:id", async (req, res) => {
    try {
      const section = await storage.getSectionById(req.params.id);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(section);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/sections", async (req, res) => {
    try {
      const validatedData = insertSectionSchema.parse(req.body);
      const section = await storage.createSection(validatedData);
      res.status(201).json(section);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete a specific section by ID
  app.delete("/api/sections/:id", async (req, res) => {
    try {
      await storage.deleteSection(req.params.id);
      res.status(204).end();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete all sections (use carefully)
  app.delete("/api/sections", async (_req, res) => {
    try {
      const deleted = await storage.deleteAllSections();
      res.json({ deleted });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

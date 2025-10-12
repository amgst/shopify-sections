import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertSectionSchema, updateSectionSchema } from "../shared/schema.js";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/sections", async (_req, res) => {
    try {
      const sections = await storage.getAllSections();
      res.json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/sections/:idOrSlug", async (req, res) => {
    try {
      // Try ID first (most reliable), then fallback to slug for backward compatibility
      let section = await storage.getSectionById(req.params.idOrSlug);
      if (!section) {
        section = await storage.getSectionBySlug(req.params.idOrSlug);
      }
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

  app.patch("/api/sections/:id", async (req, res) => {
    try {
      const validatedData = updateSectionSchema.parse({ ...req.body, id: req.params.id });
      const section = await storage.updateSection(validatedData);
      res.json(section);
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

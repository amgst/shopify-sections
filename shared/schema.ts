import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const sections = pgTable("sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  downloads: integer("downloads").notNull().default(0),
  isPremium: boolean("is_premium").notNull().default(false),
  filters: text("filters").array().notNull().default(sql`ARRAY[]::text[]`),
});

export const insertSectionSchema = createInsertSchema(sections).omit({
  id: true,
});

export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sections.$inferSelect;

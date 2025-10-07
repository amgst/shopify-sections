import { z } from "zod";

// User schemas and types
export const insertUserSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});
export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = {
  id: string;
  username: string;
  password?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
};

// Section schemas and types
export const insertSectionSchema = z.object({
  title: z.string().min(1, "title is required"),
  category: z.string().min(1, "category is required"),
  description: z.string().min(1, "description is required"),
  thumbnailUrl: z.string().min(1, "thumbnailUrl is required"),
  downloads: z.number().int().nonnegative().optional(),
  isPremium: z.boolean().optional(),
  filters: z.array(z.string()).optional(),
});
export type InsertSection = z.infer<typeof insertSectionSchema>;

export type Section = {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  downloads: number;
  isPremium: boolean;
  filters: string[];
  createdAt: Date;
  updatedAt: Date;
};

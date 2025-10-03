import { users, sections, type User, type InsertUser, type Section, type InsertSection } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllSections(): Promise<Section[]>;
  getSectionById(id: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
}

// Mock storage implementation with predefined data
export class MockStorage implements IStorage {
  private mockUsers: User[] = [
    {
      id: "1",
      username: "demo",
      email: "demo@example.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private mockSections: Section[] = [
    {
      id: "1",
      title: "Hero Banner",
      category: "Hero",
      description: "A hero banner section with background image and call-to-action",
      thumbnailUrl: "/attached_assets/generated_images/Hero_banner_section_25f20588.png",
      downloads: 245,
      isPremium: false,
      filters: ["hero", "banner"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      title: "Product Showcase",
      category: "Products",
      description: "Display featured products in a grid layout",
      thumbnailUrl: "/attached_assets/generated_images/Product_showcase_section_8816f20f.png",
      downloads: 189,
      isPremium: false,
      filters: ["products", "grid"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "3",
      title: "Collection Grid",
      category: "Collections",
      description: "Display product collections in a grid",
      thumbnailUrl: "/attached_assets/generated_images/Collection_grid_section_e9154ec7.png",
      downloads: 156,
      isPremium: false,
      filters: ["collections", "grid"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "4",
      title: "Newsletter",
      category: "Marketing",
      description: "Email signup form with background image",
      thumbnailUrl: "/attached_assets/generated_images/Newsletter_section_b8bc082f.png",
      downloads: 132,
      isPremium: false,
      filters: ["marketing", "email"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "5",
      title: "Testimonials",
      category: "Social Proof",
      description: "Customer testimonials with images",
      thumbnailUrl: "/attached_assets/generated_images/Testimonials_section_8a78ef44.png",
      downloads: 98,
      isPremium: true,
      filters: ["testimonials", "social proof"],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async getUser(id: string): Promise<User | undefined> {
    return this.mockUsers.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.mockUsers.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      ...insertUser,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockUsers.push(newUser);
    return newUser;
  }

  async getAllSections(): Promise<Section[]> {
    return this.mockSections;
  }

  async getSectionById(id: string): Promise<Section | undefined> {
    return this.mockSections.find(section => section.id === id);
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const newSection: Section = {
      ...insertSection,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockSections.push(newSection);
    return newSection;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllSections(): Promise<Section[]> {
    const allSections = await db.select().from(sections);
    return allSections;
  }

  async getSectionById(id: string): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.id, id));
    return section || undefined;
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db
      .insert(sections)
      .values(insertSection)
      .returning();
    return section;
  }
}

export const storage = new MockStorage(); // Using mock storage instead of database

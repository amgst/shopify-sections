import { type User, type InsertUser, type Section, type InsertSection } from "../shared/schema";
// firebase-admin removed
import { initializeApp as initializeClientApp } from "firebase/app";
import { initializeFirestore, collection, query, orderBy, getDocs, doc as clientDoc, getDoc as getClientDoc, addDoc, Timestamp as ClientTimestamp, deleteDoc } from "firebase/firestore";
import { randomUUID } from "crypto";

// Initialize Firebase Web SDK only (no Admin)
let webFirestore: import("firebase/firestore").Firestore | undefined;

// Helper to read env from FIREBASE_* or fallback to VITE_FIREBASE_*
const readEnv = (key: string): string | undefined => {
  const direct = process.env[key];
  if (typeof direct === "string" && direct.trim().length > 0) return direct.trim();
  const viteKey = key.startsWith("FIREBASE_") ? `VITE_${key}` : key;
  const viteVal = process.env[viteKey];
  if (typeof viteVal === "string" && viteVal.trim().length > 0) return viteVal.trim();
  return undefined;
};

const requiredFirebaseKeys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];
const hasAllFirebaseEnv = requiredFirebaseKeys.every((k) => !!readEnv(k));
if (hasAllFirebaseEnv) {
  try {
    const firebaseConfig = {
      apiKey: readEnv("FIREBASE_API_KEY")!,
      authDomain: readEnv("FIREBASE_AUTH_DOMAIN")!,
      projectId: readEnv("FIREBASE_PROJECT_ID")!,
      storageBucket: readEnv("FIREBASE_STORAGE_BUCKET")!,
      messagingSenderId: readEnv("FIREBASE_MESSAGING_SENDER_ID")!,
      appId: readEnv("FIREBASE_APP_ID")!,
    };
    const webApp = initializeClientApp(firebaseConfig);
    webFirestore = initializeFirestore(webApp, {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true,
    });
  } catch (e) {
    console.warn("Firebase Web SDK initialization failed. Falling back to MemoryStorage.", e);
  }
} else {
  const missing = requiredFirebaseKeys.filter((k) => !readEnv(k));
  console.warn(
    `Missing Firebase environment variables (${missing.join(", ")}). Using in-memory storage fallback for sections API.`,
  );
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllSections(): Promise<Section[]>;
  getSectionById(id: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
  // Deletion APIs
  deleteSection(id: string): Promise<void>;
  deleteAllSections(): Promise<number>;
}

// Mock storage implementation with predefined data
// MockStorage removed
// Firebase-backed storage implementation
// FirebaseStorage removed
class WebFirebaseStorage implements IStorage {
  constructor(private fs: import("firebase/firestore").Firestore) {}

  async getUser(id: string): Promise<User | undefined> {
    const ref = clientDoc(this.fs, "users", id);
    const snap = await getClientDoc(ref);
    if (!snap.exists()) return undefined;
    const data: any = snap.data();
    return {
      id: snap.id,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
    } as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const q = query(collection(this.fs, "users"));
    const all = await getDocs(q);
    const doc = all.docs.find((d) => (d.data() as any).username === username);
    if (!doc) return undefined;
    const data: any = doc.data();
    return {
      id: doc.id,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
    } as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const now = new Date();
    const payload = {
      username: insertUser.username,
      password: insertUser.password,
      createdAt: ClientTimestamp.fromDate(now),
      updatedAt: ClientTimestamp.fromDate(now),
    };
    const colRef = collection(this.fs, "users");
    const docRef = await addDoc(colRef, payload);
    return {
      id: docRef.id,
      username: insertUser.username,
      password: insertUser.password,
      createdAt: now,
      updatedAt: now,
    } as User;
  }

  async getAllSections(): Promise<Section[]> {
    const q = query(collection(this.fs, "sections"));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
      const data: any = doc.data();
      const createdAtVal = data?.createdAt
        ? (data.createdAt instanceof ClientTimestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt))
        : new Date(0);
      const updatedAtVal = data?.updatedAt
        ? (data.updatedAt instanceof ClientTimestamp
            ? data.updatedAt.toDate()
            : new Date(data.updatedAt))
        : new Date(0);
      return {
        id: doc.id,
        title: data.title,
        category: data.category,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        downloads: data.downloads ?? 0,
        isPremium: !!data.isPremium,
        filters: Array.isArray(data.filters) ? data.filters : [],
        createdAt: createdAtVal,
        updatedAt: updatedAtVal,
      } as Section;
    });
  }

  async getSectionById(id: string): Promise<Section | undefined> {
    const ref = clientDoc(this.fs, "sections", id);
    const snap = await getClientDoc(ref);
    if (!snap.exists()) return undefined;
    const data: any = snap.data();
    return {
      id: snap.id,
      title: data.title,
      category: data.category,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      downloads: data.downloads ?? 0,
      isPremium: !!data.isPremium,
      filters: Array.isArray(data.filters) ? data.filters : [],
      createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
    } as Section;
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const now = new Date();
    const payload = {
      title: insertSection.title,
      category: insertSection.category,
      description: insertSection.description,
      thumbnailUrl: insertSection.thumbnailUrl,
      downloads: insertSection.downloads ?? 0,
      isPremium: !!insertSection.isPremium,
      filters: insertSection.filters ?? [],
      createdAt: ClientTimestamp.fromDate(now),
      updatedAt: ClientTimestamp.fromDate(now),
    };
    const colRef = collection(this.fs, "sections");
    const docRef = await addDoc(colRef, payload);
    return {
      id: docRef.id,
      ...insertSection,
      downloads: insertSection.downloads ?? 0,
      isPremium: !!insertSection.isPremium,
      filters: insertSection.filters ?? [],
      createdAt: now,
      updatedAt: now,
    } as Section;
  }

  async deleteSection(id: string): Promise<void> {
    const ref = clientDoc(this.fs, "sections", id);
    await deleteDoc(ref);
  }

  async deleteAllSections(): Promise<number> {
    const q = query(collection(this.fs, "sections"));
    const snap = await getDocs(q);
    let count = 0;
    for (const doc of snap.docs) {
      await deleteDoc(clientDoc(this.fs, "sections", doc.id));
      count++;
    }
    return count;
  }
}

// Fallback in-memory storage used if Firebase cannot be initialized
class MemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private sections = new Map<string, Section>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const u of this.users.values()) {
      if (u.username === username) return u;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const now = new Date();
    const user: User = {
      id: randomUUID(),
      username: insertUser.username,
      // @ts-expect-error password exists on InsertUser but not on User in shared types
      password: (insertUser as any).password,
      createdAt: now,
      updatedAt: now,
    } as User;
    this.users.set(user.id, user);
    return user;
  }

  async getAllSections(): Promise<Section[]> {
    return Array.from(this.sections.values());
  }

  async getSectionById(id: string): Promise<Section | undefined> {
    return this.sections.get(id);
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const now = new Date();
    const section: Section = {
      id: randomUUID(),
      title: insertSection.title,
      category: insertSection.category,
      description: insertSection.description,
      thumbnailUrl: insertSection.thumbnailUrl,
      downloads: insertSection.downloads ?? 0,
      isPremium: !!insertSection.isPremium,
      filters: insertSection.filters ?? [],
      createdAt: now,
      updatedAt: now,
    };
    this.sections.set(section.id, section);
    return section;
  }

  async deleteSection(id: string): Promise<void> {
    this.sections.delete(id);
  }

  async deleteAllSections(): Promise<number> {
    const count = this.sections.size;
    this.sections.clear();
    return count;
  }
}

// Export storage preferring Firebase Web SDK, else fallback to memory implementation
export const storage: IStorage = webFirestore
  ? new WebFirebaseStorage(webFirestore)
  : new MemoryStorage();

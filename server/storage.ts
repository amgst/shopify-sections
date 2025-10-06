import { type User, type InsertUser, type Section, type InsertSection } from "@shared/schema";
// firebase-admin removed
import { initializeApp as initializeClientApp } from "firebase/app";
import { initializeFirestore, collection, query, orderBy, getDocs, doc as clientDoc, getDoc as getClientDoc, addDoc, Timestamp as ClientTimestamp, deleteDoc } from "firebase/firestore";

// Initialize Firebase Web SDK only (no Admin)
let webFirestore: import("firebase/firestore").Firestore | undefined;
if (true) {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY!,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.FIREBASE_APP_ID!,
    };
    const webApp = initializeClientApp(firebaseConfig);
    webFirestore = initializeFirestore(webApp, {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true,
    });
  } catch (e) {
    console.warn("Firebase Web SDK initialization failed. Falling back to MockStorage.", e);
  }
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

// Export storage preferring Admin, else Web SDK
export const storage: IStorage = new WebFirebaseStorage(webFirestore!);

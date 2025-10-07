// firebase-admin removed
import { initializeApp as initializeClientApp } from "firebase/app";
import { initializeFirestore, collection, query, getDocs, doc as clientDoc, getDoc as getClientDoc, addDoc, Timestamp as ClientTimestamp, deleteDoc } from "firebase/firestore";
import { randomUUID } from "crypto";
// Initialize Firebase Web SDK only (no Admin)
let webFirestore;
// Helper to read env from FIREBASE_* or fallback to VITE_FIREBASE_*
const readEnv = (key) => {
    const direct = process.env[key];
    if (typeof direct === "string" && direct.trim().length > 0)
        return direct.trim();
    const viteKey = key.startsWith("FIREBASE_") ? `VITE_${key}` : key;
    const viteVal = process.env[viteKey];
    if (typeof viteVal === "string" && viteVal.trim().length > 0)
        return viteVal.trim();
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
            apiKey: readEnv("FIREBASE_API_KEY"),
            authDomain: readEnv("FIREBASE_AUTH_DOMAIN"),
            projectId: readEnv("FIREBASE_PROJECT_ID"),
            storageBucket: readEnv("FIREBASE_STORAGE_BUCKET"),
            messagingSenderId: readEnv("FIREBASE_MESSAGING_SENDER_ID"),
            appId: readEnv("FIREBASE_APP_ID"),
        };
        const webApp = initializeClientApp(firebaseConfig);
        webFirestore = initializeFirestore(webApp, {
            experimentalForceLongPolling: true,
            ignoreUndefinedProperties: true,
        });
    }
    catch (e) {
        console.warn("Firebase Web SDK initialization failed. Falling back to MemoryStorage.", e);
    }
}
else {
    const missing = requiredFirebaseKeys.filter((k) => !readEnv(k));
    console.warn(`Missing Firebase environment variables (${missing.join(", ")}). Using in-memory storage fallback for sections API.`);
}
// Mock storage implementation with predefined data
// MockStorage removed
// Firebase-backed storage implementation
// FirebaseStorage removed
class WebFirebaseStorage {
    constructor(fs) {
        this.fs = fs;
    }
    async getUser(id) {
        const ref = clientDoc(this.fs, "users", id);
        const snap = await getClientDoc(ref);
        if (!snap.exists())
            return undefined;
        const data = snap.data();
        return {
            id: snap.id,
            username: data.username,
            email: data.email,
            createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        };
    }
    async getUserByUsername(username) {
        const q = query(collection(this.fs, "users"));
        const all = await getDocs(q);
        const doc = all.docs.find((d) => d.data().username === username);
        if (!doc)
            return undefined;
        const data = doc.data();
        return {
            id: doc.id,
            username: data.username,
            email: data.email,
            createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        };
    }
    async createUser(insertUser) {
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
        };
    }
    async getAllSections() {
        const q = query(collection(this.fs, "sections"));
        const snap = await getDocs(q);
        return snap.docs.map((doc) => {
            var _a;
            const data = doc.data();
            const createdAtVal = (data === null || data === void 0 ? void 0 : data.createdAt)
                ? (data.createdAt instanceof ClientTimestamp
                    ? data.createdAt.toDate()
                    : new Date(data.createdAt))
                : new Date(0);
            const updatedAtVal = (data === null || data === void 0 ? void 0 : data.updatedAt)
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
                downloads: (_a = data.downloads) !== null && _a !== void 0 ? _a : 0,
                isPremium: !!data.isPremium,
                filters: Array.isArray(data.filters) ? data.filters : [],
                createdAt: createdAtVal,
                updatedAt: updatedAtVal,
            };
        });
    }
    async getSectionById(id) {
        var _a;
        const ref = clientDoc(this.fs, "sections", id);
        const snap = await getClientDoc(ref);
        if (!snap.exists())
            return undefined;
        const data = snap.data();
        return {
            id: snap.id,
            title: data.title,
            category: data.category,
            description: data.description,
            thumbnailUrl: data.thumbnailUrl,
            downloads: (_a = data.downloads) !== null && _a !== void 0 ? _a : 0,
            isPremium: !!data.isPremium,
            filters: Array.isArray(data.filters) ? data.filters : [],
            createdAt: data.createdAt instanceof ClientTimestamp ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt instanceof ClientTimestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
        };
    }
    async createSection(insertSection) {
        var _a, _b, _c, _d;
        const now = new Date();
        const payload = {
            title: insertSection.title,
            category: insertSection.category,
            description: insertSection.description,
            thumbnailUrl: insertSection.thumbnailUrl,
            downloads: (_a = insertSection.downloads) !== null && _a !== void 0 ? _a : 0,
            isPremium: !!insertSection.isPremium,
            filters: (_b = insertSection.filters) !== null && _b !== void 0 ? _b : [],
            createdAt: ClientTimestamp.fromDate(now),
            updatedAt: ClientTimestamp.fromDate(now),
        };
        const colRef = collection(this.fs, "sections");
        const docRef = await addDoc(colRef, payload);
        return Object.assign(Object.assign({ id: docRef.id }, insertSection), { downloads: (_c = insertSection.downloads) !== null && _c !== void 0 ? _c : 0, isPremium: !!insertSection.isPremium, filters: (_d = insertSection.filters) !== null && _d !== void 0 ? _d : [], createdAt: now, updatedAt: now });
    }
    async deleteSection(id) {
        const ref = clientDoc(this.fs, "sections", id);
        await deleteDoc(ref);
    }
    async deleteAllSections() {
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
class MemoryStorage {
    constructor() {
        this.users = new Map();
        this.sections = new Map();
    }
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        for (const u of this.users.values()) {
            if (u.username === username)
                return u;
        }
        return undefined;
    }
    async createUser(insertUser) {
        const now = new Date();
        const user = {
            id: randomUUID(),
            username: insertUser.username,
            password: insertUser.password,
            createdAt: now,
            updatedAt: now,
        };
        this.users.set(user.id, user);
        return user;
    }
    async getAllSections() {
        return Array.from(this.sections.values());
    }
    async getSectionById(id) {
        return this.sections.get(id);
    }
    async createSection(insertSection) {
        var _a, _b;
        const now = new Date();
        const section = {
            id: randomUUID(),
            title: insertSection.title,
            category: insertSection.category,
            description: insertSection.description,
            thumbnailUrl: insertSection.thumbnailUrl,
            downloads: (_a = insertSection.downloads) !== null && _a !== void 0 ? _a : 0,
            isPremium: !!insertSection.isPremium,
            filters: (_b = insertSection.filters) !== null && _b !== void 0 ? _b : [],
            createdAt: now,
            updatedAt: now,
        };
        this.sections.set(section.id, section);
        return section;
    }
    async deleteSection(id) {
        this.sections.delete(id);
    }
    async deleteAllSections() {
        const count = this.sections.size;
        this.sections.clear();
        return count;
    }
}
// Export storage preferring Firebase Web SDK, else fallback to memory implementation
export const storage = webFirestore
    ? new WebFirebaseStorage(webFirestore)
    : new MemoryStorage();

import type { Note } from "@/types/note";

// Yeni key (v2)
export const STORAGE_KEY = "notes-app:notes-v2";

// Eski key(ler) – önceki sürümlerden gelebilir
const LEGACY_KEYS = [
  "notes-app:notes", // senin eski app’te kullandığımız key
];

export function loadNotes(): Note[] {
  // 1) Önce yeni key'i dene
  const v2 = tryRead(STORAGE_KEY);
  if (v2) return v2;

  // 2) Yeni key yoksa eski key'leri dene ve migrate et
  for (const key of LEGACY_KEYS) {
    const migrated = tryRead(key);
    if (migrated) {
      // migrate: yeni key'e yaz
      saveNotes(migrated);
      return migrated;
    }
  }

  return [];
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// --- helpers ---

function tryRead(key: string): Note[] | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return sanitizeAny(parsed);
  } catch {
    return null;
  }
}

function sanitizeAny(arr: unknown[]): Note[] {
  // V2 format mı?
  const looksLikeV2 =
    arr.every(
      (x: any) =>
        x &&
        typeof x.id === "string" &&
        typeof x.title === "string" &&
        typeof x.body === "string" &&
        typeof x.createdAt === "string" &&
        typeof x.updatedAt === "string"
    );

  if (looksLikeV2) return arr as Note[];

  // Eski format 1: string[]
  if (arr.every((x) => typeof x === "string")) {
    const now = new Date().toISOString();
    return (arr as string[]).map((text) => ({
      id: crypto.randomUUID(),
      title: text.slice(0, 40) || "Untitled",
      body: text,
      createdAt: now,
      updatedAt: now,
    }));
  }

  // Eski format 2: {id, text}[]
  const looksLikeOldObj =
    arr.every((x: any) => x && typeof x.id === "string" && typeof x.text === "string");

  if (looksLikeOldObj) {
    const now = new Date().toISOString();
    return (arr as any[]).map((x) => ({
      id: x.id,
      title: x.text.slice(0, 40) || "Untitled",
      body: x.text,
      createdAt: now,
      updatedAt: now,
    }));
  }

  return [];
}

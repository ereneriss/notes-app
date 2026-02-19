import type { Note } from "@/types/note";

export const STORAGE_KEY = "notes-app:notes-v2";

export function loadNotes(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return sanitizeNotes(parsed);
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// --- helpers ---

function sanitizeNotes(arr: unknown[]): Note[] {
  return arr
    .filter((n: any) => n && typeof n.id === "string")
    .map((n: any) => {
      const createdAt =
        typeof n.createdAt === "string" ? n.createdAt : new Date().toISOString();
      const updatedAt =
        typeof n.updatedAt === "string" ? n.updatedAt : createdAt;

      return {
        id: n.id,
        title: typeof n.title === "string" ? n.title : "Untitled",
        body: typeof n.body === "string" ? n.body : "",
        createdAt,
        updatedAt,
        isPinned: typeof n.isPinned === "boolean" ? n.isPinned : false,
      };
    });
}

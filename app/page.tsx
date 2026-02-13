"use client";

import { useEffect, useState } from "react";
import NoteInput from "@/components/NoteInput";
import NoteItem from "@/components/NoteItem";

type Note = {
  id: string;
  text: string;
};

const STORAGE_KEY = "notes-app:notes";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Note[];
      if (Array.isArray(parsed)) setNotes(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const text = input.trim();
    if (!text) return;

    setNotes((prev) => [{ id: crypto.randomUUID(), text }, ...prev]);
    setInput("");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) cancelEdit();
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    if (!editingId) return;
    const text = editingText.trim();
    if (!text) return;

    setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, text } : n)));
    cancelEdit();
  };

  const isAddDisabled = input.trim().length === 0;

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center gap-6 p-10">

      <div className="w-full max-w-xl flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes App</h1>
        <span className="text-sm opacity-60">{notes.length} notes</span>
      </div>

      <NoteInput value={input} onChange={setInput} onAdd={addNote} disabled={isAddDisabled} />

      {notes.length === 0 ? (
        <div className="w-full max-w-xl border rounded p-6 text-center opacity-70">
          No notes yet. Add your first note above.
        </div>
      ) : (
        <ul className="w-full max-w-xl space-y-2">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isEditing={editingId === note.id}
              editingText={editingText}
              onStartEdit={() => startEdit(note)}
              onChangeEdit={setEditingText}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </ul>
      )}
    </main>
  );
}

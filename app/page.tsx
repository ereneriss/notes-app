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
  <main className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,rgba(184,155,79,0.20),transparent_60%)]">
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/60">HANDCRAFTED NOTES</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Notes Suite
          </h1>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/60">Total</p>
          <p className="text-sm font-medium">
            <span className="text-[color:var(--rr-gold)]">{notes.length}</span> notes
          </p>
        </div>
      </div>

      {/* Input + List */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur">
        <NoteInput value={input} onChange={setInput} onAdd={addNote} disabled={isAddDisabled} />

        <div className="mt-6">
          {notes.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-white/70">
              No notes yet. Add your first note above.
            </div>
          ) : (
            <ul className="space-y-3">
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
        </div>
      </div>

      {/* Footer microcopy */}
      <p className="mt-6 text-center text-xs text-white/40">
        Minimal UI • High contrast • Gold accents
      </p>
    </div>
  </main>
);

}

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
    if (raw) setNotes(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!input.trim()) return;
    setNotes((prev) => [
      { id: crypto.randomUUID(), text: input },
      ...prev,
    ]);
    setInput("");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const saveEdit = () => {
    if (!editingId || !editingText.trim()) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingId ? { ...n, text: editingText } : n
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-10">
      <h1 className="text-3xl font-bold">Notes App</h1>

      <NoteInput
        value={input}
        onChange={setInput}
        onAdd={addNote}
      />

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
            onCancel={() => setEditingId(null)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </ul>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import NoteInput from "@/components/NoteInput";
import NoteItem from "@/components/NoteItem";
import NotesToolbar, { type SortMode } from "@/components/NotesToolbar";
import type { Note } from "@/types/note";
import { loadNotes, saveNotes } from "@/lib/storage";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Create states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingBody, setEditingBody] = useState("");

  // Search + Sort
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("updated_desc");

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t && !b) return;

    const now = new Date().toISOString();

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: t || (b.slice(0, 40) || "Untitled"),
      body: b,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
    setBody("");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingId === id) cancelEdit();
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingTitle(note.title);
    setEditingBody(note.body);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setEditingBody("");
  };

  const saveEdit = () => {
    if (!editingId) return;

    const t = editingTitle.trim();
    const b = editingBody.trim();
    if (!t && !b) return;

    const now = new Date().toISOString();

    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingId
          ? {
              ...n,
              title: t || (b.slice(0, 40) || "Untitled"),
              body: b,
              updatedAt: now,
            }
          : n
      )
    );

    cancelEdit();
  };

  const isAddDisabled = useMemo(
    () => title.trim().length === 0 && body.trim().length === 0,
    [title, body]
  );

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered =
      q.length === 0
        ? notes
        : notes.filter((n) => {
            const haystack = `${n.title}\n${n.body}`.toLowerCase();
            return haystack.includes(q);
          });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "updated_desc") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      if (sort === "created_desc") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      // created_asc
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return sorted;
  }, [notes, query, sort]);

  return (
    <main className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_0%,rgba(184,155,79,0.20),transparent_60%)]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/60">
              HANDCRAFTED NOTES
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Notes Suite
            </h1>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/60">Total</p>
            <p className="text-sm font-medium">
              <span className="text-[color:var(--rr-gold)]">{notes.length}</span>{" "}
              notes
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur">
          <NoteInput
            title={title}
            body={body}
            onChangeTitle={setTitle}
            onChangeBody={setBody}
            onAdd={addNote}
            disabled={isAddDisabled}
          />

          <div className="mt-6">
            <NotesToolbar
              query={query}
              onChangeQuery={setQuery}
              sort={sort}
              onChangeSort={setSort}
            />
          </div>

          <div className="mt-6">
            {notes.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-white/70">
                No notes yet. Add your first note above.
              </div>
            ) : visibleNotes.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-white/70">
                No matches for{" "}
                <span className="text-[color:var(--rr-gold)]">“{query}”</span>.
              </div>
            ) : (
              <ul className="space-y-3">
                {visibleNotes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    isEditing={editingId === note.id}
                    editingTitle={editingTitle}
                    editingBody={editingBody}
                    onStartEdit={() => startEdit(note)}
                    onChangeEditTitle={setEditingTitle}
                    onChangeEditBody={setEditingBody}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                    onDelete={() => deleteNote(note.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Minimal UI • High contrast • Gold accents
        </p>
      </div>
    </main>
  );
}

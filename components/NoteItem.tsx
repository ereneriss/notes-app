"use client";

import type { Note } from "@/types/note";

type Props = {
  note: Note;
  isEditing: boolean;

  editingTitle: string;
  editingBody: string;

  onStartEdit: () => void;
  onTogglePin: () => void;

  onChangeEditTitle: (value: string) => void;
  onChangeEditBody: (value: string) => void;

  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

export default function NoteItem({
  note,
  isEditing,
  editingTitle,
  editingBody,
  onStartEdit,
  onTogglePin,
  onChangeEditTitle,
  onChangeEditBody,
  onSave,
  onCancel,
  onDelete,
}: Props) {
  if (!isEditing) {
    const snippet =
      note.body.length > 120 ? note.body.slice(0, 120).trimEnd() + "…" : note.body;

    return (
      <li className="rounded-2xl border border-white/10 bg-black/35 p-4 text-[color:var(--rr-ivory)] shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-semibold tracking-tight truncate">
                {note.title || "Untitled"}
              </h3>

              {note.isPinned && (
                <span className="text-xs px-2 py-1 rounded bg-[color:var(--rr-gold)] text-[color:var(--rr-black)] tracking-[0.2em]">
                  PINNED
                </span>
              )}

              <span className="text-xs text-white/40">
                {formatDate(note.updatedAt)}
              </span>
            </div>

            {note.body.trim().length > 0 && (
              <p className="mt-2 text-sm text-white/70 break-words">{snippet}</p>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onTogglePin}
              className="text-sm underline decoration-white/30 underline-offset-4 hover:decoration-[color:var(--rr-gold)]"
            >
              {note.isPinned ? "Unpin" : "Pin"}
            </button>

            <button
              onClick={onStartEdit}
              className="text-sm underline decoration-white/30 underline-offset-4 hover:decoration-[color:var(--rr-gold)]"
            >
              Edit
            </button>

            <button
              onClick={onDelete}
              className="text-sm underline decoration-white/30 underline-offset-4 text-white/80 hover:text-[color:var(--rr-gold)]"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="rounded-2xl border border-[color:var(--rr-gold)] bg-black/50 p-4 shadow-[0_12px_30px_rgba(184,155,79,0.12)]">
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 py-1 rounded bg-[color:var(--rr-gold)] text-[color:var(--rr-black)] text-xs font-semibold tracking-[0.2em]">
          EDITING
        </span>
        <span className="text-xs text-white/60">Esc: cancel</span>
      </div>

      <input
        value={editingTitle}
        onChange={(e) => onChangeEditTitle(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[color:var(--rr-ivory)] outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Title"
        autoFocus
      />

      <textarea
        value={editingBody}
        onChange={(e) => onChangeEditBody(e.target.value)}
        rows={4}
        className="mt-3 w-full resize-none rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[color:var(--rr-ivory)] outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Body"
      />

      <div className="flex gap-3 mt-3">
        <button
          onClick={onSave}
          className="rounded-xl border border-[color:var(--rr-gold)] bg-[color:var(--rr-gold)] px-5 py-3 text-[color:var(--rr-black)] font-semibold tracking-wide hover:brightness-105 active:brightness-95"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="rounded-xl border border-white/15 bg-transparent px-5 py-3 text-[color:var(--rr-ivory)] hover:border-[color:var(--rr-gold)]/60"
        >
          Cancel
        </button>
      </div>
    </li>
  );
}

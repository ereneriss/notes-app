"use client";

type Note = {
  id: string;
  text: string;
};

type Props = {
  note: Note;
  isEditing: boolean;
  editingText: string;
  onStartEdit: () => void;
  onChangeEdit: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export default function NoteItem({
  note,
  isEditing,
  editingText,
  onStartEdit,
  onChangeEdit,
  onSave,
  onCancel,
  onDelete,
}: Props) {
  if (!isEditing) {
    return (
      <li className="rounded-2xl border border-white/10 bg-black/35 p-4 text-[color:var(--rr-ivory)] shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="break-words">{note.text}</span>

          <div className="flex items-center gap-4 shrink-0">
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
        <span className="text-xs text-white/60">Enter: save • Esc: cancel</span>
      </div>

      <input
        value={editingText}
        onChange={(e) => onChangeEdit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
        className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[color:var(--rr-ivory)] outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        autoFocus
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

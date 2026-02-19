"use client";

type Props = {
  title: string;
  body: string;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
  onAdd: () => void;
  disabled?: boolean;
};

export default function NoteInput({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onAdd,
  disabled,
}: Props) {
  const isEmpty = title.trim().length === 0 && body.trim().length === 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[color:var(--rr-ivory)] placeholder:text-white/35 outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Title"
      />

      <textarea
        value={body}
        onChange={(e) => onChangeBody(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[color:var(--rr-ivory)] placeholder:text-white/35 outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Write your note..."
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onAdd}
          disabled={disabled || isEmpty}
          className="rounded-xl border border-[color:var(--rr-gold)] bg-[color:var(--rr-gold)] px-5 py-3 text-[color:var(--rr-black)] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:brightness-95"
        >
          Add note
        </button>

        <span className="text-sm text-white/55">
          {isEmpty ? "Add a title or body." : "Premium draft ready"}
        </span>
      </div>
    </div>
  );
}


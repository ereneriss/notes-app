"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  disabled?: boolean;
};

export default function NoteInput({ value, onChange, onAdd, disabled }: Props) {
  const isEmpty = value.trim().length === 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          // Enter: add (Shift+Enter: ignore for now)
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isEmpty && !disabled) onAdd();
          }
        }}
        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[color:var(--rr-ivory)] placeholder:text-white/35 outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Write a note... (Enter to add)"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onAdd}
          disabled={disabled || isEmpty}
          className="rounded-xl border border-[color:var(--rr-gold)] bg-[color:var(--rr-gold)] px-5 py-3 text-[color:var(--rr-black)] font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:brightness-95"
        >
          Add
        </button>

        <span className="text-sm text-white/55">
          {isEmpty ? "Type something to add." : "Enter to add • Esc cancels edit"}
        </span>
      </div>
    </div>
  );
}

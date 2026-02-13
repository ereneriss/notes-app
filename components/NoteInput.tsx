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
    <div className="flex flex-col gap-2 w-full max-w-xl">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          // Enter: ekle, Shift+Enter: hiçbir şey yapma (ileride multiline istersen)
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isEmpty && !disabled) onAdd();
          }
        }}
        className="border px-3 py-2 rounded w-full"
        placeholder="Write a note... (Enter to add)"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onAdd}
          disabled={disabled || isEmpty}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>

        <span className="text-sm opacity-60">
          {isEmpty ? "Type something to add." : "Enter to add • Shift+Enter ignored"}
        </span>
      </div>
    </div>
  );
}

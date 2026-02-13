"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function NoteInput({ value, onChange, onAdd }: Props) {
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded w-80"
        placeholder="Write a note..."
      />

      <button
        onClick={onAdd}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}

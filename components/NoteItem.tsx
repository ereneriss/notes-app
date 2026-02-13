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
      <li className="border p-3 rounded flex justify-between items-center gap-3">
        <span className="break-words">{note.text}</span>

        <div className="flex gap-3">
          <button onClick={onStartEdit} className="underline">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-500 underline">
            Delete
          </button>
        </div>
      </li>
    );
  }

return (
  <li className="border-2 border-black p-4 rounded bg-white text-black shadow-md">
    <div className="flex items-center justify-between mb-3">
      <span className="px-2 py-1 rounded bg-black text-white text-xs font-semibold">
        EDITING
      </span>
      <span className="text-xs text-black/70">Enter: save • Esc: cancel</span>
    </div>

    <input
      value={editingText}
      onChange={(e) => onChangeEdit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave();
        if (e.key === "Escape") onCancel();
      }}
      className="w-full border-2 border-black px-3 py-2 rounded bg-white text-black placeholder:text-black/50"
      autoFocus
    />

    <div className="flex gap-3 mt-3">
      <button onClick={onSave} className="bg-black text-white px-4 py-2 rounded">
        Save
      </button>
      <button onClick={onCancel} className="border-2 border-black text-black px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  </li>
);


}

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
    <li className="border p-3 rounded flex flex-col gap-2">
      <input
        value={editingText}
        onChange={(e) => onChangeEdit(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </li>
  );
}

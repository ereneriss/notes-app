export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  isPinned: boolean;
};

"use client";

export type SortMode = "updated_desc" | "created_desc" | "created_asc";

type Props = {
  query: string;
  onChangeQuery: (v: string) => void;
  sort: SortMode;
  onChangeSort: (v: SortMode) => void;
};

export default function NotesToolbar({
  query,
  onChangeQuery,
  sort,
  onChangeSort,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        className="w-full sm:max-w-md rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[color:var(--rr-ivory)] placeholder:text-white/35 outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        placeholder="Search notes..."
      />

      <div className="flex items-center gap-3">
        <span className="text-xs tracking-[0.25em] text-white/55">SORT</span>

        <select
          value={sort}
          onChange={(e) => onChangeSort(e.target.value as SortMode)}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-[color:var(--rr-ivory)] outline-none focus:border-[color:var(--rr-gold)] focus:ring-2 focus:ring-[color:var(--rr-gold)]/20"
        >
          <option value="updated_desc">Recently updated</option>
          <option value="created_desc">Newest created</option>
          <option value="created_asc">Oldest created</option>
        </select>
      </div>
    </div>
  );
}

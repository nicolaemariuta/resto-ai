import EducationalFactCard from "./EducationalFactCard";

export default function EducationalFactsPanel({ facts, loading, error, onRefresh }) {
  if (error) {
    return (
      <div className="pointer-events-none absolute inset-y-4 right-4 flex max-w-xs flex-col">
        <div className="pointer-events-auto rounded-lg bg-slate-900/80 text-red-200 px-3 py-2 text-xs shadow-lg">
          Failed to load educational facts.
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-y-4 right-4 z-[2000] flex max-w-xs flex-col gap-2 will-change-transform">
      {/* Header + refresh button */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 rounded-lg bg-slate-900/80 px-3 py-1 text-[0.75rem] text-slate-100 shadow-lg">
        <span className="font-semibold">Educational notes</span>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-full border border-slate-500/60 px-2 py-0.5 text-[0.7rem]
                     hover:bg-slate-700/80 disabled:opacity-60"
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {/* Cards */}
      <div className="pointer-events-auto max-h-[calc(100%-3rem)] overflow-y-auto space-y-2 pr-1">
        {loading && facts.length === 0 && (
          <div className="rounded-lg bg-slate-900/80 px-3 py-2 text-[0.75rem] text-slate-200 shadow-lg">
            Loading facts…
          </div>
        )}

        {facts.map((fact) => (
          <EducationalFactCard key={fact._id || fact.title} fact={fact} />
        ))}

        {!loading && facts.length === 0 && (
          <div className="rounded-lg bg-slate-900/80 px-3 py-2 text-[0.75rem] text-slate-200 shadow-lg">
            No facts available yet.
          </div>
        )}
      </div>
    </div>
  );
}

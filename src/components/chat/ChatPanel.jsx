export default function ChatPanel() {
  return (
    <section className="flex h-full flex-col gap-3 rounded-lg bg-slate-900/40 p-4">
      <h2 className="text-lg font-semibold text-slate-100">AI assistant</h2>

      {/* later: message list + input */}
      <div className="flex-1 rounded-md border border-slate-700/70 bg-slate-950/50 p-3 text-sm text-slate-200">
        Chat will go here…
      </div>

      <div className="rounded-md border border-slate-700/70 bg-slate-950/60 p-3 text-xs text-slate-300">
        User settings & filters…
      </div>
    </section>
  );
}

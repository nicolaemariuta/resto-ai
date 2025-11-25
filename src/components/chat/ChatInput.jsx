import { useRef } from "react";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  function handleChange(e) {
    onChange(e.target.value);

    // Auto-grow textarea height
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`; // max ~10 lines
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask Resto-AI for help..."
          className="max-h-40 w-full resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full
                   bg-emerald-500 text-slate-900 shadow-md
                   disabled:cursor-not-allowed disabled:bg-emerald-800/60"
        title="Send"
      >
        {/* simple arrow icon using SVG */}
        <svg
          className="h-4 w-4 -translate-x-[1px]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.293 17.707a1 1 0 0 0 1.414 0l13-13a1 1 0 0 0-1.32-1.497l-15 9a1 1 0 0 0 .09 1.786L7.5 16.5l2.504 6.023z" />
        </svg>
      </button>
    </div>
  );
}

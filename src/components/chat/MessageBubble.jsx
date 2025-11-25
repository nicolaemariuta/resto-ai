export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed
          ${
            isUser
              ? "bg-emerald-500 text-slate-900 rounded-br-sm"
              : "bg-slate-800 text-slate-100 rounded-bl-sm"
          }`}
      >
        {text}
      </div>
    </div>
  );
}
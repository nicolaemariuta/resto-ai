import { useState } from "react";
import { getAiReply } from "../../utils/mockAI";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

let nextId = 1;

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: nextId++,
      role: "assistant",
      text: "Hi! I’m Resto-AI. Tell me what kind of activities or projects you’d like help with.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = { id: nextId++, role: "user", text: trimmed };

    // Optimistic update: show user msg immediately
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const aiText = await getAiReply(trimmed);
      const aiMsg = { id: nextId++, role: "assistant", text: aiText };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: nextId++,
        role: "assistant",
        text: "Sorry, something went wrong. (mock AI error)",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="flex h-full flex-col gap-3 rounded-lg bg-slate-900/40 p-4">
      <h2 className="text-lg font-semibold text-slate-100">AI assistant</h2>

      {/* messages */}
      <MessageList messages={messages} />

      {/* input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isSending}
      />

      {/* settings slot can move later somewhere else if needed */}
      <div className="rounded-md border border-slate-700/70 bg-slate-950/60 p-3 text-xs text-slate-300">
        User settings & filters…
      </div>
    </section>
  );
}

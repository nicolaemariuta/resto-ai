import { useState } from "react";
import ChatPanel from "./ChatPanel";
import UserSettingsPanel from "./UserSettingsPanel";

export default function ChatSidebar() {
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "settings"

  return (
    <section className="h-full flex flex-col p-4 gap-4 bg-slate-950">

      {/* Toggle */}
      <div className="flex w-full rounded-full bg-slate-800 p-1">
        <button
          className={`flex-1 py-1 rounded-full text-sm transition
            ${activeTab === "chat" ? "bg-emerald-500 text-slate-900" : "text-slate-300"}`}
          onClick={() => setActiveTab("chat")}
        >
          AI assistant
        </button>

        <button
          className={`flex-1 py-1 rounded-full text-sm transition
            ${activeTab === "settings" ? "bg-emerald-500 text-slate-900" : "text-slate-300"}`}
          onClick={() => setActiveTab("settings")}
        >
          User Settings
        </button>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "chat" ? <ChatPanel /> : <UserSettingsPanel />}
      </div>

    </section>
  );
}

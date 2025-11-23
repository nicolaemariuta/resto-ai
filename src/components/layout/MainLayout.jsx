import Header from "./Header";
import MapView from "../map/MapView";
import ChatPanel from "../chat/ChatPanel";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header stays fixed height */}
      <Header />

      {/* Main area fills the rest of the screen */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left sidebar (ChatPanel) */}
        <div className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto p-4 bg-slate-950">
          <ChatPanel />
        </div>

        {/* Right content (MapView) */}
        <div className="flex-1 h-full overflow-hidden p-4 bg-slate-950">
          <MapView />
        </div>

      </div>
    </div>
  );
}

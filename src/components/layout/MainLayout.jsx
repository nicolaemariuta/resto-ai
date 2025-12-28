
import { useUserLocation } from "../../hooks/useUserLocation";
import { useEducationalFacts } from "../../hooks/useEducationalFacts";
import { useUserSettings } from "../../hooks/userSettings";

import Header from "./Header";
import MapView from "../map/MapView";
import ChatSidebar from "../chat/ChatSidebar";
import EducationalFactsPanel from "../educationalFacts/EducationalFactsPanel";

function MainLayout() {
  const { location, manuallySetLocation, status, source } = useUserLocation();
  const userLocation = location ? { ...location, source } : null;

  // Single source of truth for user settings
  const { settings, updateSetting, toggleSatelliteLayer } = useUserSettings();

  // Use those settings to fetch matching facts
  const { facts, loading, error, refetch } = useEducationalFacts(
    {
      sustainability: settings.sustainability,
      mentalHealth: settings.mentalHealth,
      fitness: settings.fitness,
      community: settings.community,
    },
    4
  );

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header stays fixed height */}
      <Header />

      {/* Main area fills the rest of the screen */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar (ChatPanel) */}
        <div className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto p-4 bg-slate-950">
          <ChatSidebar
            settings={settings}
            updateSetting={updateSetting}
            toggleSatelliteLayer={toggleSatelliteLayer}
          />
        </div>

        {/* Right: Map + Educational facts overlay */}
        <div className="relative flex-1 h-full overflow-hidden p-4 bg-slate-950">
          {status === "loading" && <p>Detecting your location…</p>}

          <MapView
            userLocation={userLocation}
            onUserLocationChange={manuallySetLocation}
          />

          <EducationalFactsPanel
            facts={facts}
            loading={loading}
            error={error}
            onRefresh={refetch}
          />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;

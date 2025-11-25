import { useState } from "react";

export function useUserSettings() {
  const [settings, setSettings] = useState({
    sustainability: 3,
    mentalHealth: 3,
    fitness: 3,
    community: 3,
    satellite: {
      ndvi: false,
      co: false,
      no2: false,
      o3: false,
    },
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      console.log("🔧 Updated user settings:", updated);
      return updated;
    });
  };

  const toggleSatelliteLayer = (key) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        satellite: {
          ...prev.satellite,
          [key]: !prev.satellite[key],
        },
      };
      console.log("🛰️ Updated sattelite settings:", updated);
      return updated;
    });
  };

  return {
    settings,
    updateSetting,
    toggleSatelliteLayer,
  };
}

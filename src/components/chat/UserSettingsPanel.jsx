// import { useUserSettings } from "@/hooks/useUserSettings";
import { useUserSettings } from "../../hooks/userSettings";

export default function UserSettingsPanel() {
  const {
    settings,
    updateSetting,
    toggleSatelliteLayer,
  } = useUserSettings();

  return (
    <div className="flex flex-col gap-6 p-2">

      {/* Main categories */}
      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
          Personal Focus
        </h2>

        {[
          ["sustainability", "Sustainability"],
          ["mentalHealth", "Mental Health"],
          ["fitness", "Fitness"],
          ["community", "Community"],
        ].map(([key, label]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm text-slate-300 mb-1">
              {label}: {settings[key]}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={settings[key]}
              onChange={(e) => updateSetting(key, Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        ))}
      </div>

      <hr className="border-slate-700/60" />

      {/* Satellite data */}
      <div>
        <h2 className="text-lg font-semibold text-slate-100 mb-3">
          Cassini Data
        </h2>

        {[
          ["ndvi", "NDVI"],
          ["co", "CO (Carbon Monoxide)"],
          ["no2", "NO₂ (Nitrogen Dioxide)"],
          ["o3", "O₃ (Ozone)"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={settings.satellite[key]}
              onChange={() => toggleSatelliteLayer(key)}
              className="accent-emerald-500"
            />
            {label}
          </label>
        ))}
      </div>

    </div>
  );
}

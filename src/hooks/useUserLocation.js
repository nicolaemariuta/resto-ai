import { useEffect, useState } from "react";
import { getBrowserLocation, getIpLocation } from "../utils/location";

const DEFAULT_CENTER = { lat: 55.6761, lng: 12.5683 }; // Copenhagen fallback

export function useUserLocation() {
  const [location, setLocation] = useState(null); // {lat, lng}
  const [status, setStatus] = useState("idle");   // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);     // 'gps' | 'ip' | null

  useEffect(() => {
    let cancelled = false;

    async function fetchLocation() {
      setStatus("loading");

      try {
        // 1) Try GPS first (asks user for permission)
        const gps = await getBrowserLocation();
        if (!cancelled) {
          setLocation({ lat: gps.lat, lng: gps.lng });
          setSource("gps");
          setStatus("success");
        }
      } catch (gpsErr) {
        // 2) If GPS fails or user denies → try IP
        try {
          const ip = await getIpLocation();
          if (!cancelled) {
            setLocation({ lat: ip.lat, lng: ip.lng });
            setSource("ip");
            setStatus("success");
          }
        } catch (ipErr) {
          if (!cancelled) {
            setLocation(DEFAULT_CENTER);
            setSource("fallback");
            setStatus("error");
            setError(ipErr);
          }
        }
      }
    }

    fetchLocation();

    return () => {
      cancelled = true;
    };
  }, []);

  // expose ability to manually change location (for map click)
  const manuallySetLocation = (lat, lng) => {
    setLocation({ lat, lng });
    setSource("manual");
  };

  return { location, manuallySetLocation, status, error, source };
}
import { useEffect, useState } from "react";
import { fetchEducationalFacts } from "@/utils/educationalFacts";

export function useEducationalFacts(preferences, count = 4) {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // simple way to trigger reloading from outside if needed
  const [reloadToken, setReloadToken] = useState(0);
  const refetch = () => setReloadToken((t) => t + 1);

  useEffect(() => {
    if (!preferences) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEducationalFacts(preferences, count);
        if (!cancelled) {
          setFacts(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading educational facts:", err);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [preferences?.sustainability,
      preferences?.mentalHealth,
      preferences?.fitness,
      preferences?.community,
      count,
      reloadToken]);

  return { facts, loading, error, refetch };
}



const API_BASE_URL = "http://localhost:5000"; // later: move to env

export async function fetchEducationalFacts(preferences, count = 4) {
  const {
    sustainability = 3,
    mentalHealth = 3,
    fitness = 3,
    community = 3,
  } = preferences || {};

  const params = new URLSearchParams({
    sustainability,
    mentalHealth,
    fitness,
    community,
    count,
  });

  const res = await fetch(`${API_BASE_URL}/api/facts/recommend?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch educational facts: ${res.status}`);
  }

  return res.json(); // array of facts
}

// GPS / browser geolocation
export function getBrowserLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      return reject(new Error("Geolocation not supported by this browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          source: "gps",
        });
      },
      (error) => {
        reject(error);
      },
      {
        timeout: 8000,
        maximumAge: 0,
        enableHighAccuracy: false,
        ...options,
      }
    );
  });
}

// I will eventually have to store this key on the backend to be secure for sure
const ipApiAcessKey = import.meta.env.VITE_IPAPI_ACCESS_KEY

// IP-based approximate location (example using ipapi.co)
export async function getIpLocation() {

  if (!ipApiAcessKey) {
    console.warn("IPAPI key is missing! Check VITE_IPAPI_KEY in .env.local");
  }

  const res = await fetch(`https://api.ipapi.com/api/check?access_key=${ipApiAcessKey}`);
  if (!res.ok) {
    console.log(`IP API errr`)
    throw new Error("Failed to fetch IP-based location");
  }
  const data = await res.json();

  console.log("IP API success data =", JSON.stringify(data, null, 2));

  return {
    lat: data.latitude,
    lng: data.longitude,
    city: data.city,
    region: data.region,
    country: data.country_name,
    source: "ip",
  };
}
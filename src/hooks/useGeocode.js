import { useState, useEffect, useCallback } from "react";

export function useGeocode(city, state) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Shared function for both effect & on-demand lookups
  const geocodeNow = useCallback(async (cityName, stateName) => {
    try {
      const query = encodeURIComponent(`${cityName}, ${stateName}`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        { headers: { "User-Agent": "LumiApp/1.0 (you@example.com)" } }
      );

      const data = await res.json();
      if (data.length === 0) throw new Error("No results found");

      const newCoords = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };

      setCoords(newCoords);
      return newCoords;
    } catch (err) {
      console.error("Geocode error:", err);
      setError(err.message);
      setCoords(null);
      return null;
    }
  }, []);

  // 🔹 Auto-geocode when inputs change (for live preview)
  useEffect(() => {
    if (!city || !state) return;
    setLoading(true);
    setError(null);

    geocodeNow(city, state).finally(() => setLoading(false));
  }, [city, state, geocodeNow]);

  return { coords, loading, error, geocodeNow };
}

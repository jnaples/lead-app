import { useState, useEffect } from "react";

export function useGeocode(city, state) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !state) return;

    setLoading(true);
    setError(null);

    const fetchCoords = async () => {
      try {
        const query = encodeURIComponent(`${city}, ${state}`);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
          { headers: { "User-Agent": "LumiApp/1.0 (you@example.com)" } }
        );

        const data = await res.json();
        if (data.length === 0) throw new Error("No results found");

        setCoords({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [city, state]);

  return { coords, loading, error };
}

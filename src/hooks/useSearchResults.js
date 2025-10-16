import { useState } from "react";
import { cleanLocalResults } from "./useCleanLocalResults";

export function useSearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const { businessType, latitude, longitude } = payload;

      if (!businessType || !latitude || !longitude) {
        throw new Error("Missing required search parameters");
      }

      const query = new URLSearchParams(payload).toString();
      const res = await fetch(`/api/scrape?${query}`);

      if (!res.ok) {
        throw new Error(`Error getting results: ${res.status}`);
      }

      const data = await res.json();

      if (!data.local_results) {
        setResults([]);
        return;
      }
      // console.log("data results", data.local_results);

      const cleanResults = cleanLocalResults(data.local_results);
      setResults(cleanResults);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error occured");
      setResults([]);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return { results, loading, fetchResults, error };
}

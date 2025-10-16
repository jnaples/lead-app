import { useState } from "react";

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
      console.log("data results", data.local_results);

      const cleanResults = data.local_results
        .map((item) => {
          // Clean website
          let website = item.website || null;
          if (website) {
            const withoutQuery = website.split("?")[0];
            const parts = withoutQuery.split("/");
            website =
              parts.length > 3 ? parts.slice(0, 3).join("/") : withoutQuery;
          }
          return {
            businessName: item.title || "No name",
            phone: item.phone || "--",
            website,
          };
        })
        .filter((entry) => entry.website); // skip if no website

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

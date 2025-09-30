import { useState } from "react";

type SearchResult = {
  businessName: string;
  phone?: string;
  website: string;
};

export function useSearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch("/api/scrape");
      const data = await res.json();

      if (!data.local_results) {
        setResults([]);
        return;
      }

      console.log(data.local_results);

      const cleanResults = data.local_results
        .map((item: any) => {
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
            phone: item.phone || "",
            website,
          };
        })
        .filter((entry) => entry.website); // skip if no website

      setResults(cleanResults);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return { results, loading, fetchResults };
}

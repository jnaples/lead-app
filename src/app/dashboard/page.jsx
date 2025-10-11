"use client";

import { useSearchResults } from "@/hooks/useSearchResults";
import ResultsTable from "@/features/listings/ResultsTable";
import SearchBusinessForm from "@/features/search-businesses/SearchBusinessForm";
import { useCredits } from "@/context/credits-context";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { credits, setCredits } = useCredits();
  const { results, fetchResults, loading, error } = useSearchResults();

  const handleSearch = async () => {
    if (credits <= 0) {
      toast.error("Out of credits, purchase more", {
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
        },
      });

      return;
    }
    await fetchResults();
    setCredits((c) => c - 1);
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-6 flex flex-col flex-1 min-h-0">
      <SearchBusinessForm fetchResults={handleSearch} loading={loading} />
      <ResultsTable results={results} loading={loading} error={error} />
    </div>
  );
}

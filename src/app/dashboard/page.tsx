"use client";

import { useSearchResults } from "@/hooks/useSearchResults";
import ResultsTable from "@/features/listings/ResultsTable";
import SearchBusinessForm from "@/features/search-businesses/SearchBusinessForm";

export default function Home() {
  const { results, fetchResults, loading, error } = useSearchResults();

  return (
    <div className="max-w-4xl w-full mx-auto px-6 flex flex-col flex-1 min-h-0">
      <SearchBusinessForm fetchResults={fetchResults} loading={loading} />
      <ResultsTable results={results} loading={loading} />
    </div>
  );
}

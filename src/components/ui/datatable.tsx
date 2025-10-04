import { Upload } from "lucide-react";
import { Button } from "./button";

interface SearchResult {
  businessName: string;
  phone?: string | null;
  website: string;
}

interface DataTableProps {
  results: SearchResult[];
  loading: boolean;
}

function classNames(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DataTable({ results, loading }: DataTableProps) {
  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold text-zinc-900">Businesses</h2>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button variant="outline">
            <Upload className="w-5 h-5" />
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="mt-4 flex-1 min-h-0">
        <div className="h-full min-w-full overflow-y-auto overflow-x-auto -mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0 border-b border-zinc-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-zinc-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-zinc-900 backdrop-blur-sm sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-zinc-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 backdrop-blur-sm sm:table-cell"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-zinc-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 backdrop-blur-sm"
                  >
                    Website
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-zinc-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && results.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-zinc-500"
                    >
                      No results
                    </td>
                  </tr>
                )}

                {results
                  .filter((r) => !!r.website)
                  .map((r, i) => (
                    <tr key={i}>
                      <td
                        className={classNames(
                          i !== results.length - 1
                            ? "border-b border-zinc-200"
                            : "",
                          "py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-zinc-900 sm:pl-6 lg:pl-8 truncate max-w-[320px]"
                        )}
                      >
                        {r.businessName}
                      </td>
                      <td
                        className={classNames(
                          i !== results.length - 1
                            ? "border-b border-zinc-200"
                            : "",
                          " px-3 py-4 text-sm whitespace-nowrap text-zinc-500 sm:table-cell"
                        )}
                      >
                        {r.phone ?? "—"}
                      </td>
                      <td
                        className={classNames(
                          i !== results.length - 1
                            ? "border-b border-zinc-200"
                            : "",
                          "px-3 py-4 text-sm whitespace-nowrap text-zinc-500 lg:table-cell"
                        )}
                      >
                        <a
                          href={r.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[var(--primary)] transition-colors duration-150"
                        >
                          {r.website}
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

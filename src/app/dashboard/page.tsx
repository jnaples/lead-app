"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTable from "@/components/ui/datatable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar03 } from "@/components/ui/shadcn-io/navbar-03";
import { StateSelect } from "@/components/ui/stateSelect";
import { useSearchResults } from "@/hooks/useSearchResults";

export default function Home() {
  const { results, fetchResults, loading, error } = useSearchResults();

  return (
    <div className="h-[100svh] flex flex-col pb-10 gap-6">
      <Navbar03 className="shrink-0" />

      <main className="flex-1 min-h-0 flex items-stretch">
        <div className="max-w-4xl w-full mx-auto px-6 flex flex-col flex-1 min-h-0">
          {/* top card: auto height */}
          <Card className="mb-6 shrink-0">
            <CardHeader>
              <CardTitle>Search local businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="niche">Niche</Label>
                    <Input id="niche" placeholder="eg., lawfirms" />
                  </div>
                  <div className="space-y-6 grid grid-cols-3 gap-6 items-start">
                    <div className="grid gap-2 col-span-2 ">
                      <Label htmlFor="location">City</Label>
                      <Input
                        id="location"
                        placeholder="eg., New York, Dallas"
                      />
                    </div>
                    <div className="grid col-span-1 w-full gap-2">
                      <Label htmlFor="state">State</Label>
                      <StateSelect id="state" />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={fetchResults}
                disabled={loading}
                className="mx-auto"
              >
                {loading ? "Searching..." : "Search Businesses"}
              </Button>
            </CardFooter>
          </Card>

          {/* table card: must be flex container so table area can flex and scroll */}
          <Card className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* DataTable will fill this card and make rows scroll */}
            <DataTable results={results} loading={loading} />
          </Card>
        </div>
      </main>
    </div>
  );
}

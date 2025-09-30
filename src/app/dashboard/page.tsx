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
import { useSearchResults } from "@/hooks/useSearchResults";

export default function Home() {
  const { results, fetchResults, loading, error } = useSearchResults();

  return (
    <div className="h-[600px]">
      <Navbar03 className="mb-6" />
      <main className="w-full pb-10">
        <div className="container max-w-4xl mx-auto px-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search local businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="niche">Email</Label>
                    <Input
                      id="niche"
                      type="text"
                      placeholder="eg., lawfirms, dentists, gyms"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="niche">Location</Label>
                    <Input
                      id="niche"
                      type="text"
                      placeholder="eg., New York, NY or 10001"
                      required
                    />
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

          <Card>
            <DataTable results={results} loading={loading} />
          </Card>
        </div>
      </main>
    </div>
  );
}

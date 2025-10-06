import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { StateSelect } from "@/ui/stateSelect";
import { Label } from "@radix-ui/react-label";

interface SearchBusinessFormProps {
  fetchResults: () => void; // callback function from parent
  loading: boolean; // loading state from parent
}

export default function SearchBusinessForm({
  fetchResults,
  loading,
}: SearchBusinessFormProps) {
  return (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="grid gap-2 col-span-1 md:col-span-2 ">
                <Label htmlFor="location">City</Label>
                <Input id="location" placeholder="eg., New York, Dallas" />
              </div>
              <div className="grid col-span-1 md:col-span-1 w-full gap-2">
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
          className="mx-auto w-full md:w-fit"
        >
          {loading ? "Searching..." : "Search Businesses"}
        </Button>
      </CardFooter>
    </Card>
  );
}

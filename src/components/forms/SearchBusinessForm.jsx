import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StateSelect } from "@/components/ui/stateSelect";
import FormErrorMessage from "@/components/ui/form-error-message";
import { Label } from "@radix-ui/react-label";
import { useGeocode } from "@/hooks/useGeocode";
import toast from "react-hot-toast";

export default function SearchBusinessForm({
  fetchResults,
  loading: isFetchingResults,
  credits,
}) {
  const {
    register,
    formState,
    getValues,
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm();
  const { errors } = formState;

  const city = watch("city");
  const state = watch("state");

  const {
    coords,
    loading: geocodeLoading,
    geocodeNow,
  } = useGeocode(city, state);

  async function onSubmit(formData) {
    const { businessType, city, state } = formData;
    const latestCoords = await geocodeNow(city, state);

    if (!latestCoords) {
      toast.error("Location not found", {
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
        },
      });
      return;
    }

    const payload = {
      businessType: businessType,
      latitude: latestCoords.lat,
      longitude: latestCoords.lon,
    };

    console.log(payload);

    try {
      await fetchResults(payload);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error performing search");
    }
    reset();
  }

  return (
    <Card className="mb-6 shrink-0">
      <CardHeader>
        <CardTitle>Search local businesses</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                id="businessType"
                placeholder="eg., lawfirms, dentists"
                disabled={isFetchingResults}
                {...register("businessType", {
                  required: "This field is required",
                })}
              />
              {errors.businessType && (
                <FormErrorMessage errorMessage={errors?.businessType.message} />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="grid gap-2 col-span-1 md:col-span-2 ">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="eg., New York, Dallas"
                  disabled={isFetchingResults}
                  {...register("city", {
                    required: "This field is required",
                  })}
                />
                {errors.city && (
                  <FormErrorMessage errorMessage={errors?.city.message} />
                )}
              </div>
              <div className="grid col-span-1 md:col-span-1 w-full gap-2">
                <Label htmlFor="state">State</Label>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <StateSelect
                      id="state"
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isFetchingResults}
                    />
                  )}
                />
                {errors.state && (
                  <FormErrorMessage errorMessage={errors.state.message} />
                )}
              </div>
            </div>
            <Button
              variant="default"
              type="submit"
              disabled={isFetchingResults || credits <= 0}
              className="mx-auto w-full md:w-fit"
            >
              {isFetchingResults ? "Searching..." : "Search Businesses"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

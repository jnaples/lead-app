import { useForm, Controller } from "react-hook-form";
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
import FormErrorMessage from "@/ui/form-error-message";
import { Label } from "@radix-ui/react-label";

export default function SearchBusinessForm({ fetchResults, loading, credits }) {
  const { register, formState, getValues, handleSubmit, reset, control } =
    useForm();
  const { errors } = formState;

  async function onSubmit() {
    await fetchResults();
    console.log(getValues());
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
                placeholder="eg., lawfirms"
                disabled={loading}
                {...register("businessType", {
                  required: "This field is required",
                })}
              />
              {errors.businessType && (
                <FormErrorMessage errorMessage={errors?.businessType.message} />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="grid gap-2 col-span-1 md:col-span-2 ">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="eg., New York, Dallas"
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
                    />
                  )}
                />
                {errors.state && (
                  <FormErrorMessage errorMessage={errors.state.message} />
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || credits <= 0}
              className="mx-auto w-full md:w-fit"
            >
              {loading ? "Searching..." : "Search Businesses"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

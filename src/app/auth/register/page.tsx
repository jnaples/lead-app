import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4 w-64">
        <Input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <Input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

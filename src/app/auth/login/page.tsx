import { LoginForm } from "@/components/ui/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm className="w-full md:w-96" />
    </div>
  );
}

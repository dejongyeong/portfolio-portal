import Link from "next/link";

import LoginForm from "@/components/form/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/wrapper/shell";

export default function Login() {
  return (
    <Shell className="mx-2 max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-shadow-xs">
            Welcome to Portfolio Portal
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground text-sm">
            <span className="mr-1">Forget Password?</span>
            <Link
              href="/forgot-password"
              aria-label="Forgot Password"
              className="text-primary underline-offset-2 transition-colors hover:underline"
            >
              Click here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}

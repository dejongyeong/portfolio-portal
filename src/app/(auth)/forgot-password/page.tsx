import Link from "next/link";
import { redirect } from "next/navigation";

import ForgotPasswordForm from "@/components/forms/auth/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/wrapper/shell";
import { checkSession } from "@/lib/auth/session";

export default async function ForgotPasswordPage() {
  const payload = await checkSession();

  // redirect to home page if user is already logged in
  if (payload) redirect("/");

  return (
    <Shell className="mx-2 max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-shadow-2xs">
            Reset your password
          </CardTitle>
          <CardDescription>
            Enter your email address and we will send you a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground text-sm">
            <Link
              href="/login"
              aria-label="Back to Login"
              className="text-primary underline-offset-2 transition-colors hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}

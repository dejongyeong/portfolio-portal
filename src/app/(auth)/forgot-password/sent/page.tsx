import Link from "next/link";
import { redirect } from "next/navigation";

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

export default async function ForgotPasswordSentPage() {
  const payload = await checkSession();

  // redirect to home page if user is already logged in
  if (payload) redirect("/");

  return (
    <Shell className="mx-2 max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-shadow-2xs">
            Password Reset Link Sent!
          </CardTitle>
          <CardDescription>
            Reset link sent, please check your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-3 space-y-3 leading-relaxed">
          <p>
            We have sent you an email with a link to reset your password. Please
            check your inbox (and your spam folder, just in case) and follow the
            instructions in the email.
          </p>
          <p>
            If you do not receive the email within a few moments, please check
            your email address and try again.
          </p>
          <p>
            Reset link will become invalid in{" "}
            <span className="text-yellow-700">15 minutes</span>.
          </p>
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

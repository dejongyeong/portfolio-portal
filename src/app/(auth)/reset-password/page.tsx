import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import ResetPasswordForm from "@/components/forms/auth/reset-password-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { cn } from "@/lib/utils";
import { resetPasswordTokenSearchParamsSchema } from "@/schema/auth/reset-password-schema";

interface IResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ResetPasswordPage({
  searchParams,
}: IResetPasswordPageProps) {
  const payload = await checkSession();

  // redirect to home page if user is already logged in
  if (payload) redirect("/");

  const { token } = resetPasswordTokenSearchParamsSchema.parse(
    await searchParams,
  );

  return (
    <Shell className="mx-2 max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-shadow-xs">
            Reset your password
          </CardTitle>
          <CardDescription>
            Enter a new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!token ? (
            <Alert
              variant="destructive"
              className={cn(token ? "hidden" : "", "border-red-400")}
            >
              <AlertTriangle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Reset password token is missing or invalid. Please check your
                email for the correct link or request to reset password again.
                <Link
                  href="/forgot-password"
                  aria-label="Back to Forgot Password"
                  className="text-primary text-sm underline-offset-2 transition-colors hover:underline"
                >
                  Forgot Password?
                </Link>
              </AlertDescription>
            </Alert>
          ) : (
            <ResetPasswordForm token={token} />
          )}
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RESET_PASSWORD_URL } from "@/lib/shared/endpoints";
import { handleError } from "@/lib/shared/handle-error";
import {
  resetPasswordSchema,
  TResetPasswordSchema,
} from "@/schema/auth/reset-password-schema";

interface IResetPasswordFormProps {
  token: string | undefined;
}

export default function ResetPasswordForm({ token }: IResetPasswordFormProps) {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: TResetPasswordSchema) {
    startTransition(async () => {
      if (!token) {
        toast.error("Reset password token is missing or invalid.");
        return;
      }

      try {
        await axios.post(
          RESET_PASSWORD_URL,
          { password: data.password },
          {
            headers: { "Content-Type": "application/json" },
            params: { token: token },
          },
        );

        toast.success(
          "Password reset successfully. Please login with your new password.",
        );
        router.push("/login");
      } catch (error: unknown) {
        const message = "Reset password failed. Please try again.";
        toast.error(handleError(error, message));
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="***********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="***********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isPending || !token}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2
                className="mr-1 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Resetting password...
              <span className="sr-only">Resetting password...</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Reset Password
              <span className="sr-only">Reset Password</span>
            </React.Fragment>
          )}
        </Button>
      </form>
    </Form>
  );
}

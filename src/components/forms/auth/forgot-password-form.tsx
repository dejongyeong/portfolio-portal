"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FORGOT_PASSWORD_URL } from "@/lib/shared/endpoints";
import { handleError } from "@/lib/shared/handle-error";
import {
  forgotPasswordSchema,
  TForgotPasswordSchema,
} from "@/schema/auth/forgot-password-schema";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: TForgotPasswordSchema) {
    startTransition(async () => {
      try {
        await axios.post(FORGOT_PASSWORD_URL, data, {
          headers: { "Content-Type": "application/json" },
        });

        form.reset();
        toast.success(
          "Password reset link has been sent to your email address.",
        );

        router.push("/forgot-password/sent");
      } catch (error: unknown) {
        const message = "Email address not found";
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="cursor-pointer">
          {isPending ? (
            <React.Fragment>
              <Loader2
                className="mr-1 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Sending...
              <span className="sr-only">Sending...</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Send Password Reset Link
              <span className="sr-only">Send Password Reset Link</span>
            </React.Fragment>
          )}
        </Button>
      </form>
    </Form>
  );
}

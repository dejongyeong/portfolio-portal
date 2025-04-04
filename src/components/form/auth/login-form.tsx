"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { displayError } from "@/lib/display-error";
import { LOGIN_URL } from "@/lib/endpoints";
import { loginSchema, TLoginSchema } from "@/schema/auth/login-schema";

export default function LoginForm() {
  // react-hook-form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: TLoginSchema) {
    startTransition(async () => {
      try {
        // browser automatically include tokens in request headers
        // because of withCredentials: true in axios config.
        // cookies are set in the backend and sent to the browser
        await axios.post(LOGIN_URL, data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        toast.success("Login successful!");
        router.push("/");
      } catch (error: unknown) {
        const message = "Invalid email address or password";
        toast.error(displayError(error, message));
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="***********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer" disabled={isPending}>
          {isPending ? (
            <React.Fragment>
              <Loader2
                className="mr-1 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Logging in...
              <span className="sr-only">Logging in...</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Login
              <span className="sr-only">Login</span>
            </React.Fragment>
          )}
        </Button>
      </form>
    </Form>
  );
}

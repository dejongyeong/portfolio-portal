"use client";

import axios from "axios";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { getToken } from "@/lib/auth/token";
import { LOGOUT_URL } from "@/lib/shared/endpoints";
import { handleError } from "@/lib/shared/handle-error";

export default function LogoutForm() {
  const form = useForm();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const token = await getToken();

      try {
        await axios.post(LOGOUT_URL, null, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        toast.success("Logout successful!");
        router.push("/login");
      } catch (error: unknown) {
        const message = "Logout failed. Please try again.";
        toast.error(handleError(error, message));
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <SidebarMenuButton
          type="submit"
          disabled={isPending}
          aria-label="Logout"
          className="cursor-pointer"
          tooltip="Logout"
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Logging out...
              <span className="sr-only">Logging out...</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LogOut className="size-4" aria-hidden="true" />
              Logout
              <span className="sr-only">Logout</span>
            </React.Fragment>
          )}
        </SidebarMenuButton>
      </form>
    </Form>
  );
}

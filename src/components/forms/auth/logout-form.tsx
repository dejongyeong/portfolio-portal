"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth/token";
import { LOGOUT_URL } from "@/lib/shared/endpoints";
import { handleError } from "@/lib/shared/handle-error";

export default function LogoutForm() {
  const router = useRouter();

  const handleLogoutAction = async () => {
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
  };

  // try with react 19 useFormStatus
  return (
    <React.Fragment>
      <form action={handleLogoutAction}>
        <SubmitButton />
      </form>
    </React.Fragment>
  );
}

/**
 * Submit button for the logout form.
 *
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-label="Logout"
      className="cursor-pointer"
    >
      {pending ? (
        <React.Fragment>
          <Loader2 className="mr-1 h-4 w-4 animate-spin" aria-hidden="true" />
          Logging out...
          <span className="sr-only">Logging in...</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          Logout
          <span className="sr-only">Logout</span>
        </React.Fragment>
      )}
    </Button>
  );
}

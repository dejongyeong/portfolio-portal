"use client";

import { Eye, EyeOff } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // button for toggling password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const disabled = props.disabled || props.value === "";

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={togglePasswordVisibility}
        disabled={disabled}
        className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
      >
        {showPassword ? (
          <Eye className="size-4" aria-hidden="true" />
        ) : (
          <EyeOff className="size-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

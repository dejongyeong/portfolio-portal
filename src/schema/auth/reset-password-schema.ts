import { z } from "zod";

export const resetPasswordTokenSearchParamsSchema = z.object({
  token: z.string().optional(),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

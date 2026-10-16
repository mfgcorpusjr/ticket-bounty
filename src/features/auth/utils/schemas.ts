import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.email().trim(),
    password: z.string().trim().min(6, {
      error: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be 100 characters or less" })
    .trim(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255, { message: "Password must be 255 characters or less" })
});

export type LoginType = z.infer<typeof loginSchema>;
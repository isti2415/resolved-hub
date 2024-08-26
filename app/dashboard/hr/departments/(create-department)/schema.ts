import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string()
    .min(1, { message: "Department Name is required" })
    .max(100, { message: "Department Name must be 100 characters or less" })
    .trim(),
});

export type LoginType = z.infer<typeof createDepartmentSchema>;
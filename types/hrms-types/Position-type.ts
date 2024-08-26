import { z } from "zod";

export const Position = z.object({
  name: z.string()
    .min(1, { message: "Position Name is required" })
    .max(100, { message: "Position Name must be 100 characters or less" })
    .trim(),
});

export type LoginType = z.infer<typeof Position>;
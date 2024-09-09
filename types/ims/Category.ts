import { Description } from "@radix-ui/react-toast";
import { z } from "zod";

export const Category = z.object({
  name: z.string()
    .min(1, { message: "Category Name is required" })
    .max(100, { message: "Category Name must be 100 characters or less" })
    .trim(),
    description: z.string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be 500 characters or less" })
    .trim(),
});

export type CategoryType = z.infer<typeof Category>
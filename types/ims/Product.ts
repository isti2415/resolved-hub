import { z } from "zod";

export const Product = z.object({
  name: z.string()
    .min(1, { message: "Product Name is required" })
    .max(100, { message: "Product Name must be 100 characters or less" })
    .trim(),
  description: z.string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be 500 characters or less" })
    .trim(),
  category_id: z.string()
    .min(1, { message: "Category ID is required" }),
  cost_price: z.number()
    .positive({ message: "Cost Price must be a positive number" }),
  selling_price: z.number()
    .positive({ message: "Selling Price must be a positive number" }),
  quantity_in_stock: z.number()
    .int({ message: "Quantity must be an integer" })
    .nonnegative({ message: "Quantity must be zero or positive" }),
});

export type ProductType = z.infer<typeof Product>;
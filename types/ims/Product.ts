import { z } from "zod";

export const Product = z.object({
  name: z.string()
    .min(1, { message: "Product bame is required" })
    .trim(),
  description: z.string()
    .min(1, { message: "Description is required" })
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
import { z } from "zod";

export const Supplier = z.object ({
    name: z.string()
    .min(1, {message: "Supplier Nam is required"}),
    Contact_person: z.string()
    .min(1, {message: "Contact Person is required"}),
    phone: z.string()
    .min(11, {message: "Phone number is required"}),
    email: z.string()
    .email("Invalid email address"),
    address: z.string()
    .min(1, {message: "Address is required"})
});

export type SupplierType = z.infer<typeof Supplier>;
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const Employee = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_joining: z
    .string()
    .datetime()
    .refine((value) => !isNaN(Date.parse(value)), 'Invalid date format')
    .transform((value) => new Date(value)),
  contact_number: z.string().min(1, 'Contact number is required'),
  department_id: z.string().min(1, 'Department ID is required'),
  position_id: z.string().min(1, 'Position ID is required'),
  status: z.enum(["Active", "On Leave", "Terminated", "Suspended", "Retired", "Resigned"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type EmployeeType = z.infer<typeof Employee>;

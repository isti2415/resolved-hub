import { z } from "zod";

export const Employee = z.object({
  first_name: z.string()
    .min(1, { message: "Employee's First Name is required" })
    .max(100, { message: "Employee's First Name must be 100 characters or less" })
    .trim(),
  last_name: z.string()
    .min(1, { message: "Employee's Last Name is required" })
    .max(100, { message: "Employee's Last Name must be 100 characters or less" })
    .trim(),
  email: z.string()
    .email({ message: "Invalid email address" }),
  contact_number: z.string()
    .min(1, { message: "Contact number is required" }),
  date_of_joining: z.string()
    .datetime({ message: "Invalid date format. Use ISO 8601 format." }),
  department_id: z.string()
    .min(1, { message: "Department ID is required" }),
  position_id: z.string()
    .min(1, { message: "Position ID is required" }),
  salary: z.number()
    .positive({ message: "Salary must be a positive number" }),
  status: z.string()
    .min(1, { message: "Status is required" })
});

export type EmployeeType = z.infer<typeof Employee>;
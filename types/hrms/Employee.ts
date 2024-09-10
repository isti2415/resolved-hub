import { z } from 'zod';


export const Employee = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  emailVisibility: z.boolean(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirm: z.string().min(8, 'Password confirmation must be at least 8 characters long'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_joining: z.string().datetime('Invalid date of joining'),
  contact_number: z.string().min(1, 'Contact number is required'),
  department_id: z.string().min(1, 'Department ID is required'),
  position_id : z.string().min(1, 'Position ID is required'),
  salary: z.number().positive('Salary must be a positive number'),
  status: z.enum(["Active", "On Leave", "Terminated", "Suspended", "Retired", "Resigned"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
});

export type EmployeeType = z.infer<typeof Employee>;
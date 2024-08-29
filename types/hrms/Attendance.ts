import { z } from "zod";

export const Attendance = z.object({
  check_in_time: z.string()
    .datetime({ message: "Invalid check-in time format. Use ISO 8601 format." }),
  check_out_time: z.string()
    .datetime({ message: "Invalid check-out time format. Use ISO 8601 format." }),
  date: z.string()
    .datetime({ message: "Invalid date format. Use ISO 8601 format." }),
  employee_id: z.string()
    .min(1, { message: "Employee ID is required" })
});

export type AttendanceType = z.infer<typeof Attendance>;
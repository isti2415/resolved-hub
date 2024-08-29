import { getAllDepartments } from "@/actions/hrms/department";
import { getAllPositions } from "@/actions/hrms/position";
import { RecordModel } from "pocketbase";
import { z } from "zod";
import { Result } from "../Result";

export const Department: { [key: string]: string } = {};
export const Position: { [key: string]: string } = {};

function updateEnum(
  enumObject: { [key: string]: string },
  newValues: { [key: string]: string }
): void {
  Object.keys(enumObject).forEach(key => delete enumObject[key]);
  Object.assign(enumObject, newValues);
}

export const updateEmployeeEnums = async (): Promise<void> => {
  const [departmentsResult, positionsResult] = await Promise.all([
    getAllDepartments(),
    getAllPositions()
  ]);

  if (departmentsResult.data) {
    const departmentValues = departmentsResult.data.reduce((acc: {[key: string]: string}, item: RecordModel) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
    updateEnum(Department, departmentValues);
  }

  if (positionsResult.data) {
    const positionValues = positionsResult.data.reduce((acc: {[key: string]: string}, item: RecordModel) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
    updateEnum(Position, positionValues);
  }
};

updateEmployeeEnums();

const DepartmentEnum = z.nativeEnum(Department);
const PositionEnum = z.nativeEnum(Position);

export const Employee = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  first_name: z.string()
    .min(1, { message: "First Name is required" })
    .max(100, { message: "First Name must be 100 characters or less" })
    .trim(),
  last_name: z.string()
    .min(1, { message: "Last Name is required" })
    .max(100, { message: "Last Name must be 100 characters or less" })
    .trim(),
  date_of_joining: z.string()
    .min(1, { message: "Date of Joining is required" }),
  contact_number: z.string()
    .min(1, { message: "Contact Number is required" })
    .regex(/^\+?[0-9\s-()]+$/, { message: "Invalid contact number format" }),
  department_id: DepartmentEnum,
  position_id: PositionEnum,
  salary: z.number()
    .positive({ message: "Salary must be a positive number" }),
  status: z.enum(["Active", "On Leave", "Terminated", "Suspended", "Retired", "Resigned"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
});

export type EmployeeType = z.infer<typeof Employee>;
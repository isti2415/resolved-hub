import { getAllDepartments } from "@/actions/hrms/department";
import { getAllPositions } from "@/actions/hrms/position";
import { z } from "zod";
import { Result } from "../Result";

export const Department: { [key: string]: string } = {};
export const Position: { [key: string]: string } = {};

export let departmentOptions: { name: string; id: string }[] = [];
export let positionOptions: { name: string; id: string }[] = [];

async function createDepartmentEnum() {
  const result: Result = await getAllDepartments();
  const departments = result.data;

  if (!Array.isArray(departments)) {
    throw new Error("Expected an array of departments");
  }

  departmentOptions = departments.map((department) => ({
    name: department.name,
    id: department.id,
  }));

  const DepartmentEnum = departments.reduce((acc, department) => {
    acc[department.name] = department.id;
    return acc;
  }, {} as Record<string, string>);

  Object.assign(Department, DepartmentEnum);
}

async function createPositionEnum() {
  const result: Result = await getAllPositions();
  const positions = result.data;

  if (!Array.isArray(positions)) {
    throw new Error("Expected an array of positions");
  }

  positionOptions = positions.map((position) => ({
    name: position.name,
    id: position.id,
  }));

  const PositionEnum = positions.reduce((acc, position) => {
    acc[position.name] = position.id;
    return acc;
  }, {} as Record<string, string>);

  Object.assign(Position, PositionEnum);
}

createDepartmentEnum();
createPositionEnum();

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

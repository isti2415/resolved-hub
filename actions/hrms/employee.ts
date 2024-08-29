"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Employee } from "@/types/hrms/Employee";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const EMPLOYEES_COLLECTION = "Employees";
const EMPLOYEES_PATH = "/dashboard/hr/employees";

function isRecordModel(value: any): value is RecordModel {
  return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
}

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(EMPLOYEES_PATH);
    return { 
      success: true, 
      message: successMessage, 
      data: Array.isArray(result) ? result : (isRecordModel(result) ? [result] : undefined)
    };
  } catch (error) {
    console.error("PocketBase operation error:", error);
    return handleError(error);
  }
}

function handleError(error: unknown): Result {
  if (error instanceof ClientResponseError) {
    switch (error.status) {
      case 400:
        return { success: false, message: "Invalid data provided" };
      case 404:
        return { success: false, message: "Employee not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function createEmployee(data: z.infer<typeof Employee>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).create<RecordModel>(data),
    "Employee Created Successfully"
  );
}

export async function deleteEmployee(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).delete(id),
    "Employee Deleted Successfully"
  );
}

export async function editEmployee(id: string, data: z.infer<typeof Employee>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).update<RecordModel>(id, data),
    "Employee Updated Successfully"
  );
}

export async function getAllEmployees(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).getFullList<RecordModel>(),
    "Employees Fetched Successfully"
  );
}

export async function getEmployeeById(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).getOne<RecordModel>(id),
    "Employee Fetched Successfully"
  );
}


export async function getEmployeesByDepartment(departmentId: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).getFullList<RecordModel>({
      filter: `department_id="${departmentId}"`,
    }),
    "Employees Fetched Successfully"
  );
}

export async function getActiveEmployees(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(EMPLOYEES_COLLECTION).getFullList<RecordModel>({
      filter: 'status="active"',
    }),
    "Active Employees Fetched Successfully"
  );
}
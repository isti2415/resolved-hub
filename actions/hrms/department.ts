"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Department } from "@/types/hrms/Department";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const DEPARTMENTS_COLLECTION = "Departments";
const DEPARTMENTS_PATH = "/dashboard/hr/departments";

function isRecordModel(value: any): value is RecordModel {
    return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
  }

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(DEPARTMENTS_PATH);
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
        return { success: false, message: "Department not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function createDepartment(data: z.infer<typeof Department>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(DEPARTMENTS_COLLECTION).create<RecordModel>(data),
    "Department Created Successfully"
  );
}

export async function deleteDepartment(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(DEPARTMENTS_COLLECTION).delete(id),
    "Department Deleted Successfully"
  );
}

export async function editDepartment(id: string, data: z.infer<typeof Department>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(DEPARTMENTS_COLLECTION).update<RecordModel>(id, data),
    "Department Updated Successfully"
  );
}

export async function getAllDepartments(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(DEPARTMENTS_COLLECTION).getFullList<RecordModel>(),
    "Departments Fetched Successfully"
  );
}

export async function getDepartmentById(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(DEPARTMENTS_COLLECTION).getOne<RecordModel>(id),
    "Department Fetched Successfully"
  );
}
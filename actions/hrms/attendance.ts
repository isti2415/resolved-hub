"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Attendance } from "@/types/hrms/Attendance";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const ATTENDANCE_COLLECTION = "Attendance";
const ATTENDANCE_PATH = "/dashboard/hr/attendance";

function isRecordModel(value: any): value is RecordModel {
  return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
}

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(ATTENDANCE_PATH);
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
        return { success: false, message: "Attendance record not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function addAttendance(data: z.infer<typeof Attendance>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(ATTENDANCE_COLLECTION).create<RecordModel>(data),
    "Attendance Recorded Successfully"
  );
}


export async function editAttendance(id: string, data: z.infer<typeof Attendance>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(ATTENDANCE_COLLECTION).update<RecordModel>(id, data),
    "Attendance Updated Successfully"
  );
}

export async function getAttendanceByEmployee(employeeId: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(ATTENDANCE_COLLECTION).getFullList<RecordModel>({
      filter: `employee_id="${employeeId}"`,
      sort: '-date',
    }),
    "Employee Attendance Fetched Successfully"
  );
}

export async function getAttendanceByDateRange(startDate: string, endDate: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(ATTENDANCE_COLLECTION).getFullList<RecordModel>({
      filter: `date>="${startDate}" && date<="${endDate}"`,
      sort: '-date',
    }),
    "Attendance Records Fetched Successfully"
  );
}
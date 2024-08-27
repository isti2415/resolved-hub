"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Position } from "@/types/hrms/Position";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const POSITIONS_COLLECTION = "Positions";
const POSITIONS_PATH = "/dashboard/hr/positions";

function isRecordModel(value: any): value is RecordModel {
  return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
}

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(POSITIONS_PATH);
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
        return { success: false, message: "Position not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function createPosition(data: z.infer<typeof Position>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(POSITIONS_COLLECTION).create<RecordModel>(data),
    "Position Created Successfully"
  );
}

export async function deletePosition(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(POSITIONS_COLLECTION).delete(id),
    "Position Deleted Successfully"
  );
}

export async function editPosition(id: string, data: z.infer<typeof Position>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(POSITIONS_COLLECTION).update<RecordModel>(id, data),
    "Position Updated Successfully"
  );
}

export async function getAllPositions(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(POSITIONS_COLLECTION).getFullList<RecordModel>(),
    "Positions Fetched Successfully"
  );
}


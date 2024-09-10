"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Supplier } from "@/types/purchase/Supplier";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const SupplierS_COLLECTION = "Suppliers";
const SupplierS_PATH = "/purchase/suppliers";

function isRecordModel(value: any): value is RecordModel {
    return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
  }

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(SupplierS_PATH);
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
        return { success: false, message: "Supplier not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function createSupplier(data: z.infer<typeof Supplier>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(SupplierS_COLLECTION).create<RecordModel>(data),
    "Supplier Created Successfully"
  );
}

export async function deleteSupplier(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(SupplierS_COLLECTION).delete(id),
    "Supplier Deleted Successfully"
  );
}

export async function editSupplier(id: string, data: z.infer<typeof Supplier>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(SupplierS_COLLECTION).update<RecordModel>(id, data),
    "Supplier Updated Successfully"
  );
}

export async function getAllSuppliers(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(SupplierS_COLLECTION).getFullList<RecordModel>(),
    "Suppliers Fetched Successfully"
  );
}

export async function getSupplierById(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(SupplierS_COLLECTION).getOne<RecordModel>(id),
    "Supplier Fetched Successfully"
  );
}
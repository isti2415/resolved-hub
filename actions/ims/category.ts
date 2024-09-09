"use server";

import { createBrowserClient } from "@/lib/pocketbase";
import { Category } from "@/types/ims/Category";
import { Result } from "@/types/Result";
import { revalidatePath } from "next/cache";
import { ClientResponseError, RecordModel } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();
const CATEGORIES_COLLECTION = "Categories";
const CATEGORIES_PATH = "/dashboard/inventory/categories";

function isRecordModel(value: any): value is RecordModel {
  return typeof value === 'object' && value !== null && 'id' in value && 'collectionId' in value;
}

async function handlePocketBaseOperation<T extends RecordModel | RecordModel[] | boolean>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<Result> {
  try {
    const result = await operation();
    revalidatePath(CATEGORIES_PATH);
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
        return { success: false, message: "Category not found" };
      default:
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
  }
  return {
    success: false,
    message: "A network error occurred. Please check your connection and try again.",
  };
}

export async function createCategory(data: z.infer<typeof Category>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(CATEGORIES_COLLECTION).create<RecordModel>(data),
    "Category Created Successfully"
  );
}

export async function deleteCategory(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(CATEGORIES_COLLECTION).delete(id),
    "Category Deleted Successfully"
  );
}

export async function editCategory(id: string, data: z.infer<typeof Category>): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(CATEGORIES_COLLECTION).update<RecordModel>(id, data),
    "Category Updated Successfully"
  );
}

export async function getAllCategories(): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(CATEGORIES_COLLECTION).getFullList<RecordModel>(),
    "Categories Fetched Successfully"
  );
}

export async function getCategoryById(id: string): Promise<Result> {
  return handlePocketBaseOperation(
    () => pb.collection(CATEGORIES_COLLECTION).getOne<RecordModel>(id),
    "Category Fetched Successfully"
  );
}
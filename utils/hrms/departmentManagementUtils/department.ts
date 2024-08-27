"use server";
import { createBrowserClient } from "@/lib/pocketbase";
import { Department } from "@/types/hrms/Department";
import { revalidatePath } from "next/cache";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();

export async function createDepartment(data: z.infer<typeof Department>) {
  try {
    const response = await pb.collection("Departments").create(data);

    if (response) {
      console.log(response);
      revalidatePath("/hr/departments")
      return { success: true, message: "Department Created Successfully" };
    }
  } catch (error) {
    console.error("Error creating department:", error);

    if (error instanceof ClientResponseError) {
      if (error.status === 400) {
        return { success: false, message: "Invalid department name" };
      } else {
        return {
          success: false,
          message: "An unexpected error occurred. Please try again.",
        };
      }
    } else {
      return {
        success: false,
        message:
          "A network error occurred. Please check your connection and try again.",
      };
    }
  }
}

export async function editDepartment(id: string, data: z.infer<typeof Department>) {
  try {
    const response = await pb.collection("Departments").update(id, data);

    if (response) {
      console.log(response);
      revalidatePath("/hr/departments")
      return { success: true, message: "Department Updated Successfully" };
    }
  } catch (error) {
    console.error("Error updating department:", error);

    if (error instanceof ClientResponseError) {
      if (error.status === 400) {
        return { success: false, message: "Invalid department name" };
      } else {
        return {
          success: false,
          message: "An unexpected error occurred. Please try again.",
        };
      }
    } else {
      return {
        success: false,
        message:
          "A network error occurred. Please check your connection and try again.",
      };
    }
  }
}

"use client";

import AutoForm, { AutoFormSubmit } from "@/components/auto-form";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import React, { useState } from "react";
import { z } from "zod";
import { createDepartment } from "@/utils/hrms/departmentManagementUtils/createDepartment";
import { Department } from "@/types/hrms-types/Department-type";
import { toast } from "@/components/ui/use-toast";

function CreateDepartmentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof Department>) => {
    setIsLoading(true);
    try {
      const result = await createDepartment(values);
      if (result?.success) {
        toast({
          title: "Department Created",
          description: result.message,
        });
      } else {
        toast({
          title: "Failed to create Department",
          description: result?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in createDepartment:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button>Create New Department</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Create Department</CredenzaTitle>
          <CredenzaDescription>
            Enter the department name below to create a new department.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Department}
          fieldConfig={{ name: { label: "Department Name" } }}
          className="p-4 md:p-0"
        >
          <AutoFormSubmit className="w-full" disabled={isLoading}>
            Submit
          </AutoFormSubmit>
        </AutoForm>
      </CredenzaContent>
    </Credenza>
  );
}

export default CreateDepartmentForm;
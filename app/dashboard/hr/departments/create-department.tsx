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
import { createDepartment } from "@/actions/hrms/department";
import { Department } from "@/types/hrms/Department";
import { toast } from "@/components/ui/use-toast";

function CreateDepartmentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Department>) => {
    setIsLoading(true);
    const result = await createDepartment(values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Department Created",
        description: result.message,
      });
      setIsOpen(false); // Close the Credenza
    } else {
      toast({
        title: "Failed to create Department",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
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
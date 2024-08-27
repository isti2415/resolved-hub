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
import { editDepartment } from "@/actions/hrms/department";
import { Department} from "@/types/hrms/Department";
import { toast } from "@/components/ui/use-toast";


function EditDepartmentForm({id, name}:{id: string, name: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Department>) => {
    setIsLoading(true);
    const result = await editDepartment(id, values);
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
        <Button variant={"ghost"}>Edit Department</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Department</CredenzaTitle>
          <CredenzaDescription>
            Edit existing department.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Department}
          fieldConfig={{ name: { label: "Department Name", inputProps: {placeholder: name} } }}
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

export default EditDepartmentForm;
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
import { editEmployee } from "@/actions/hrms/employee";
import { Employee} from "@/types/hrms/Employee";
import { toast } from "@/components/ui/use-toast";


function EditEmployeeForm({id, name}:{id: string, name: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Employee>) => {
    setIsLoading(true);
    const result = await editEmployee(id, values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Employee Created",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to create Employee",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant={"ghost"}>Edit Employee</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Employee</CredenzaTitle>
          <CredenzaDescription>
            Edit existing employee.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Employee}
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

export default EditEmployeeForm;
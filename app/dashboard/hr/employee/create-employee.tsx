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
import { createEmployee } from "@/actions/hrms/employee";
import { Employee } from "@/types/hrms/Employee";
import { toast } from "@/components/ui/use-toast";
import { RecordModel } from "pocketbase";

function CreateEmployeeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const onSubmit = async (values: z.infer<typeof Employee>) => {
    setIsLoading(true);
    console.log(values)
    const result = await createEmployee(values);
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
        <Button>Create New Employee</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Create Employee</CredenzaTitle>
          <CredenzaDescription>
            Enter the employee name below to create a new employee.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Employee}
          fieldConfig={{
            first_name: {
              label: "First Name"
            },
            last_name: {
              label: "Last Name"
            },
            date_of_joining: {
              label: "Date of Joining"
            },
            contact_number: {
              label: "Contact Number"
            },
            department_id: {
              label: "Department",
            },
            position_id: {
              label: "Position"
            },
            status: {
              inputProps: {
                placeholder: "Select the employee status"
              }
            }
          }
          }
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

export default CreateEmployeeForm;
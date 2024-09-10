'use client'
import React, { useState } from 'react';
import { z } from 'zod';
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
import { toast } from "@/components/ui/use-toast";
import { createSupplier } from "@/actions/purchase/supplier";
import { Supplier } from "@/types/purchase/Supplier";

function CreateSupplierForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Supplier>) => {
    setIsLoading(true);
    console.log(values);
    const result = await createSupplier(values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Supplier Created",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to create Supplier",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button>Create New Supplier</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Create Supplier</CredenzaTitle>
          <CredenzaDescription>
            Enter the Supplier details below to create a new Supplier.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Supplier}
          fieldConfig={{
            name: {
              label: "Supplier Name",
              inputProps: {
                placeholder: "Enter Supplier name"
              }
            },
            Contact_person: {
              label: "Contact Person",
              inputProps: {
                placeholder: "Enter Contact Person Name"
              }
            },
            phone: {
                label: "Phone",
                inputProps: {
                    placeholder: "Enter Phone Number"
                }
            },
            email: {
                label: "Email",
                inputProps: {
                    placeholder: "Enter Email Address"
                }
            },
            address: {
                label: "Address",
                inputProps: {
                    placeholder: "Enter Supplier Address"
                }
            }
          }}
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

export default CreateSupplierForm;
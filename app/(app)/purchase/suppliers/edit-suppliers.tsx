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
import { editSupplier } from "@/actions/purchase/supplier";
import { Supplier } from "@/types/purchase/Supplier";

function EditSupplierForm({ id, name, contact_person, phone, email, address }: {
  id: string;
  name: string;
  contact_person: string;
  phone: string,
  email: string,
  address: string
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Supplier>) => {
    setIsLoading(true);
    const result = await editSupplier(id, values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Supplier Updated",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to update Supplier",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="ghost">Edit Supplier</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Supplier</CredenzaTitle>
          <CredenzaDescription>
            Edit existing Supplier details.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Supplier}
          fieldConfig={{
            name: {
              label: "Supplier Name",
              inputProps: { value: name }
            },
            Contact_person: {
                label: "Contact Person",
                inputProps: {
                  placeholder: contact_person
                }
              },
              phone: {
                  label: "Phone",
                  inputProps: {
                      placeholder: phone
                  }
              },
              email: {
                  label: "Email",
                  inputProps: {
                      placeholder: email
                  }
              },
              address: {
                  label: "Address",
                  inputProps: {
                      placeholder: address
                  }
              },
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

export default EditSupplierForm;
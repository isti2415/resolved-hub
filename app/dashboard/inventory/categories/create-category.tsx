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
import { createCategory } from "@/actions/ims/category";
import { Category } from "@/types/ims/Category";

function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Category>) => {
    setIsLoading(true);
    console.log(values);
    const result = await createCategory(values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Category Created",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to create Category",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button>Create New Category</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Create Category</CredenzaTitle>
          <CredenzaDescription>
            Enter the category details below to create a new category.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Category}
          fieldConfig={{
            name: {
              label: "Category Name",
              inputProps: {
                placeholder: "Enter category name"
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

export default CreateCategoryForm;
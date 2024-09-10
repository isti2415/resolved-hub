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
import { editCategory } from "@/actions/ims/category";
import { Category } from "@/types/ims/Category";

function EditCategoryForm({ id, name, description }: {
  id: string;
  name: string;
  description: string;
  parent_category_id?: string | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Category>) => {
    setIsLoading(true);
    const result = await editCategory(id, values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Category Updated",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to update Category",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="ghost">Edit Category</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Category</CredenzaTitle>
          <CredenzaDescription>
            Edit existing category details.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Category}
          fieldConfig={{
            name: {
              label: "Category Name",
              inputProps: { placeholder: name }
            },
            description: {
              label: "Description",
              inputProps: { placeholder: description}
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

export default EditCategoryForm;
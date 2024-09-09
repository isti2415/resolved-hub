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
import { editProduct } from "@/actions/ims/product";
import { Product } from "@/types/ims/Product";

function EditProductForm({ id, name, description, category_id, cost_price, selling_price, quantity_in_stock }: {
  id: string;
  name: string;
  description: string;
  category_id: string;
  cost_price: number;
  selling_price: number;
  quantity_in_stock: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Product>) => {
    setIsLoading(true);
    const result = await editProduct(id, values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Product Updated",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to update Product",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="ghost">Edit Product</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Product</CredenzaTitle>
          <CredenzaDescription>
            Edit existing product details.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Product}
          fieldConfig={{
            name: {
              label: "Product Name",
              inputProps: { placeholder: name }
            },
            description: {
              label: "Description",
              inputProps: { placeholder: description }
            },
            category_id: {
              label: "Category",
              inputProps: { placeholder: category_id }
            },
            cost_price: {
              label: "Cost Price",
              inputProps: { placeholder: cost_price }
            },
            selling_price: {
              label: "Selling Price",
              inputProps: { placeholder: selling_price }
            },
            quantity_in_stock: {
              label: "Quantity in Stock",
              inputProps: { placeholder: quantity_in_stock }
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

export default EditProductForm;
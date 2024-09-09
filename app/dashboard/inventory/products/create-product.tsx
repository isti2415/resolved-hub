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
import { createProduct } from "@/actions/ims/product";
import { Product } from "@/types/ims/Product";

function CreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Product>) => {
    setIsLoading(true);
    console.log(values);
    const result = await createProduct(values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Product Created",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to create Product",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button>Create New Product</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Create Product</CredenzaTitle>
          <CredenzaDescription>
            Enter the product details below to create a new product.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Product}
          fieldConfig={{
            name: {
              label: "Product Name",
              inputProps: {
                placeholder: "Enter product name"
              }
            },
            description: {
              label: "Description",
              inputProps: {
                placeholder: "Enter product description"
              }
            },
            category_id: {
              label: "Category",
              inputProps: {
                placeholder: "Select product category"
              }
            },
            cost_price: {
              label: "Cost Price",
              inputProps: {
                placeholder: "Enter cost price"
              }
            },
            selling_price: {
              label: "Selling Price",
              inputProps: {
                placeholder: "Enter selling price"
              }
            },
            quantity_in_stock: {
              label: "Quantity in Stock",
              inputProps: {
                placeholder: "Enter quantity in stock"
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

export default CreateProductForm;
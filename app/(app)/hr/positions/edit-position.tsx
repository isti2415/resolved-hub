"use client";

import { editPosition } from "@/actions/hrms/position";
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
import { Position } from "@/types/hrms/Position";
import { useState } from "react";
import { z } from "zod";


function EditPositionForm({id, name}:{id: string, name: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof Position>) => {
    setIsLoading(true);
    const result = await editPosition(id, values);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Position Created",
        description: result.message,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to create Position",
        description: result?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant={"ghost"}>Edit Position</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Edit Position</CredenzaTitle>
          <CredenzaDescription>
            Edit existing department.
          </CredenzaDescription>
        </CredenzaHeader>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={Position}
          fieldConfig={{ name: { label: "Position Name", inputProps: {placeholder: name} } }}
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

export default EditPositionForm;
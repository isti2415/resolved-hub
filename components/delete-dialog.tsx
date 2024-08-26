"use client"

import { Result } from "@/types/Result";
import { Button } from "./ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from "./ui/credenza";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

interface DeleteDialogProps {
    button: string;
    description: string;
    onDelete: () => Promise<Result>;
}

function DeleteDialog({ button, description, onDelete }: DeleteDialogProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {toast} = useToast()

    const handleDelete = async () => {
        setIsLoading(true)
        const result = await onDelete();
        setIsLoading(false)
        if (result.success) {
            toast({
                title: "Record Deleted Successfully"
            })
            setIsOpen(false)
        }
        else {
            toast({
                variant:"destructive",
                title: "Failed to Delete Record"
            })
        }
    };

    return (
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger className="w-full" asChild>
                <Button className="w-full" variant="destructive">
                    {button}
                </Button>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Are you sure you want to delete?</CredenzaTitle>
                    <CredenzaDescription>{description}</CredenzaDescription>
                </CredenzaHeader>
                <CredenzaFooter>
                    <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>Confirm Delete</Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
}

export default DeleteDialog;
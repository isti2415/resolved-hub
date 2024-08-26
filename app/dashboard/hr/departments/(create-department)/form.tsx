"use client"

import AutoForm, { AutoFormSubmit } from '@/components/auto-form'
import { Button } from '@/components/ui/button'
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza'
import React, { useState } from 'react'
import { createDepartmentSchema } from './schema'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/lib/pocketbase'
import { ClientResponseError } from 'pocketbase'

function CreateDepartmentForm() {

    const toast = useToast().toast;
    const [isLoading, setIsLoading] = useState(false);
    const pb = createBrowserClient()

    const onSubmit = async (values: z.infer<typeof createDepartmentSchema>) => {
        setIsLoading(true);
        try {
            const response = await pb.collection('Departments').create(values)
            if(response){
                toast({
                    title: "Department Created",
                    description: "Department Created Successfully",
                });
            }
        } catch (error) {
            if (error instanceof ClientResponseError) {
                if (error.status === 400) {
                    toast({
                        title: "Failed to create Department",
                        description: "Invalid department name",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Failed to create Department",
                        description: "An unexpected error occurred. Please try again.",
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Failed to create Department",
                    description:
                        "A network error occurred. Please check your connection and try again.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button>Create New Department</Button>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle className="text-2xl">Create Department</CredenzaTitle>
                    <CredenzaDescription>
                        Enter the department name below to create a new department.
                    </CredenzaDescription>
                </CredenzaHeader>
                <AutoForm onSubmit={onSubmit} formSchema={createDepartmentSchema} fieldConfig={{ name: { label: "Department Name" } }} className='p-4 md:p-0'>
                    <AutoFormSubmit className='w-full' disabled={isLoading}>Submit</AutoFormSubmit>
                </AutoForm>
            </CredenzaContent>
        </Credenza>
    )
}

export default CreateDepartmentForm
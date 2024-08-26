import { toast } from "@/components/ui/use-toast";
import { createBrowserClient } from "@/lib/pocketbase";
import { Employee } from "@/types/hrms/Employee";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient()

export async function createEmployee(data: z.infer<typeof Employee>, setIsLoading: (loading: boolean) => void){
    setIsLoading(true);
    try {
        const response = await pb.collection('Employees').create(data);
        if(response){
            console.log(response)
            toast({
                title: "Employee Created",
                description: "Employee Created Successfully",
            });
        }
    } catch (error) {
        if (error instanceof ClientResponseError) {
            if (error.status === 400) {
                toast({
                    title: "Failed to create Employee",
                    description: "Invalid Employee name",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Failed to create Employee",
                    description: "An unexpected error occurred. Please try again.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Failed to create Employee",
                description:
                    "A network error occurred. Please check your connection and try again.",
                variant: "destructive",
            });
        }
    }
    finally {
        setIsLoading(false);
    }
}

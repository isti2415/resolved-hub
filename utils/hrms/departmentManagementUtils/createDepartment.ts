import { toast } from "@/components/ui/use-toast";
import { createBrowserClient } from "@/lib/pocketbase";
import { Department } from "@/types/hrms-types/Department-type";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient()

export async function createDepartment(data: z.infer<typeof Department>, setIsLoading: (loading: boolean) => void){
    setIsLoading(true);
    try {
        const response = await pb.collection('Departments').create(data);
        if(response){
            console.log(response)
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
    }
    finally {
        setIsLoading(false);
    }
}

import { toast } from "@/components/ui/use-toast";
import { createBrowserClient } from "@/lib/pocketbase";
import { Position } from "@/types/hrms/Position";
import { ClientResponseError } from "pocketbase";
import { z } from "zod";

const pb = createBrowserClient();

export async function createPosition(
  data: z.infer<typeof Position>,
  setIsLoading: (loading: boolean) => void
) {
  setIsLoading(true);
  try {
    const response = await pb.collection("Positions").create(data);
    if (response) {
      console.log(response);
      toast({
        title: "Position Created",
        description: "Position Created Successfully",
      });
    }
  } catch (error) {
    if (error instanceof ClientResponseError) {
      if (error.status === 400) {
        toast({
          title: "Failed to create Position",
          description: "Invalid Position name",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to create Position",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Failed to create Position",
        description:
          "A network error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  } finally {
    setIsLoading(false);
  }
}

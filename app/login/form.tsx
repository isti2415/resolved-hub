"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "./schema";
import { createBrowserClient } from "@/lib/pb";
import { ClientResponseError } from "pocketbase";

export function LoginForm() {
  const toast = useToast().toast;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pb = createBrowserClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(values.email, values.password);
      toast({
        title: "Logged in successfully",
        description: "Redirecting to dashboard",
      });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        if (error.status === 400) {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Login failed",
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Log in"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

"use client"

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger, CredenzaFooter } from "@/components/ui/credenza";
import { RecordModel } from 'pocketbase';
import { getAllDepartments } from '@/actions/hrms/department';
import { getAllPositions } from '@/actions/hrms/position';
import { createBrowserClient } from '@/lib/pocketbase';
import Phone from '@/components/ui/phone-input';
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from "@/components/ui/use-toast";
import { createEmployee } from '@/actions/hrms/employee';
import { Employee } from '@/types/hrms/Employee';
import { cn } from '@/lib/utils';

type FormValues = z.infer<typeof Employee>;

export default function EmployeeRegistrationForm() {
  const [departments, setDepartments] = useState<RecordModel[]>([]);
  const [positions, setPositions] = useState<RecordModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(Employee),
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      date_of_joining: new Date(),
      contact_number: '',
      department_id: '',  
      position_id: '',  
    },
  });

  useEffect(() => {
    const loadDepartmentsAndPositions = async () => {
      try {
        const fetchedDepartments = await getAllDepartments();
        if (fetchedDepartments.success && fetchedDepartments.data) {
          setDepartments(fetchedDepartments.data);
        }
        const fetchedPositions = await getAllPositions();
        if (fetchedPositions.success && fetchedPositions.data) {
          setPositions(fetchedPositions.data);
        }
      } catch (error) {
        console.error('Error fetching departments or positions:', error);
        toast({
          title: "Error",
          description: "Failed to load departments and positions. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadDepartmentsAndPositions();
  }, [toast]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const record = await createEmployee({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_joining: data.date_of_joining,
        contact_number: data.contact_number,
        department_id: data.department_id,
        position_id: data.position_id,
        password: data.password,
        confirmPassword: data.password,
        status: "Active",
        image: data.image,

      });
      toast({
        title: "Success",
        description: "Employee registered successfully!",
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to register employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="outline">Register New Employee</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Employee Registration</CredenzaTitle>
          <CredenzaDescription>
            Fill out the form below to register a new employee.
          </CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
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
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
        control={form.control}
        name="date_of_joining"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of joining</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>   
        )}
      />

            <Phone
              name={"contact_number"}
              control={form.control}
              label={"Contact Number"}
              placeholder='+8801800000000'
            />

            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}
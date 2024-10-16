"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignInValues } from "@/lib/types";
import { registerAction } from "@/app/actions/auth.actions";
import { Role } from "@/lib/Column";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignInValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: SignInValues) {
    const res = await registerAction(values);
    if (res.success) {
      router.push("/dashboard/alokasi");
      toast({
        title: "Register has been succesfully",
      });
    } else {
      router.push("/auth/login");
      toast({
        variant: "destructive",
        title: "Oops something went wrong",
      });
    }
  }
  return (
    <Card className="w-screen max-w-lg rounded-lg shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold flex justify-between">
          Welcome back!
        </CardTitle>
        <CardDescription className="text-gray-500">
          Register your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
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
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {/* Corrected comparison: field.value is compared to role.value */}
                          {field.value
                            ? Role.find((role) => role.value === field.value)
                                ?.label
                            : "Select Role"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No Role found.</CommandEmpty>
                          <CommandGroup>
                            {Role.map((role) => (
                              <CommandItem
                                value={role.label}
                                key={role.value}
                                onSelect={() => field.onChange(role.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    role.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {role.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;

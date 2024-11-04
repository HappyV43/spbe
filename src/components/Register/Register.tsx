"use client"
import { EyeOff, Eye } from "lucide-react";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { registerAction } from "@/app/actions/auth.actions";
import { toast } from "@/hooks/use-toast";
import { SignInValues } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";


interface CompanyData {
  id: number;
  companyName: string;
}

interface RegisterProps {
  data: CompanyData[];
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInValues>({
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values: SignInValues) {
    const res = await registerAction(values);
    if (res.success) {
      toast({
        title: "Register has been succesfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops something went wrong",
      });
    }
  }
  
  return (
    <div className="flex w-full h-auto">
    <Card className="p-6 m-6 justify-center items-center w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="max-w-lg">

                      <Input
                        placeholder="Enter your username..."
                        {...field}
                        />
                    </div>
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
                    <div className="relative max-w-lg">
                      <Input
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password..."
                        {...field}
                      />
                      {/* Eye Icon Button */}
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">
              Sign sUp
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
  );
};

export default Register;

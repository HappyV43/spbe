import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login";
import SignUpForm from "./register";

const AuthLogin = async () => {
  return (
    // TODO: HAPUS REGISTER KETIKA MAU KE PRODUCTION
    <div className="flex min-h-screen items-center justify-center p-4">
      <Tabs defaultValue="Login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="Register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthLogin;

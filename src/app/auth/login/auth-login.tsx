import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login";
import SignUpForm from "./register";
import { getCompaniesNameData } from "@/app/actions/companies.action";

const AuthLogin = async () => {
  const data = await getCompaniesNameData();
  return (
    // TODO: HAPUS REGISTER KETIKA MAU KE PRODUCTION
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
{/* 
      <Tabs defaultValue="Login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
        </TabsContent>
        <TabsContent value="Register">
          <SignUpForm data={data} />
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default AuthLogin;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login";
import SignUpForm from "./register";

const AuthLogin = async () => {
  return (
    // TODO: HAPUS REGISTER KETIKA MAU KE PRODUCTION
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default AuthLogin;

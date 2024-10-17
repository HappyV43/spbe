import React from "react";
import { redirect } from "next/navigation";
import { assertAuthenticated } from "@/lib/lucia";

const Auth = async () => {
  const user = await assertAuthenticated();
  if (user) {
    redirect("/dashboard/penyaluran-elpiji");
  }

  return <div>403 Forbbiden</div>;
};

export default Auth;

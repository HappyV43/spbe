import React from "react";
import { getUser } from "@/app/actions/auth.actions";
import { redirect } from "next/navigation";

const Auth = async () => {
  const user = await getUser();
  if (user) {
    redirect("/dashboard/penyaluran-elpiji");
  }

  return <div>403 Forbbiden</div>;
};

export default Auth;

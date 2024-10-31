import React from "react";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/app/actions/auth.actions";

const Auth = async () => {
  const user = await getCurrentSession();
  if (user) {
    redirect("/dashboard/penyaluran-elpiji");
  }

  return <div>403 Forbbiden</div>;
};

export default Auth;

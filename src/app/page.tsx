import React from "react";
import { getCurrentSession } from "./actions/auth.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio dolor
      distinctio, incidunt repudiandae, ipsa quisquam eligendi quibusdam libero
      alias commodi sequi ut adipisci! Deserunt voluptatibus nesciunt
      consectetur nostrum eveniet sit.
    </div>
  );
};

export default page;

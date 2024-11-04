import { getCurrentSession } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import Form from "@/components/FormComponent/Form";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Form PKMU",
};

const FormCompanyPage = async () => {
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"master-data"}
      mainpage={"companies"}
      childpage={"form"}
      children={<Form page={"companies"} />}
    />
  );
};

export default FormCompanyPage;

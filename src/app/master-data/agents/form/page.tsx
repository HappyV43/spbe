import { getCurrentSession } from "@/app/actions/auth.actions";
import { getCompaniesNameData } from "@/app/actions/companies.action";
import { ContentLayout } from "@/components/ContentLayout";
import Form from "@/components/FormComponent/Form";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Form PKMU",
};

const FormAgentsPage = async () => {
  const companyName = await getCompaniesNameData();
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"master-data"}
      mainpage={"agents"}
      childpage={"form"}
      children={<Form page={"agents"} companyName={companyName} />}
    />
  );
};

export default FormAgentsPage;

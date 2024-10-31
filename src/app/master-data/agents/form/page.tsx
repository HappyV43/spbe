import { getCompaniesNameData } from "@/app/actions/companies.action";
import { ContentLayout } from "@/components/ContentLayout";
import Form from "@/components/FormComponent/Form";
import React from "react";

export const metadata = {
  title: "Form PKMU",
};

const FormAgentsPage = async () => {
  const companyName = await getCompaniesNameData();
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

import { getUser } from "@/app/actions/auth.actions";
import { searchDeliveryNumber } from "@/app/actions/lpg-distribution.action";
import { ContentLayout } from "@/components/ContentLayout";
import Form from "@/components/FormComponent/Form";
import React from "react";

export const metadata = {
  title: "Form PKMU",
};

const FormLpgPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const data = await searchDeliveryNumber(query);
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"penyaluran-elpiji"}
      childpage={"form"}
      children={<Form page={"distribution"} data={data}/>}
    />
  );
};

export default FormLpgPage;

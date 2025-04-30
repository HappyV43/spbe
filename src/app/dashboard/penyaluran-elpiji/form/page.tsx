import { getCurrentSession } from "@/app/actions/auth.actions";
import {
  getNextNumber,
  searchDeliveryNumber,
} from "@/app/actions/lpg-distribution.action";
import { ContentLayout } from "@/components/ContentLayout";
import DistributionForm from "@/components/Screens/FormComponent/DistributionForm";
import { redirect } from "next/navigation";
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
  const { session, user } = await getCurrentSession();
  if (!session && !user) {
    redirect("/auth/login");
  }
  const query = searchParams?.query || "";
  const data = await searchDeliveryNumber(query, user.id);
  const bpe = await getNextNumber(user.id);

  return (
    // <ContentLayout
    //   home={"dashboard"}
    //   mainpage={"penyaluran-elpiji"}
    //   childpage={"form"}
    //   children={
    <DistributionForm data={data} bpe={bpe} user={user} />
    //   }
    // />
  );
};

export default FormLpgPage;

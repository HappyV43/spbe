import { getCurrentSession, getUser } from "@/app/actions/auth.actions";
import { getCompaniesAll } from "@/app/actions/companies.action";
import Companies from "@/components/Companies/Companies";
import { ContentLayout } from "@/components/ContentLayout";
import { companiesColumns } from "@/lib/Column";
import { redirect } from "next/dist/server/api-utils";

export const metadata = {
  title: "Company PKMU",
};

const CompanyPage = async () => {
  const data = await getCompaniesAll();
  const { user } = await getCurrentSession();
  return (
    <ContentLayout
      home={"master-data"}
      mainpage={"companies"}
      children={<Companies columns={companiesColumns} data={data} />}
    />
  );
};

export default CompanyPage;

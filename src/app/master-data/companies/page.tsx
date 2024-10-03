import Companies from "@/components/Companies/Companies";
import { ContentLayout } from "@/components/ContentLayout";
import { companiesColumns } from "@/lib/Column";
import { dataCompanies } from "@/lib/DataCompanies";

export const metadata = {
  title: "Company PKMU",
};

const CompanyPage = () => {
    return (
      <ContentLayout 
        home={"master-data"} 
        mainpage={"companies"} 
        children={<Companies columns={companiesColumns} data={dataCompanies}/>}/>
    )
};

export default CompanyPage;

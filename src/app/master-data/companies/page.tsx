import Company from "@/components/Company/Company";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Company PKMU",
};

const CompanyPage = () => {
    return (
      <ContentLayout 
        home={"master-data"} 
        mainpage={"companies"} 
        children={<Company/>}/>
    )
};

export default CompanyPage;

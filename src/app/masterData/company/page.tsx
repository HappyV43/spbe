import Company from "@/components/Company/Company";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Company PKMU",
};

const CompanyPage = () => {
    return <ContentLayout title={"Master Data"} subtitle={"Companies"} children={<Company/>}/>
};

export default CompanyPage;

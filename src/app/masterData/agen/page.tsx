import Agen from "@/components/Agen/Agen";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Agen PKMU",
};

const AgenPage = () => {
    return <ContentLayout title={"Master Data"} subtitle={"Agen"} children={<Agen/>}/>
};

export default AgenPage;

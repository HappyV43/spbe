import Agen from "@/components/Agen/Agen";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Agen PKMU",
};

const AgenPage = () => {
    return (
      <ContentLayout
        home={"master-data"} 
        mainpage={"agen"} 
        children={<Agen/>}/>
    )
};

export default AgenPage;

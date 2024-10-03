import CetakPenyaluran from "@/components/CetakPenyaluran/CetakPenyaluran";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Cetak Penyaluran PKMU",
};

const CetakPenyaluranPage = () => {
  return( 
    <ContentLayout 
      home={"dashboard"}
      mainpage={"cetak-penyaluran"} 
      children={<CetakPenyaluran/>}/>
    )
};

export default CetakPenyaluranPage;

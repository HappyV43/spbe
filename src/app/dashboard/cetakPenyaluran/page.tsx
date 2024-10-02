import CetakPenyaluran from "@/components/CetakPenyaluran/CetakPenyaluran";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Cetak Penyaluran PKMU",
};

const CetakPenyaluranPage = () => {
  return <ContentLayout title={"Dashboard"} subtitle={"Cetak Penyaluran"} children={<CetakPenyaluran/>}/>
};

export default CetakPenyaluranPage;

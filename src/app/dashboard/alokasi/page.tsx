import Alokasi from "@/components/Alokasi/Alokasi";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = () => {
  return <ContentLayout title={"Dashboard"} subtitle={"Alokasi"} children={<Alokasi/>}/>
};

export default AlokasiPage;

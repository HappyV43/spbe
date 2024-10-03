// import Alokasi from "@/components/Alokasi/Alokasi";
import { ContentLayout } from "@/components/ContentLayout";
import UploadAlokasi from "@/components/UploadAlokasi/UploadAlokasi";

export const metadata = {
  title: "Upload Alokasi PKMU",
};

const AlokasiPage = () => {
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi"}
      childpage={"upload"}
      children={<UploadAlokasi/>}
    />
  );
};

export default AlokasiPage;

// import Alokasi from "@/components/Alokasi/Alokasi";
import { getUser } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import UploadAlokasi from "@/components/UploadAlokasi/UploadAlokasi";
import UploadAlokasiBulanan from "@/components/UploadAlokasiBulanan/UploadAlokasiBulanan";

export const metadata = {
  title: "Upload Alokasi Bulanan PKMU",
};

const AlokasiPage = () => {
  const user = getUser();

  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi-bulanan"}
      childpage={"upload"}
      children={<UploadAlokasiBulanan user={user} />}
    />
  );
};

export default AlokasiPage;

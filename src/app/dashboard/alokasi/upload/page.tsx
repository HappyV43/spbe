// import Alokasi from "@/components/Alokasi/Alokasi";
import { getUser } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import UploadAlokasi from "@/components/UploadAlokasi/UploadAlokasi";

export const metadata = {
  title: "Upload Alokasi PKMU",
};

const AlokasiPage = async () => {
  const user = await getUser();

  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi"}
      childpage={"upload"}
      children={<UploadAlokasi user={user} />}
    />
  );
};

export default AlokasiPage;

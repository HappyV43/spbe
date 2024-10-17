import { ContentLayout } from "@/components/ContentLayout";
import UploadAlokasi from "@/components/UploadAlokasi/UploadAlokasi";
import { assertAuthenticated } from "@/lib/lucia";

export const metadata = {
  title: "Upload Alokasi PKMU",
};

const AlokasiPage = async () => {
  const user = await assertAuthenticated();

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

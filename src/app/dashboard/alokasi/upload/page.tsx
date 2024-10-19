import { getCurrentSession } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import UploadAlokasi from "@/components/UploadAlokasi/UploadAlokasi";

export const metadata = {
  title: "Upload Alokasi PKMU",
};

const AlokasiPage = async () => {
  const user = await getCurrentSession();
  console.log(user)

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

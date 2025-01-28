import { getCurrentSession } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import { redirect } from "next/navigation";
import {
  getFilterData,
  getLpgDataDefault,
} from "@/app/actions/lpg-distribution.action";
import DownloadPage from "@/components/Screens/Download/Download";

export const metadata = {
  title: "Rekap Penyaluran PKMU",
};

const RekapPage = async () => {
  const [dataBpeDeliveryAgent, sessionData, defaultData] = await Promise.all([
    getFilterData(),
    getCurrentSession(),
    getLpgDataDefault(),
  ]);

  const { user, session } = sessionData;
  if (!session && !user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"rekap-penyaluran"}
      children={
        <DownloadPage
          dataBpeDeliveryAgent={dataBpeDeliveryAgent}
          defaultData={defaultData}
        />
      }
    />
  );
};

export default RekapPage;

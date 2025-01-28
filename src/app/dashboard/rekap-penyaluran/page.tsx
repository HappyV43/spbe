import { getCurrentSession } from "@/app/actions/auth.actions";
import { ContentLayout } from "@/components/ContentLayout";
import { redirect } from "next/navigation";
import { getAgentsName } from "@/app/actions/agent.action";
import Rekapan from "@/components/Screens/Rekapan/Rekapan";
import { getFilterData, getLpgDataDefault } from "@/app/actions/lpg-distribution.action";

export const metadata = {
  title: "Rekap Penyaluran PKMU",
};

const RekapPage = async () => {
  const [dataBpeDeliveryAgent, sessionData, defaultData] = await Promise.all([
    getFilterData(),
    getCurrentSession(),
    getLpgDataDefault()
  ]);

  const { user, session } = sessionData;
  if (!session && !user) {
    redirect("/auth/login");
  }
  return (
    // <ContentLayout
    //     home={"dashboard"}
    //     mainpage={"rekap-penyaluran"}
    //     children={
        <Rekapan
          data={data}
          user={user}
        />
    //   }
    // />
  );
};

export default RekapPage;

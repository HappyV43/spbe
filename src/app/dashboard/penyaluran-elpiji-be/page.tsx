import { getCurrentSession } from "@/app/actions/auth.actions";
import { redirect } from "next/navigation";
import {
  getFilterData,
  getLpgDataDefault,
} from "@/app/actions/lpg-distribution.action";
import RekapanScreen from "@/components/Screens/Rekapan/RekapanScreen";

export const metadata = {
  title: "Rekap Penyaluran PKMU",
};

const RekapPage: React.FC = async () => {
  const { user, session } = await getCurrentSession();
  if (!session && !user) {
    redirect("/auth/login");
  }
  const [dataBpeDeliveryAgent, defaultData] = await Promise.all([
    getFilterData(user.id),
    getLpgDataDefault(user.id),
  ]);

  return (
    <>
      <RekapanScreen
        user={user}
        dataBpeDeliveryAgent={dataBpeDeliveryAgent}
        defaultData={defaultData}
      />
    </>
  );
};

export default RekapPage;

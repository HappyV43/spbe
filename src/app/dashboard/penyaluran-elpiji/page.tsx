import { getCurrentSession } from "@/app/actions/auth.actions";
import {
  getFilterData,
  getLpgDataDefault,
} from "@/app/actions/lpg-distribution.action";
import PenyaluranElpiji from "@/components/Screens/PenyaluranElpiji/PenyaluranElpiji";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PenyaluranElpijiPage = async () => {
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
      <PenyaluranElpiji
        user={user}
        dataBpeDeliveryAgent={dataBpeDeliveryAgent}
        defaultData={defaultData}
      />
    </>
  );
};

export default PenyaluranElpijiPage;

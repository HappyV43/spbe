import { getAllokasiAll } from "@/app/actions/alokasi.action";
import { getCurrentSession } from "@/app/actions/auth.actions";
import Alokasi from "@/components/Alokasi/Alokasi";
import { ContentLayout } from "@/components/ContentLayout";
import { allocationColumns } from "@/lib/Column";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = async () => {
  const data = await getAllokasiAll();
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi"}
      children={<Alokasi columns={allocationColumns} data={data} />}
    />
  );
};

export default AlokasiPage;

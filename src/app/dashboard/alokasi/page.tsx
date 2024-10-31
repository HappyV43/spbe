import { getAllokasiAll } from "@/app/actions/alokasi.action";
import { getCurrentSession } from "@/app/actions/auth.actions";
import Alokasi from "@/components/Alokasi/Alokasi";
import { ContentLayout } from "@/components/ContentLayout";
import { allocationColumns } from "@/lib/Column";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = async () => {
  const data = await getAllokasiAll();

  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi"}
      children={<Alokasi columns={allocationColumns} data={data} />}
    />
  );
};

export default AlokasiPage;

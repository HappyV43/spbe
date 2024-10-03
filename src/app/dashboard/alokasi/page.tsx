// import Alokasi from "@/components/Alokasi/Alokasi";
import { getAllokasiAll } from "@/app/actions/alokasi.action";
import Alokasi from "@/components/Alokasi/Alokasi";
import { columns } from "@/lib/Column";
import { ContentLayout } from "@/components/ContentLayout";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = async () => {
  const data = await getAllokasiAll();
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi"}
      children={<Alokasi columns={columns} data={data} />}
    />
  );
};

export default AlokasiPage;

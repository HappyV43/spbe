// import Alokasi from "@/components/Alokasi/Alokasi";
import { getAllokasiAll } from "@/app/actions/alokasi.action";
import { columns } from "@/components/Alokasi/Column";
import { ContentLayout } from "@/components/ContentLayout";
import { DataTable } from "@/components/ui/data-table";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = async () => {
  const data = await getAllokasiAll();
  return (
    <ContentLayout
      title={"Dashboard"}
      subtitle={"Alokasi"}
      children={<DataTable columns={columns} data={data} />}
    />
  );
};

export default AlokasiPage;

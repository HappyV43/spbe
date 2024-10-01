import CetakPenyaluran from "@/components/CetakPenyaluran/CetakPenyaluran";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Cetak Penyaluran PKMU",
};

const CetakPenyaluranPage = () => {
  return (
    <DefaultLayout>
      <CetakPenyaluran/>
    </DefaultLayout>
  );
};

export default CetakPenyaluranPage;

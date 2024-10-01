import Alokasi from "@/components/Alokasi/Alokasi";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Alokasi PKMU",
};

const AlokasiPage = () => {
  return (
    <DefaultLayout>
      <Alokasi/>
    </DefaultLayout>
  );
};

export default AlokasiPage;

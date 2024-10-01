import PenyaluranElpiji from "@/components/PenyaluranElpiji/PenyaluranElpiji";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PenyaluranElpijiPage = () => {
  return (
    <DefaultLayout>
      <PenyaluranElpiji/>
    </DefaultLayout>
  );
};

export default PenyaluranElpijiPage;

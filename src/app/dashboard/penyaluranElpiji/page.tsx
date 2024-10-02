import { ContentLayout } from "@/components/ContentLayout";
import PenyaluranElpiji from "@/components/PenyaluranElpiji/PenyaluranElpiji";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PenyaluranElpijiPage = () => {
  return <ContentLayout title={"Dashboard"} subtitle={"Penyaluran Elpiji"} children={<PenyaluranElpiji/>}/>
};

export default PenyaluranElpijiPage;

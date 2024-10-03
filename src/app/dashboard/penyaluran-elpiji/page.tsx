import { ContentLayout } from "@/components/ContentLayout";
import PenyaluranElpiji from "@/components/PenyaluranElpiji/PenyaluranElpiji";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PenyaluranElpijiPage = () => {
  return (<ContentLayout  
    home={"dashboard"}
    mainpage={"penyaluran-elpiji"}
    children={<PenyaluranElpiji/>}
  />)
};

export default PenyaluranElpijiPage;

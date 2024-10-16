import { getAllLpg } from "@/app/actions/lpg-distribution.action";
import { ContentLayout } from "@/components/ContentLayout";
import PenyaluranElpiji from "@/components/PenyaluranElpiji/PenyaluranElpiji";
import { lpgDistributionColumns } from "@/lib/Column";

export const metadata = {
  title: "Penyaluran Elpiji PKMU",
};

const PenyaluranElpijiPage = async () => {
  const data = await getAllLpg();
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"penyaluran-elpiji"}
      children={
        <PenyaluranElpiji columns={lpgDistributionColumns} data={data} />
      }
    />
  );
};

export default PenyaluranElpijiPage;

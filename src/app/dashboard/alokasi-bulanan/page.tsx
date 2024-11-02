import { getMonthlyAllocation } from "@/app/actions/alokasi.action";
import { getCurrentSession } from "@/app/actions/auth.actions";
import AlokasiBulanan from "@/components/AlokasiBulanan/AlokasiBulanan";
import { ContentLayout } from "@/components/ContentLayout";
import { monthlyAllocationColumns } from "@/lib/Column";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Alokasi Bulanan PKMU",
};

const AlokasiBulananPage = async () => {
  const data = await getMonthlyAllocation();
  const dataUser = await getCurrentSession();
  if (!dataUser.session && !dataUser.user) {
    redirect("/auth/login");
  }
  return (
    <ContentLayout
      home={"dashboard"}
      mainpage={"alokasi-bulanan"}
      children={
        <AlokasiBulanan columns={monthlyAllocationColumns} data={data} />
      }
    />
  );
};

export default AlokasiBulananPage;

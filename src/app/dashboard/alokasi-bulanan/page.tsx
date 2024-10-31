import { getMonthlyAllocation } from "@/app/actions/alokasi.action";
import AlokasiBulanan from "@/components/AlokasiBulanan/AlokasiBulanan";
import { ContentLayout } from "@/components/ContentLayout";
import { monthlyAllocationColumns } from "@/lib/Column";

export const metadata = {
    title: "Alokasi Bulanan PKMU",
}

const AlokasiBulananPage = async () => {
    const data = await getMonthlyAllocation();
    return(
        <ContentLayout 
        home={"dashboard"} 
        mainpage={"alokasi-bulanan"} 
        children={<AlokasiBulanan columns={monthlyAllocationColumns} data={data}/>}/>
    )
}

export default  AlokasiBulananPage;  
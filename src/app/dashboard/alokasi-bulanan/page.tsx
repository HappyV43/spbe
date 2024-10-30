import AlokasiBulanan from "@/components/AlokasiBulanan/AlokasiBulanan";
import { ContentLayout } from "@/components/ContentLayout";
import { allocationColumns, monthlyAllocationColumns } from "@/lib/Column";
import { data } from "@/lib/dummyData/DataAlokasiBulanan";

export const metadata = {
    title: "Alokasi Bulanan PKMU",
}

const AlokasiBulananPage = () => {
    // const data = await getAlokasiBulananAll();
    return(
        <ContentLayout 
        home={"dashboard"} 
        mainpage={"alokasi-bulanan"} 
        children={<AlokasiBulanan columns={monthlyAllocationColumns} data={data}/>}/>
    )
}

export default  AlokasiBulananPage;  
"use client";

import { Button } from "../ui/button"
import { DataTable } from "../ui/data-table"
import Link from "next/link"
import ComboBox from "../FeatureComponents/ComboBox"
import { Label } from "../ui/label"
import { DatePickerWithRange } from "../FeatureComponents/DateRange"
import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "@/hooks/use-toast"
import { Plus, Printer, Search, SearchX } from "lucide-react"
import { getMonthlyTotalQty, getTodayTotalQty, getWeekTotalQty, normalizeDateFrom, normalizeDateTo } from "@/utils/page"
import { ChartComponent } from "../FeatureComponents/Chart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { format } from "date-fns";
import { ChartConfig } from "../ui/chart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RekapPenyaluran from "../CetakDistribusi/RekapPenyaluran";
import { getMonthlyAllocation } from "@/app/actions/alokasi.action";

interface Records {
    bpeNumber :String
    giDate :Date
    agentName: String
    licensePlate:String
    allocatedQty: number
    driverName: String
    distributionQty:number
    volume:number
    deliveryNumbr: string
    status: string;
}

interface DistributionProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  data2: TData[];
}

const PenyaluranElpiji = <TData extends {
    giDate: Date
    deliveryNumber: string;
    allocatedQty: number;
    agentName: string;
    bpeNumber: string;
    updatedAt: Date; 
}, TValue>({
    columns,
    data,
    data2,
}: DistributionProps<TData, TValue>) => {
    const [notrans, setnotrans] = useState("");
    const [agentName, setAgentName] = useState("");
    const [doNumber, setDoNumber] = useState("");
    const [dateFilter, setDateFilter] = useState<any>(null); 
    const [filteredData, setFilteredData] = useState<TData[]>(data);
    const [filtered, setFiltered] = useState<Boolean>(false);
    const [allocationMonthly, setAllocationMonthly] = useState<any[]>([]); 

    const monthlyData = getMonthlyTotalQty(data);
    const weeklyData = getWeekTotalQty(data);

    console.log(monthlyData)
    console.log(weeklyData)
    const weeklyDataMontly = getWeekTotalQty(allocationMonthly);
    const monthlyDataMonthly = getMonthlyTotalQty(allocationMonthly);

    const notransOptions = Array.from(
        new Set(data.map((item) => item.bpeNumber)) 
    ).map((bpeNumber) => ({
        label: bpeNumber,
        value: bpeNumber,
    }));

    const agentNameOptions = Array.from(
        new Set(data.map((item) => item.agentName)) 
    ).map((agentName) => ({
        label: agentName,
        value: agentName,
    }));

    // console.log(agentNameOptions)
    const doNumberOptions = Array.from(
        new Set(data.map((item) => item.deliveryNumber)) 
    ).map((deliveryNumber) => ({
        label: deliveryNumber,
        value: deliveryNumber,
    }));

    useEffect(() => {
        const filtered = data.filter((item) => {
            const matchesNoTrans = notrans ? item.bpeNumber === notrans : true;
            const matchesAgentName = agentName ? item.agentName === agentName : true;
            const matchesDoNumber = doNumber ? item.deliveryNumber === doNumber : true;
    
            const matchesDate = dateFilter?.from ? (
                dateFilter?.to ? (
                    // For Range Dates
                    item.giDate >= normalizeDateFrom(dateFilter.from) &&
                    item.giDate <= normalizeDateTo(dateFilter.to)
                ) : (
                    // For Single Dates
                    item.giDate >= normalizeDateFrom(dateFilter.from) &&
                    item.giDate <= normalizeDateTo(dateFilter.from)
                )
            ) : true; 
    
            return matchesNoTrans && matchesAgentName && matchesDate && matchesDoNumber;
        });
        
        setFilteredData(filtered);
    }, [notrans, agentName, doNumber, dateFilter, data]);

    useEffect(() => {
      getMonthly();
    }, []);
    
    const getMonthly = async () => {
        const data = await getMonthlyAllocation();
        const monthlyData = data.map(item => ({
            giDate: item.date,
            allocatedQty: item.totalElpiji,
        }));
        setAllocationMonthly(monthlyData);
    };
    
    const chartConfig  = {
        monthlyQty: {
            label: "Bulanan",
            color: "hsl(var(--chart-1))",
        },
        dailyQty: {
            label: "Harian",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    const handleClearSearch = () => {
        setAgentName("");
        setDoNumber("");
        setnotrans("");
        setDateFilter(null);
    
        setFilteredData(data);
    
        setFiltered(false);
    };
    

    return (
        <div className="w-full">
            <div className="px-4 pt-4 text-center">
                <h1 className="text-lg font-semibold">Chart Jumlah Tabung</h1>
            </div>
            <div className=" m-4">
                <Card className="flex flex-col w-full md:h-[500px] px-2 my-5">   
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Minggu ini</CardTitle>
                        <CardDescription>Mingguan ({format(new Date(), "dd MMMM yyyy")})</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0 pl-2">
                        <ChartComponent data={weeklyData} data2={weeklyDataMontly} config={chartConfig} title={"Tabung Elpiji"} timeFrame={"weekdays"}/>
                    </CardContent>
                </Card>

                <Card className="flex flex-col w-full md:h-[500px] px-2 my-5">   
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tahun ini</CardTitle>
                        <CardDescription>Tahunan ({format(new Date(), "MMMM yyyy")})</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0 pl-2">
                        <ChartComponent data={monthlyData} data2={monthlyDataMonthly} config={chartConfig} title={"Tabung Elpiji"} timeFrame={"monthly"} />
                    </CardContent>
                </Card>
            </div>
            <div className=" items-center py-4 mx-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                    <div>
                        <Label htmlFor="notrans-search" className="text-lg">Nomer Transaksi</Label>
                        <ComboBox
                            data={notransOptions} 
                            value={notrans}
                            setValue={setnotrans}
                            placeholder="Pilih nomer BPE..."
                        />
                    </div>
                    <div>
                        <Label htmlFor="agent-search" className="text-lg">Name Agen</Label>
                        <ComboBox
                            data={agentNameOptions} 
                            value={agentName}
                            setValue={setAgentName}
                            placeholder="Pilih agen..."
                        />
                    </div>
                    <div>
                        <Label htmlFor="do-search" className="text-lg">Nomer DO</Label>
                        <ComboBox
                            data={doNumberOptions} 
                            value={doNumber}
                            setValue={setDoNumber}
                            placeholder="Pilih delivery number..."
                        />
                    </div>
                    <div>
                        <Label htmlFor="date-search" className="text-lg">Tanggal</Label>
                        <DatePickerWithRange
                            value={dateFilter}
                            onDateChange={setDateFilter}
                            placeholder="Pilih tanggal..."
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mb-3 space-x-2">
                    <div className="space-x-2">
                        <Button variant="default" asChild>
                            <Link href="penyaluran-elpiji/form">
                            <Plus className="h-4 w-4 mr-2 cursor-pointer"/>New Penyaluran Elpiji</Link>
                        </Button>

                        <Button variant="default" asChild>
                            <PDFDownloadLink
                                className="text-center"
                                document={<RekapPenyaluran data={filteredData != null ? filteredData : data} data2={data2}/>}
                                fileName={`Penyaluran Elpiji.pdf`}
                            >
                                <Printer className="h-4 w-4 text-green-500 cursor-pointer mr-2" />
                                <span>Cetak Rekap</span>
                            </PDFDownloadLink> 
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        {(notrans || doNumber || agentName || dateFilter != null) &&(
                            <Button variant="default" onClick={handleClearSearch}>
                                <SearchX className="h-4 w-4 mr-2 cursor-pointer" /> Bersihkan Pencarian
                            </Button>
                        )}
                    </div>
                </div>
                <DataTable columns={columns} data={filteredData} />        
            </div>
        </div>
    )
}

export default PenyaluranElpiji;
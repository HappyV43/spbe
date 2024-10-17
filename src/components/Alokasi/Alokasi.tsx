"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { Label } from "../ui/label";
import ComboBox from "../FeatureComponents/ComboBox";
import { Search, SearchX, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../FeatureComponents/DateRange";
import { toast } from "@/hooks/use-toast";
import { ChartComponent } from "../FeatureComponents/Chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig } from "../ui/chart";
import { endOfMonth, format, getYear, startOfMonth } from "date-fns";
import { normalizeDateFrom, normalizeDateTo } from "@/utils/page";

interface AlokasiProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Alokasi = <TData extends {
    giDate: Date;
    deliveryNumber: any;
    allocatedQty: number;
    agentName: string;
    status: string;
    updatedAt: Date;
  },
  TValue
>({
  columns,
  data,
}: AlokasiProps<TData, TValue>) => {
    const [status, setStatus] = useState("Pending");
    const [agentName, setAgentName] = useState("");
    const [doNumber, setDoNumber] = useState("");
    const [qty, setQty] = useState("");
    const [dateFilter, setDateFilter] = useState<any>(""); 
    const [filteredData, setFilteredData] = useState<TData[]>(data);
    const [filtered, setFiltered] = useState<Boolean>(false);

    const statusOptions = Array.from(
        new Set(data.map((item) => item.status))
    ).map((status) => ({
        label: status,
        value: status,
    }));

    const agentNameOptions = Array.from(
        new Set(data.map((item) => item.agentName)) 
    ).map((agentName) => ({
        label: agentName,
        value: agentName,
    }));

    const doNumberOptions = Array.from(
        new Set(data.map((item) => item.deliveryNumber)) 
    ).map((deliveryNumber) => ({
        label: deliveryNumber,
        value: deliveryNumber,
    }));

    const today = new Date();
    const currentMonthStart = startOfMonth(today);
    const currentMonthEnd = endOfMonth(today);
    const currentYear = getYear(today);

    const chartAllocatedMonth = data
        .filter((item) => item.updatedAt >= currentMonthStart && item.updatedAt <= currentMonthEnd)
        .map((item) => ({
            agentName: item.agentName, 
            qty: item.allocatedQty, 
        }));

    const chartAllocatedToday = data
        .filter((item) => item.updatedAt >= normalizeDateFrom(today) && item.updatedAt <= normalizeDateTo(today))
        .map((item) => ({
            agentName: item.agentName, 
            qty: item.allocatedQty, 
        }));

    const chartAllocatedYear = data
        .filter((item) => getYear(new Date(item.updatedAt)) === currentYear)
        .map((item) => ({
            agentName: item.agentName,
            qty: item.allocatedQty,
        }));

    const chartConfig = data.reduce((config, item) => {
        config[item.agentName] = {
            label: item.agentName,
            color: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`, 
        };
        return config;
    }, {} as ChartConfig);

    const handleSearch = () => {
        if (!status && !agentName && !dateFilter && !doNumber) {
            toast({
                duration: 1500,
                variant:"destructive",
                title:"Silakan isi minimal satu filter pencarian!"
            });
            return;
        }
        
        const filtered = data.filter((item) => {
            const matchesStatus = status ? item.status === status : true;
            const matchesAgentName = agentName ? item.agentName === agentName : true;
            const matchesDoNumber = doNumber ? item.deliveryNumber === doNumber : true;

            const matchesDate = dateFilter?.from ? (
                dateFilter?.to ? (
                    item.giDate >= normalizeDateFrom(dateFilter.from) &&
                    item.giDate <= normalizeDateTo(dateFilter.to)
                ) : (
                    item.giDate >= normalizeDateFrom(dateFilter.from) &&
                    item.giDate <= normalizeDateTo(dateFilter.from)
                )
            ) : true; 
    
            setFiltered(true);
            return matchesStatus && matchesAgentName && matchesDate && matchesDoNumber;
        });
    
        setFilteredData(filtered);
    };

    // Filtering logic inside useEffect
    useEffect(() => {
        const filtered = data.filter((item) => {
        const matchesStatus = status ? item.status === status : true;
        const matchesAgentName = agentName ? item.agentName === agentName : true;
        const matchesDoNumber = doNumber ? item.deliveryNumber === doNumber : true;

        const matchesDate = dateFilter?.from ? (
            dateFilter?.to ? (
            item.giDate >= normalizeDateFrom(dateFilter.from) &&
            item.giDate <= normalizeDateTo(dateFilter.to)
            ) : (
            item.giDate >= normalizeDateFrom(dateFilter.from) &&
            item.giDate <= normalizeDateTo(dateFilter.from)
            )
        ) : true;

        return matchesStatus && matchesAgentName && matchesDoNumber && matchesDate;
        });
        setFilteredData(filtered);
    }, [status, agentName, doNumber, dateFilter, data]);

    const handleClearSearch = () => {
        setStatus("");
        setAgentName("");
        setDoNumber("");
        setDateFilter(null);
    
        setFilteredData(data);
    
        setFiltered(false);
    };

    return (
        <div className="w-full">
            <div className="px-4 pt-4 text-center">
                <h1 className="text-lg font-semibold">Chart Jumlah Tabung</h1>
            </div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 m-4"> */}
            <div className=" m-4">

                {/* MANY CHARTS DISPLAYED */}
                {/* <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Hari ini</CardTitle>
                        <CardDescription>{format(new Date(), "dd MMMM yyyy")}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartComponent data={chartAllocatedToday} config={chartConfig} title={"Tabung Elpiji"} />
                    </CardContent>
                </Card> */}

                {/* ONLY 1 CHART DISPLAYED */}
                <Card className="flex flex-col w-full md:h-[500px] px-2">   
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Hari ini</CardTitle>
                        <CardDescription>{format(new Date(), "dd MMMM yyyy")}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0 pl-2">
                        <ChartComponent data={chartAllocatedToday} config={chartConfig} title={"Tabung Elpiji"} />
                    </CardContent>
                </Card>

                {/* NOTE:REQ */}
                {/* <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Bulan ini</CardTitle>
                        <CardDescription>{format(new Date(), "MMMM yyyy")}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartComponent data={chartAllocatedMonth} config={chartConfig} title={"Tabung Elpiji"} />
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Tahun ini</CardTitle>
                        <CardDescription>{format(new Date(), "yyyy")}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartComponent data={chartAllocatedMonth} config={chartConfig} title={"Tabung Elpiji"} />
                    </CardContent>
                </Card> */}
            </div>
            <div className="items-center py-4 mx-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                    <div>
                        <Label htmlFor="status-search" className="text-lg">Status</Label>
                        <ComboBox
                            data={statusOptions} 
                            value={status}
                            setValue={setStatus}
                            placeholder="Pilih status..."
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
                    <Button variant="outline" asChild>
                        <Link href="alokasi/upload"> 
                            <Upload className="h-4 w-4 mr-2 cursor-pointer"/>
                            Upload Alokasi
                        </Link>
                    </Button>
                    
                    <div className="flex space-x-2">
                        {/* <Button variant="default" onClick={handleSearch}>
                            <Search className="h-4 w-4 mr-2 cursor-pointer" /> Cari Alokasi
                        </Button> */}
                        {(status || doNumber || agentName || dateFilter != null) &&(
                            <Button variant="default" onClick={handleClearSearch}>
                                <SearchX className="h-4 w-4 mr-2 cursor-pointer" /> Bersihkan Pencarian
                            </Button>
                        )}
                    </div>
                </div>
                <DataTable columns={columns} data={filteredData} />
            </div>
        </div>
    );
};

export default Alokasi;
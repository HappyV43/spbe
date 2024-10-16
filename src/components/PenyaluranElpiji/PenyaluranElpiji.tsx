"use client";

import { Button } from "../ui/button"
import { DataTable } from "../ui/data-table"
import Link from "next/link"
import ComboBox from "../FeatureComponents/ComboBox"
import { Label } from "../ui/label"
import { DatePickerWithRange } from "../FeatureComponents/DateRange"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "@/hooks/use-toast"
import { Plus, Search, SearchX } from "lucide-react"

interface DistributionProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
}: DistributionProps<TData, TValue>) => {
    const [notrans, setnotrans] = useState("");
    const [agentName, setAgentName] = useState("");
    const [qty, setQty] = useState("");
    const [doNumber, setDoNumber] = useState("");
    const [dateRange, setDateRange] = useState<any>(""); 
    const [filteredData, setFilteredData] = useState<TData[]>(data);
    const [filtered, setFiltered] = useState<Boolean>(false);

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

    const doNumberOptions = Array.from(
        new Set(data.map((item) => item.deliveryNumber)) 
    ).map((deliveryNumber) => ({
        label: deliveryNumber,
        value: deliveryNumber,
    }));

    const handleSearch = () => {
        if (!notrans && !agentName && !dateRange && !doNumber) {
            toast({
                duration: 1500,
                variant:"destructive",
                title:"Silakan isi minimal satu filter pencarian!"
            });
            return;
        }
        
        const filtered = data.filter((item) => {
            const matchesNoTrans = notrans ? item.bpeNumber === notrans : true;
            const matchesAgentName = agentName ? item.agentName === agentName : true;
            const matchesDoNumber = doNumber ? item.deliveryNumber === doNumber : true;
    
            const normalizeDateFrom = (date: Date) => {
                const normalized = new Date(date);
                normalized.setHours(0, 0, 0, 0);
                return normalized;
            };
    
            const normalizeDateTo = (date: Date) => {
                const normalized = new Date(date);
                normalized.setHours(23, 59, 59, 999);
                return normalized;
            };
    
            const matchesDate = dateRange?.from ? (
                dateRange?.to ? (
                    // For Range Dates
                    item.giDate >= normalizeDateFrom(dateRange.from) &&
                    item.giDate <= normalizeDateTo(dateRange.to)
                ) : (
                    // For Single Dates
                    item.giDate >= normalizeDateFrom(dateRange.from) &&
                    item.giDate <= normalizeDateTo(dateRange.from)
                )
            ) : true; 
    
            setFiltered(true);
            return matchesNoTrans && matchesAgentName && matchesDate && matchesDoNumber;
        });
    
        setFilteredData(filtered);
    };

    const handleClearSearch = () => {
        setAgentName("");
        setDoNumber("");
        setnotrans("");
        setDateRange(null);
    
        setFilteredData(data);
    
        setFiltered(false);
    };

    return (
        <div className="w-full">
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
                            value={dateRange}
                            onDateChange={setDateRange}
                            placeholder="Pilih tanggal..."
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <Button variant="outline" asChild>
                        <Link href="penyaluran-elpiji/form">
                        <Plus className="h-4 w-4 mr-2 cursor-pointer"/>New Penyaluran Elpiji</Link>
                    </Button>
                    
                    <div className="flex space-x-2">
                        <Button variant="default" onClick={handleSearch}>
                            <Search className="h-4 w-4 mr-2 cursor-pointer" /> Cari Penyaluran Elpiji
                        </Button>
                        
                        {filtered && (
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

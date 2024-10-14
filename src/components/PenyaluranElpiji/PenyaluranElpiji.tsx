"use client"

import { data } from "@/lib/dummyData/DataAlokasi"
import { Button } from "../ui/button"
import { DataTable } from "../ui/data-table"
import Link from "next/link"
import ComboBox from "../ComboBoxComponent/ComboBox"
import { Label } from "../ui/label"
import { DatePickerWithRange } from "../ComboBoxComponent/DateRange"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "@/hooks/use-toast"
import { Plus, Search, SearchX } from "lucide-react"

interface DistributionProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const PenyaluranElpiji = <TData extends {
    allocatedQty: number;
    agentName: string;
    notrans: string;
    updatedAt: Date; 
}, TValue>({
    columns,
    data,
}: DistributionProps<TData, TValue>) => {
    const [notrans, setnotrans] = useState("");
    const [agentName, setAgentName] = useState("");
    const [qty, setQty] = useState("");
    const [dateRange, setDateRange] = useState<any>(""); 
    const [filteredData, setFilteredData] = useState<TData[]>(data);
    const [filtered, setFiltered] = useState<Boolean>(false);

    const notransOptions = Array.from(
        new Set(data.map((item) => item.notrans)) 
    ).map((notrans) => ({
        label: notrans,
        value: notrans,
    }));

    const agentNameOptions = Array.from(
        new Set(data.map((item) => item.agentName)) 
    ).map((agentName) => ({
        label: agentName,
        value: agentName,
    }));

    const handleSearch = () => {
        if (!status && !agentName && !dateRange) {
            toast({
                duration: 1500,
                variant:"destructive",
                title:"Silakan isi minimal satu filter pencarian!"
            });
            return;
        }
        
        const filtered = data.filter((item) => {
            // const matchesStatus = status ? item.status === status : true;
            const matchesAgentName = agentName ? item.agentName === agentName : true;
    
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
                    item.updatedAt >= normalizeDateFrom(dateRange.from) &&
                    item.updatedAt <= normalizeDateTo(dateRange.to)
                ) : (
                    // For Single Dates
                    item.updatedAt >= normalizeDateFrom(dateRange.from) &&
                    item.updatedAt <= normalizeDateTo(dateRange.from)
                )
            ) : true; 
    
            setFiltered(true);
            return matchesAgentName && matchesDate;
        });
    
        setFilteredData(filtered);
    };

    const handleClearSearch = () => {
        setAgentName("");
        setQty("");
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
                            placeholder="Pilih nomer transaksi..."
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
                        <Label htmlFor="notrans-search" className="text-lg">Nomer Transaksi</Label>
                        <ComboBox
                            data={notransOptions} 
                            value={notrans}
                            setValue={setnotrans}
                            placeholder="Pilih nomer transaksi..."
                        />
                    </div>
                    <div>
                        <Label htmlFor="date-search" className="text-lg">Tanggal</Label>
                        <DatePickerWithRange
                            onDateChange={setDateRange} 
                            // Pass date range to DatePicker component
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
                {/* <DataTable columns={columns} data={data} />         */}
            </div>
        </div>
    )
}

export default PenyaluranElpiji;
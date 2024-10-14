"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { Label } from "../ui/label";
import ComboBox from "../ComboBoxComponent/ComboBox";
import { BoxIcon, Printer as PrinterIcon, Search, SearchX, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../ComboBoxComponent/DateRange";
import { DateRange } from "react-day-picker"; // Import DateRange type for date filtering
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CetakPenyaluran from "../CetakPenyaluran/CetakPenyaluran";
import { toast } from "@/hooks/use-toast";

interface AlokasiProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
const dummyData = {
    nomor: 'SPB-001234',
    tanggal: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }),
    jenisBarang: 'Elpiji 3 Kg',
    diserahkanKe: 'PT. Agen Gas Jaya',
    noPol: 'H 1234 AB',
    jam: '08:30',
    noDO: '219456789',
    refill: 10,
    jumlahIsi: 30,
};

const Alokasi = <TData extends {
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
    const [status, setStatus] = useState("");
    const [agentName, setAgentName] = useState("");
    const [doNumber, setDoNumber] = useState("");
    const [qty, setQty] = useState("");
    const [dateRange, setDateRange] = useState<any>(""); 
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


    const handleSearch = () => {
        if (!status && !agentName && !dateRange && !doNumber) {
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
            return matchesStatus && matchesAgentName && matchesDate && matchesDoNumber;
        });
    
        setFilteredData(filtered);
    };

    const handleClearSearch = () => {
        setStatus("");
        setAgentName("");
        setDoNumber("");
        setDateRange(null);
    
        setFilteredData(data);
    
        setFiltered(false);
    };
    return (
        <div className="w-full">
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
                            value={dateRange}
                            onDateChange={setDateRange}
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
                        <Button variant="default" onClick={handleSearch}>
                            <Search className="h-4 w-4 mr-2 cursor-pointer" /> Cari Alokasi
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
    );
};

export default Alokasi;

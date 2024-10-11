"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { Label } from "../ui/label";
import ComboBox from "../ComboBoxComponent/ComboBox";
import { useState } from "react";
import { DatePickerWithRange } from "../ComboBoxComponent/DateRange";
import { DateRange } from "react-day-picker"; // Import DateRange type for date filtering

interface AlokasiProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const Alokasi = <TData extends {
    allocatedQty: string;
    agentName: string;
    status: string;
    updatedAt: Date; 
}, TValue>({
    columns,
    data,
}: AlokasiProps<TData, TValue>) => {
    const [status, setStatus] = useState("");
    const [agentName, setAgentName] = useState("");
    const [qty, setQty] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(); 
    const [filteredData, setFilteredData] = useState<TData[]>(data); // filtered data state

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

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const matchesStatus = status ? item.status === status : true;
            const matchesAgentName = agentName ? item.agentName === agentName : true;
            const matchesDate =
                dateRange?.from?.toLocaleDateString() && dateRange?.to
                    ? item.updatedAt >= dateRange.from && item.updatedAt <= dateRange.to
                    : true;
            return matchesStatus && matchesAgentName && matchesDate;
        });

        setFilteredData(filtered);
        console.log(dateRange?.from)
        console.log(dateRange?.to)
    };

    return (
        <div className="w-full">
            <div className="items-center py-4 mx-4">
                {/* Responsive filters layout */}
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
                        <Label htmlFor="date-search" className="text-lg">Tanggal</Label>
                        <DatePickerWithRange
                            onDateChange={setDateRange} 
                            // Pass date range to DatePicker component
                        />
                    </div>
                </div>

                <div className="flex justify-end px-6 space-x-2 my-4">
                    <Button variant="default" onClick={handleSearch}>
                        Cari Alokasi
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="alokasi/upload">Upload Alokasi</Link>
                    </Button>
                </div>

                {/* DataTable Component */}
                <DataTable columns={columns} data={filteredData} />
            </div>
        </div>
    );
};

export default Alokasi;
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DataTable } from "../../ui/data-table";
import Link from "next/link";
import { Label } from "../../ui/label";
import ComboBox from "../../FeatureComponents/ComboBox";
import { SearchX, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../../FeatureComponents/DateRange";
import { calculateTotalAgen, calculateTotalQty, formatNumberQty, normalizeDateFrom, normalizeDateTo } from "@/utils/page";
import { Card } from "../../ui/card";
import type { User } from "@prisma/client";
import { format } from "date-fns";

interface AlokasiProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: User;
}

const today = {
  from: new Date(),
  to: new Date(),
};

const AlokasiHarian = <
  TData extends {
    plannedGiDate: Date;
    giDate: Date;
    deliveryNumber: string;
    allocatedQty: number;
    agentName: string;
    status: string;
    updatedAt: Date;
  },
  TValue
>({
  columns,
  data,
  user,
}: AlokasiProps<TData, TValue>) => {
  const [status, setStatus] = useState("");
  const [agentName, setAgentName] = useState("");
  const [doNumber, setDoNumber] = useState("");
  const [dateFilter, setDateFilter] = useState<any>("today"); 
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

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesStatus = status ? item.status === status : true;
      const matchesAgentName = agentName ? item.agentName === agentName : true;
      const matchesDoNumber = doNumber
        ? item.deliveryNumber === doNumber
        : true;

      const matchesDate = dateFilter?.from
        ? (
            dateFilter?.to 
              ? normalizeDateFrom(item.plannedGiDate) >= normalizeDateFrom(dateFilter.from) &&
                normalizeDateTo(item.plannedGiDate) <= normalizeDateTo(dateFilter.to)
              : normalizeDateFrom(item.plannedGiDate) >= normalizeDateFrom(dateFilter.from) &&
                normalizeDateTo(item.plannedGiDate) <= normalizeDateTo(dateFilter.from)
        )
          : dateFilter === 'today'
            ? normalizeDateFrom(item.plannedGiDate) === normalizeDateTo(new Date())
            : true;
      return (
        matchesStatus && matchesAgentName && matchesDoNumber && matchesDate
      );
    });

    setFilteredData(filtered);
  }, [status, agentName, doNumber, dateFilter, data]);

  useEffect(() => {
    if(data.length > 0 ){
      setStatus("Pending");
    }
    setFiltered(true);
    setDateFilter(today)
  }, []);

  const handleClearSearch = () => {
    setStatus("");
    setAgentName("");
    setDoNumber("");
    setDateFilter(null)
    setFilteredData(data);
    setFiltered(false);
  };

  return (
    <div className="w-full">
      <div className="items-center py-4 mx-4">
        <div className="flex gap-4 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Jumlah Tabung:</h1>
            <p className="text-3xl font-bold">{formatNumberQty(calculateTotalQty(filteredData))}</p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Jumlah Kg:</h1>
            <p className="text-3xl font-bold">{formatNumberQty(calculateTotalQty(filteredData)*3)}</p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Agen:</h1>
            <p className="text-3xl font-bold">{calculateTotalAgen(filteredData)}</p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Nomor DO:</h1>
            <p className="text-3xl font-bold">{filteredData.length}</p>
          </Card>
        </div>
        <Card className="px-4 py-5 mb-4">
          <div className="px-4 text-center">
              <h1 className="text-lg font-semibold py-2 pb-4">Filter Alokasi</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            <div>
              <Label htmlFor="status-search" className="text-lg">Status</Label>
              <ComboBox
                data={statusOptions} 
                value={status}
                setValue={setStatus}
                placeholder="Semua status"
              />
            </div>
            <div>
              <Label htmlFor="agent-search" className="text-lg">
                Name Agen
              </Label>
              <ComboBox
                data={agentNameOptions}
                value={agentName}
                setValue={setAgentName}
                placeholder="Semua agen"
              />
            </div>

            <div>
              <Label htmlFor="do-search" className="text-lg">
                Nomer DO
              </Label>
              <ComboBox
                data={doNumberOptions}
                value={doNumber}
                setValue={setDoNumber}
                placeholder="Semua nomor DO"
              />
            </div>

              <div>
                <Label htmlFor="date-search" className="text-lg">Tanggal</Label>
                <DatePickerWithRange
                    value={dateFilter}
                    onDateChange={setDateFilter}
                    placeholder={filtered ? `${format(new Date(), "dd MMM yyyy")}` : "Semua Tanggal"}
                />
              </div>
          </div>

          <div className="flex justify-between items-center mb-3 space-x-2">
            {user.role === "ADMIN" && (
              <Button variant="default" asChild>
                <Link href="alokasi/upload">
                  <Upload className="h-4 w-4 mr-2 cursor-pointer" />
                  Upload Alokasi
                </Link>
              </Button>
            )}
            <div className="flex space-x-2">
              {(status || doNumber || agentName || dateFilter != null) &&(
                  <Button variant="default" onClick={handleClearSearch}>
                      <SearchX className="h-4 w-4 mr-2 cursor-pointer" /> Bersihkan Pencarian
                  </Button>
              )}
            </div>
          </div>
        </Card>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default AlokasiHarian;

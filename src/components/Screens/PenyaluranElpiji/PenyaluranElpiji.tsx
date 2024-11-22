"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Printer, Search, SearchX } from "lucide-react";
import {
  calculateTotalAgen,
  calculateTotalQty,
  formatNumberQty,
  getMonthlyTotalQty,
  getTodayTotalQty,
  getWeekTotalQty,
  normalizeDateFrom,
  normalizeDateTo,
} from "@/utils/page";
import { format } from "date-fns";
import { getMonthlyAllocation } from "@/app/actions/alokasi.action";
import { ChartConfig } from "@/components/ui/chart";
import { ChartComponent } from "@/components/FeatureComponents/Chart";
import RekapPenyaluran from "@/components/FeatureComponents/CetakDistribusi/RekapPenyaluran";
import ComboBox from "@/components/FeatureComponents/ComboBox";
import { DatePickerWithRange } from "@/components/FeatureComponents/DateRange";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import { id } from "date-fns/locale";

interface Records {
  bpeNumber: String;
  giDate: Date;
  agentName: String;
  licensePlate: String;
  allocatedQty: number;
  driverName: String;
  distributionQty: number;
  volume: number;
  deliveryNumbr: string;
  status: string;
}

interface DistributionProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  data2?: TData[];
  user: User;
}

const today = {
  from: new Date(),
  to: new Date(),
};

const PenyaluranElpiji = <
  TData extends {
    giDate: Date;
    deliveryNumber: string;
    allocatedQty: number;
    agentName: string;
    bpeNumber: string;
    updatedAt: Date;
  },
  TValue
>({
  columns,
  data,
  user,
}: DistributionProps<TData, TValue>) => {
  const [notrans, setnotrans] = useState("");
  const [agentName, setAgentName] = useState("");
  const [doNumber, setDoNumber] = useState("");
  const [dateFilter, setDateFilter] = useState<any>("today");
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const [filtered, setFiltered] = useState<Boolean>(false);
  const [allocationMonthly, setAllocationMonthly] = useState<any[]>([]);

  const monthlyData = getMonthlyTotalQty(data);
  const weeklyData = getWeekTotalQty(data);

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
      const matchesDoNumber = doNumber
        ? item.deliveryNumber === doNumber
        : true;

      const matchesDate = dateFilter?.from
        ? dateFilter?.to
          ? // For Range Dates
            item.giDate >= normalizeDateFrom(dateFilter.from) &&
            item.giDate <= normalizeDateTo(dateFilter.to)
          : // For Single Dates
            item.giDate >= normalizeDateFrom(dateFilter.from) &&
            item.giDate <= normalizeDateTo(dateFilter.from)
        : dateFilter === "today"
        ? normalizeDateFrom(item.giDate) === normalizeDateTo(new Date())
        : true;

      return (
        matchesNoTrans && matchesAgentName && matchesDate && matchesDoNumber
      );
    });

    setFilteredData(filtered);
  }, [notrans, agentName, doNumber, dateFilter, data]);

  useEffect(() => {
    getMonthly();
  }, []);

  const getMonthly = async () => {
    const data = await getMonthlyAllocation();
    const monthlyData = data.map((item) => ({
      giDate: item.date,
      allocatedQty: item.totalElpiji,
    }));
    setAllocationMonthly(monthlyData);
  };

  const chartConfig = {
    monthlyQty: {
      label: "Bulanan",
      color: "hsl(var(--chart-1))",
    },
    dailyQty: {
      label: "Harian",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    setFiltered(true);
    setDateFilter(today);
  }, []);

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
      <div className=" items-center py-4 mx-4">
        <div className="py-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Jumlah Tabung:</h1>
            <p className="text-3xl font-bold">
              {formatNumberQty(calculateTotalQty(filteredData))}
            </p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Jumlah Kg:</h1>
            <p className="text-3xl font-bold">
              {formatNumberQty(calculateTotalQty(filteredData) * 3)}{" "}
              <span className="text-lg">Kg</span>
            </p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Agen:</h1>
            <p className="text-3xl font-bold">
              {calculateTotalAgen(filteredData)}
            </p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Nomor DO:</h1>
            <p className="text-3xl font-bold">{filteredData.length}</p>
          </Card>
        </div>
        <Card className="px-4 py-5 mb-4">
          <div className="px-4 text-center">
            <h1 className="text-lg font-semibold py-2 pb-4">
              Filter Penyaluran Elpiji
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            <div>
              <Label htmlFor="notrans-search" className="text-lg">
                Nomer Transaksi
              </Label>
              <ComboBox
                data={notransOptions}
                value={notrans}
                setValue={setnotrans}
                placeholder="Semua nomor BPE"
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
                placeholder="Semua number DO"
              />
            </div>
            <div>
              <Label htmlFor="date-search" className="text-lg">
                Tanggal
              </Label>
              <DatePickerWithRange
                value={dateFilter}
                onDateChange={setDateFilter}
                placeholder={
                  filtered
                    ? `${format(new Date(), "dd MMMM yyyy", { locale: id })}`
                    : "Semua Tanggal"
                }
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-3 space-x-2">
            {user.role === "ADMIN" && (
              <div className="space-x-2">
                <Button variant="default" asChild>
                  <Link href="penyaluran-elpiji/form">
                    <Plus className="h-4 w-4 mr-2 cursor-pointer" />
                    New Penyaluran Elpiji
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <PDFDownloadLink
                    className="text-center"
                    document={
                      <RekapPenyaluran
                        data={filteredData != null ? filteredData : data}
                        data2={allocationMonthly}
                      />
                    }
                    fileName={`Penyaluran Elpiji.pdf`}
                  >
                    <Printer className="h-4 w-4 text-green-500 cursor-pointer mr-2" />
                    <span>Cetak Rekap</span>
                  </PDFDownloadLink>
                </Button>
              </div>
            )}

            <div className="flex space-x-2">
              {(notrans || doNumber || agentName || dateFilter != null) && (
                <Button variant="default" onClick={handleClearSearch}>
                  <SearchX className="h-4 w-4 mr-2 cursor-pointer" /> Bersihkan
                  Pencarian
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

export default PenyaluranElpiji;

"use client";

import { getMonthlyAllocation } from "@/app/actions/alokasi.action";
import { ChartComponent } from "@/components/FeatureComponents/Chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { format, isSameMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  calculateTotalAgen,
  calculateTotalQty,
  formatNumberQty,
  getMonthlyTotalQty,
  getTodayTotalQty,
  getWeekTotalQty,
} from "@/utils/page";
import MonthPicker from "@/components/FeatureComponents/MonthPicker";
import { id } from "date-fns/locale";

interface AllocationData {
  date?: string | Date | null;
  allocatedQty?: number;
}

interface SummaryProps {
  data: AllocationData[];
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const [allocationMonthly, setAllocationMonthly] = useState<AllocationData[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState<AllocationData[]>([]);

  const totalDailyQty = calculateTotalQty(data);
  const totalMonthlyQty = calculateTotalQty(allocationMonthly);

  useEffect(() => {
    const fetchMonthlyAllocation = async () => {
      const result = await getMonthlyAllocation();
      const monthlyData = result.map((item: any) => ({
        date: item.date,
        allocatedQty: item.totalElpiji,
      }));
      setAllocationMonthly(monthlyData);
    };
    fetchMonthlyAllocation();
  }, []);

  useEffect(() => {
    const filtered = currentMonth
      ? data.filter(
          (item) => item.date && isSameMonth(new Date(item.date), currentMonth)
        )
      : data;
    setFilteredData(filtered);
  }, [currentMonth, data]);

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

  // Placeholder logic for Pending and Fakultatif calculations
  const totalPending = totalDailyQty - totalMonthlyQty; 
  // Replace with actual logic
  const totalFakultatif = Math.max(0, totalMonthlyQty - totalDailyQty); 

  return (
    <div className="py-4 mx-4">
      <div className="px-4 pt-4 text-center">
        <h1 className="text-lg font-semibold">Chart Jumlah Tabung</h1>
      </div>
      <div className="flex items-center gap-4 my-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
          <div className="gap-4">
            <label htmlFor="month-picker" className="text-lg">
              Bulan
            </label>
            <MonthPicker
              currentMonth={currentMonth!}
              onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
              placeholder={
                currentMonth
                  ? format(currentMonth, "MMMM yyyy", { locale: id })
                  : "Semua Bulan"
              }
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-2">
        <Card className="px-4 py-5">
          <h1 className="text-lg font-semibold">Total Alokasi Harian:</h1>
          <p className="text-3xl font-bold">{formatNumberQty(totalDailyQty)}</p>
          <p className="text-3xl font-bold">
            {formatNumberQty(totalDailyQty * 3)} <span className="text-lg">Kg</span>
          </p>
        </Card>
        <Card className="px-4 py-5">
          <h1 className="text-lg font-semibold">Total Alokasi Bulanan</h1>
          <p className="text-3xl font-bold">{formatNumberQty(totalMonthlyQty)}</p>
          <p className="text-3xl font-bold">
            {formatNumberQty(totalMonthlyQty * 3)} <span className="text-lg">Kg</span>
          </p>
        </Card>
        <Card className="px-4 py-5">
          <h1 className="text-lg font-semibold">Total Penyaluran Elpiji</h1>
          <p className="text-3xl font-bold">{formatNumberQty(totalMonthlyQty)}</p>
          <p className="text-3xl font-bold">
            {formatNumberQty(totalMonthlyQty * 3)} <span className="text-lg">Kg</span>
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 mb-2">
        <Card className="px-4 py-5">
          <h1 className="text-lg font-semibold">Total Pending:</h1>
          <p className="text-3xl font-bold">{formatNumberQty(totalPending)}</p>
        </Card>
        <Card className="px-4 py-5">
          <h1 className="text-lg font-semibold">Total Fakultatif:</h1>
          <p className="text-3xl font-bold">{formatNumberQty(totalFakultatif)}</p>
        </Card>
      </div>

      <div>
        <Card className="flex flex-col w-full md:h-[520px] px-2 my-5">
          <CardHeader className="items-center pb-0">
            <CardTitle>Minggu ini</CardTitle>
            <CardDescription>
              Mingguan ({format(new Date(), "dd MMMM yyyy")})
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0 pl-2">
            <ChartComponent
              data={getWeekTotalQty(data)}
              data2={getWeekTotalQty(allocationMonthly)}
              config={chartConfig}
              title={"Tabung Elpiji"}
              timeFrame={"weekdays"}
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col w-full md:h-[520px] px-2 my-5">
          <CardHeader className="items-center pb-0">
            <CardTitle>Tahun ini</CardTitle>
            <CardDescription>
              Tahunan ({format(new Date(), "MMMM yyyy")})
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0 pl-2">
            <ChartComponent
              data={getMonthlyTotalQty(data)}
              data2={getMonthlyTotalQty(allocationMonthly)}
              config={chartConfig}
              title={"Tabung Elpiji"}
              timeFrame={"monthly"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;
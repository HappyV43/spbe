"use client";

import { getMonthlyAllocation } from "@/app/actions/alokasi.action";
import { ChartComponent } from "@/components/FeatureComponents/Chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
    getMonthlyTotalQty,
    getTodayTotalQty,
    getWeekTotalQty,
    normalizeDateFrom,
    normalizeDateTo,
  } from "@/utils/page";

  interface SummaryProps{
    data: any;
  }

const Summary = ({data}: SummaryProps) => {
  const [allocationMonthly, setAllocationMonthly] = useState<any[]>([]);
  
  const monthlyData = getMonthlyTotalQty(data);
  const weeklyData = getWeekTotalQty(data);

  const weeklyDataMontly = getWeekTotalQty(allocationMonthly);
  const monthlyDataMonthly = getMonthlyTotalQty(allocationMonthly);
  
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
  
    return (
        <div className="">
                    <div className="px-4 pt-4 text-center">
            <h1 className="text-lg font-semibold">Chart Jumlah Tabung</h1>
        </div>
        <div className=" m-4">
            <Card className="flex flex-col w-full md:h-[520px] px-2 my-5">
            <CardHeader className="items-center pb-0">
                <CardTitle>Minggu ini</CardTitle>
                <CardDescription>
                Mingguan ({format(new Date(), "dd MMMM yyyy")})
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pl-2">
                <ChartComponent
                data={weeklyData}
                data2={weeklyDataMontly}
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
                data={monthlyData}
                data2={monthlyDataMonthly}
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


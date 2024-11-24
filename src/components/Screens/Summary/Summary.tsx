"use client";

import { ChartComponent } from "@/components/FeatureComponents/Chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  calculateSummaryQty,
  formatNumberQty,
  getAnnualTotalQty,
  getWeeklyTotalQty,
  normalizeDateFrom,
  normalizeDateTo,
} from "@/utils/page";
import { id } from "date-fns/locale";
import { CalendarCheck, CalendarDays, Clock4, PackagePlus, ScrollText, SearchX } from "lucide-react";
import { DatePickerWithRange } from "@/components/FeatureComponents/DateRange";
import { Button } from "@/components/ui/button";

interface AllocationData {
  plannedGiDate?: Date;
  allocatedQty?: number;
  lpgDistribution: {
    giDate: Date;
    distributionQty: number;
  } | null;
}

interface SummaryProps {
  monthly: DataConfig[];
  data: any;
}

interface DataConfig {
  date: Date;
  qty: number;
}

// const today = {
//   from: new Date(),
//   to: new Date(),
// };

const Summary: React.FC<SummaryProps> = ({ data, monthly }) => {
  // Summary Chart
  const [monthlyAllocation, setMonthlyAllocation] = useState<DataConfig[]>([]);
  const [dailyAllocation, setDailyAllocation] = useState<DataConfig[]>([]);
  const [dailyDistribution, setDailyDistribution] = useState<DataConfig[]>([]);
  
  // Filtering Data
  const [filtered, setFiltered] = useState<Boolean>(false);
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [filteredDaily, setFilteredDaily] = useState<AllocationData[]>([]);
  const [filteredMonthly, setFilteredMonthly] = useState<DataConfig[]>([]);
  const [filteredDistribution, setFilteredDistribution] = useState<AllocationData[]>([]);

  // Summary Card
  const totalDailyQty = calculateSummaryQty(filteredDaily, "allocatedQty");
  const totalMonthlyQty = calculateSummaryQty(filteredMonthly, "totalElpiji");
  // console.log(totalMonthlyQty)
  const totalDistributionlyQty = calculateSummaryQty(filteredDistribution, "lpgDistribution.distributionQty");

  // const calcTotal = (data:any, key: string) => {
  //   return calculateSummaryQty(data, key);
  // }

  const calculateDiff = (a: number, b: number) =>{
    return (Math.abs(a-b))
  }
  const totalPending = Math.abs(totalDailyQty - totalDistributionlyQty);
  const totalFakultatif = Math.abs( totalMonthlyQty - totalDailyQty);

  // Config all data to date and qty only
  useEffect(() => {
    const monthlyData = monthly.map((item: any) => ({
      date: item.date,
      qty: item.totalElpiji,
    }));
    setMonthlyAllocation(monthlyData);

    const dailyData = data.map((item: any) => ({
      date: item.plannedGiDate,
      qty: item.allocatedQty,
    }));
    setDailyAllocation(dailyData);
    
    const distributionData = data
      .filter((item: any) => item.lpgDistribution !== null) 
      .map((item: any) => ({
        date: item.lpgDistribution.giDate,
        qty: item.lpgDistribution.distributionQty ?? 0, 
      }));
    setDailyDistribution(distributionData);
  }, [data, monthly]);


  useEffect(() => {
    // if (!data || !monthly || !dateFilter) return;
  
    const fromDate = dateFilter?.from ? normalizeDateFrom(dateFilter.from) : null;
    const toDate = dateFilter?.to ? normalizeDateTo(dateFilter.to) : null;



        
    const filterByDate = (itemDate: Date) => {
      const matchesDate = dateFilter?.from
        ? dateFilter?.to
          ? normalizeDateFrom(itemDate) >= normalizeDateFrom(dateFilter.from) &&
            normalizeDateTo(itemDate) <= normalizeDateTo(dateFilter.to)
          : normalizeDateFrom(itemDate) >= normalizeDateFrom(dateFilter.from) &&
            normalizeDateTo(itemDate) <= normalizeDateTo(dateFilter.from)
        : dateFilter === null
      ? normalizeDateFrom(new Date()) === normalizeDateTo(new Date())
      : true;

      // const normalizedDate = normalizeDateFrom(itemDate);
  
      // if (dateFilter === "today") {
      //   return normalizedDate === normalizeDateTo(new Date());
      // }
  
      // if (dateFilter?.from) {
      //   const fromDate = normalizeDateFrom(dateFilter.from);
      //   const toDate = dateFilter.to
      //     ? normalizeDateTo(dateFilter.to)
      //     : fromDate; // If no `to`, assume `to` is the same as `from`.
  
      //   return normalizedDate >= fromDate && normalizedDate <= toDate;
      // }
  
      return matchesDate; // No date filter applied
    };

    // Apply filters
    const filteredDailyData = data.filter((item: { plannedGiDate: any; }) => filterByDate(item.plannedGiDate));
    const filteredMonthlyData = monthly.filter((item) => filterByDate(item.date));
    const filteredDistributionData = data
      .filter((item: { lpgDistribution: null; }) => item.lpgDistribution !== null)
      .filter((item: { lpgDistribution: { giDate: any; }; }) => filterByDate(item.lpgDistribution.giDate));
  
    // Update filtered states
    // console.log(filteredDailyData, "DAILY");
    // console.log(filteredMonthlyData, "MONTHLY");
    // console.log(filteredDistributionData, "DISTRIBUTION");
  
    setFilteredDaily(filteredDailyData);
    setFilteredMonthly(filteredMonthlyData);
    setFilteredDistribution(filteredDistributionData);
  }, [data, monthly, dateFilter]);
  
  const handleClearSearch = () => {
    setDateFilter(null);
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
    distributionQty: {
      label: "Penyaluran Elpiji",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <div className="py-6 mx-6">
      <div className="mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 my-4">
        <div className="pl-2">
          <h1 className="text-xl md:text-2xl font-bold">Ringkasan Eksekutif</h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 ml-auto">
          <DatePickerWithRange
            value={dateFilter}
            onDateChange={setDateFilter}
            placeholder={
              dateFilter?.from && dateFilter?.to
                ? `${format(dateFilter.from, "dd MMMM yyyy", { locale: id })} - ${format(
                    dateFilter.to,
                    "dd MMMM yyyy",
                    { locale: id }
                  )}`
                : format(new Date(), "dd MMMM yyyy", { locale: id })
            }
          />
          <Button variant="default" onClick={handleClearSearch} className="w-full md:w-auto">
            <SearchX className="h-5 w-5 mr-2 cursor-pointer" /> Bersihkan Pencarian
          </Button>
        </div>
      </div>

        {/* TODAY */}
        <Card className="px-6 py-6 my-5 shadow-lg rounded-2xl bg-white border border-gray-200">
          <h1 className="text-2xl font-semibold mb-4">Wawasan Hari ini</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 justify-between px-2">
            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-2">
                  <CalendarCheck className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL ALOKASI HARIAN ({filteredDaily.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(totalDailyQty)} / <span className="text-xl text-gray-600">{formatNumberQty(totalDailyQty*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-2">
                  <CalendarDays className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL ALOKASI BULANAN ({filteredMonthly.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(totalMonthlyQty)} / <span className="text-xl text-gray-600">{formatNumberQty(totalMonthlyQty*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-2">
                  <ScrollText className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL PENYALURAN LPG ({filteredDistribution.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(totalDistributionlyQty)} / <span className="text-xl text-gray-600">{formatNumberQty(totalDistributionlyQty*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-2">
                  <Clock4 className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL PENDING</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(totalDistributionlyQty)} / <span className="text-xl text-gray-600">{formatNumberQty(totalDistributionlyQty*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-2">
                  <PackagePlus className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL FAKULTATIF</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(totalDistributionlyQty)} / <span className="text-xl text-gray-600">{formatNumberQty(totalDistributionlyQty*3)} Kg</span></p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ALL DATA */}
        <Card className="px-6 py-6 my-5 shadow-lg rounded-2xl bg-white border border-gray-200 mb-5">
          <h1 className="text-2xl font-semibold mb-4">Ringkasan</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 justify-between px-2">
            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-4">
                  <CalendarCheck className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL ALOKASI HARIAN ({dailyAllocation.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(calculateSummaryQty(data, "allocatedQty"))} / <span className="text-xl text-gray-600">{formatNumberQty(calculateSummaryQty(data, "allocatedQty")*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-4">
                  <CalendarDays className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL ALOKASI BULANAN ({monthlyAllocation.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(calculateSummaryQty(monthly, "totalElpiji"))} / <span className="text-xl text-gray-600">{formatNumberQty(calculateSummaryQty(monthly, "totalElpiji")*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-4">
                  <ScrollText className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL PENYALURAN LPG ({dailyDistribution.length})</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(calculateSummaryQty(data, "lpgDistribution.distributionQty"))} / <span className="text-xl text-gray-600">{formatNumberQty(calculateSummaryQty(data, "lpgDistribution.distributionQty")*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-4">
                  <Clock4 className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL PENDING</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(calculateDiff(calculateSummaryQty(data, "allocatedQty"), calculateSummaryQty(data,"lpgDistribution.distributionQty")))} / <span className="text-xl text-gray-600">{formatNumberQty(calculateDiff(calculateSummaryQty(data, "allocatedQty"), calculateSummaryQty(data,"lpgDistribution.distributionQty"))*3)} Kg</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-black rounded-xl p-4">
                  <PackagePlus className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-400 mb-1">TOTAL FAKULTATIF</h1>
                  <p className="text-3xl font-extrabold">{formatNumberQty(calculateDiff(calculateSummaryQty(monthly, "totalElpiji"), calculateSummaryQty(data,"allocatedQty")))} / <span className="text-xl text-gray-600">{formatNumberQty(calculateDiff(calculateSummaryQty(monthly, "totalElpiji"), calculateSummaryQty(data,"allocatedQty"))*3)} Kg</span></p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>


      <div className="mb-16"></div>
        <div className="my-5">
          <div className="pl-2 mt-5">
            <h1 className="text-2xl font-semibold mb-4 mx-3">Chart Jumlah Tabung</h1>
          </div>
          <Card className="flex flex-col w-full h-[520px] pb-3 shadow-lg rounded-2xl bg-white ">
            <CardHeader className="pb-0">
              <CardTitle>Minggu ini</CardTitle>
              <CardDescription>
                Mingguan ({format(new Date(), "dd MMMM yyyy", { locale: id })})
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pl-2">
              <ChartComponent
                data={getWeeklyTotalQty(dailyAllocation)}
                data2={getWeeklyTotalQty(monthlyAllocation)}
                data3={getWeeklyTotalQty(dailyDistribution)}
                config={chartConfig}
                title="Tabung Elpiji"
                timeFrame="weekdays"
              />
            </CardContent>
          </Card>
          <div className="mb-6"></div>
          <Card className="flex flex-col w-full h-[520px] pb-3 shadow-lg rounded-2xl bg-white ">
            <CardHeader className="pb-0">
              <CardTitle>Tahun ini</CardTitle>
              <CardDescription>
                Tahunan ({format(new Date(), "MMMM yyyy", { locale: id })})
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pl-2">
              <ChartComponent
                data={getAnnualTotalQty(dailyAllocation)}
                data2={getAnnualTotalQty(monthlyAllocation)}
                data3={getAnnualTotalQty(dailyDistribution)}
                config={chartConfig}
                title="Tabung Elpiji"
                timeFrame="monthly"
              />
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default Summary;

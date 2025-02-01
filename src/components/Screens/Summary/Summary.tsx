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
import { endOfWeek, format, startOfWeek } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
  calcSummary,
  calculateDiff,
  calculateSummaryQty,
  formatNumberQty,
  getAnnualTotalQty,
  getTodayTotalQty,
  getWeeklyTotalQty,
  normalizeDateFrom,
  normalizeDateTo,
} from "@/utils/page";
import { id } from "date-fns/locale";
import { CalendarCheck, CalendarDays, CalendarX2, Clock4, Download, PackagePlus, ScrollText, SearchX, X } from "lucide-react";
import { DatePickerWithRange } from "@/components/FeatureComponents/DateRange";
import { Button, buttonVariants } from "@/components/ui/button";
import SummaryItems from "@/components/FeatureComponents/SummaryItems";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { getSummary } from "@/app/actions/alokasi.action";
import { AllocationData, DataConfig } from "@/lib/types";


const Summary = () => {
  const chartRef = useRef(null);
  const [ data, setData ] = useState<AllocationData[]>([]);
  const [ monthly, setMonthly ] = useState<DataConfig[]>([]);
  // Summary Chart
  const [monthlyAllocation, setMonthlyAllocation] = useState<DataConfig[]>([]);
  const [dailyAllocation, setDailyAllocation] = useState<DataConfig[]>([]);
  const [dailyDistribution, setDailyDistribution] = useState<DataConfig[]>([]);
  
  // Filtering Data 
  const [isFiltered, setIsFiltered] = useState<Boolean>(false);
  const [dateFilter, setDateFilter] = useState<{ from: Date | null; to: Date | null } | null>();

  const [filteredDaily, setFilteredDaily] = useState<AllocationData[]>([]);
  const [filteredMonthly, setFilteredMonthly] = useState<DataConfig[]>([]);
  const [filteredDistribution, setFilteredDistribution] = useState<AllocationData[]>([]);
  
  const totalDailyQty = calculateSummaryQty(filteredDaily, "allocatedQty");
  const totalMonthlyQty = calculateSummaryQty(filteredMonthly, "qty");
  const totalDistributionlyQty = calculateSummaryQty(filteredDistribution, "lpgDistribution.distributionQty");

  const filterByDate = (itemDate: Date, day?: string) => {
    const matchesDate = dateFilter?.from
      ? dateFilter?.to
        ? normalizeDateFrom(itemDate) >= normalizeDateFrom(dateFilter.from) &&
          normalizeDateTo(itemDate) <= normalizeDateTo(dateFilter.to)
        : normalizeDateFrom(itemDate) >= normalizeDateFrom(dateFilter.from) &&
          normalizeDateTo(itemDate) <= normalizeDateTo(dateFilter.from)
      : day
        ? normalizeDateFrom(new Date()) === normalizeDateTo(new Date())
        : true;
    return matchesDate;
  };

  const loadAllData = async () => {
    const { data, monthly } = await getSummary();
    setData(data);
    setMonthly(monthly);

    const monthlyData = monthly.map((item: any) => ({
      date: item.date,
      qty: item.qty,
    }));

    const dailyData = data.map((item: any) => ({
      date: item.plannedGiDate,
      qty: item.allocatedQty,
    }));
    
    const distributionData = data
      .filter((item: any) => item.lpgDistribution !== null)
      .map((item: any) => ({
        date: item.lpgDistribution.giDate,
        qty: item.lpgDistribution.distributionQty ?? 0,
      }));

    setDailyAllocation(dailyData);
    setMonthlyAllocation(monthlyData);
    setDailyDistribution(distributionData);
  };

  // Configure data format and apply initial transformations
  // useEffect(() => {
  //   const monthlyData = monthly.map((item: any) => ({
  //     date: item.date,
  //     qty: item.totalElpiji,
  //   }));

  //   const dailyData = data.map((item: any) => ({
  //     date: item.plannedGiDate,
  //     qty: item.allocatedQty,
  //   }));
    
  //   const distributionData = data
  //     .filter((item: any) => item.lpgDistribution !== null)
  //     .map((item: any) => ({
  //       date: item.lpgDistribution.giDate,
  //       qty: item.lpgDistribution.distributionQty ?? 0,
  //     }));

  //   setDailyAllocation(dailyData);
  //   setMonthlyAllocation(monthlyData);
  //   setDailyDistribution(distributionData);
  // }, [data, monthly]);

  // Apply filters when date filter changes
  useEffect(() => {
    const filteredDailyData = data.filter((item: AllocationData) => 
      item.lpgDistribution?.giDate ? filterByDate(item.lpgDistribution.giDate) : false
    );

    const filteredMonthlyData = monthly.filter((item) => 
      filterByDate(item.date)
    );

    const filteredDistributionData = data
      .filter((item) => item.lpgDistribution !== null)
      .filter((item) =>
        item.lpgDistribution?.giDate
          ? filterByDate(item.lpgDistribution.giDate)
          : false
      );

    setFilteredDaily(filteredDailyData);
    setFilteredMonthly(filteredMonthlyData);
    setFilteredDistribution(filteredDistributionData);
  }, [data, monthly, dateFilter]);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, []);

  const clearFilters = () => {
    setDateFilter(null);
  };

  // const downloadPDF = async () => {
  //   try {
  //     const doc = new jsPDF("portrait", "mm", "a4");
  //     const pageHeight = doc.internal.pageSize.height; // Tinggi halaman A4 dalam mm
  //     const margin = 10; // Margin halaman
  //     let currentHeight = margin; // Posisi vertikal awal
  
  //     // Ambil elemen pertama (Chart Minggu Ini)
  //     const firstChart = document.querySelector("#chart-weekly");
  //     if (firstChart) {
  //       const canvas = await html2canvas(firstChart as HTMLElement);
  //       const imgData = canvas.toDataURL("image/png");
  //       const imgHeight = (canvas.height * 210) / canvas.width; // Sesuaikan lebar ke 210mm (A4 width)
  
  //       // Tambahkan ke PDF
  //       if (currentHeight + imgHeight > pageHeight - margin) {
  //         doc.addPage(); // Tambahkan halaman baru jika konten melampaui batas
  //         currentHeight = margin;
  //       }
  //       doc.addImage(imgData, "PNG", margin, currentHeight, 190, imgHeight);
  //       currentHeight += imgHeight + 10; // Tambahkan margin antar elemen
  //     }
  
  //     // Ambil elemen kedua (Chart Tahun Ini)
  //     const secondChart = document.querySelector("#chart-annual");
  //     if (secondChart) {
  //       const canvas = await html2canvas(secondChart as HTMLElement);
  //       const imgData = canvas.toDataURL("image/png");
  //       const imgHeight = (canvas.height * 210) / canvas.width;
  
  //       // Tambahkan ke PDF
  //       if (currentHeight + imgHeight > pageHeight - margin) {
  //         doc.addPage();
  //         currentHeight = margin;
  //       }
  //       doc.addImage(imgData, "PNG", margin, currentHeight, 190, imgHeight);
  //     }
  
  //     // Simpan PDF
  //     doc.save("summary-charts.pdf");
  //   } catch (error) {
  //     console.error("Terjadi kesalahan saat mengunduh PDF:", error);
  //   }
  // };  

  const weeklyChartRef = useRef(null);
  const yearlyChartRef = useRef(null);
  
  const downloadWeeklyChart = async () => {
    try {
      const chart = weeklyChartRef.current;
      if (chart) {
        const canvas = await html2canvas(chart);
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "weekly_chart.png";
        link.click();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunduh chart mingguan:", error);
    }
  };
  
  const downloadYearlyChart = async () => {
    try {
      const chart = yearlyChartRef.current;
      if (chart) {
        const canvas = await html2canvas(chart);
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "yearly_chart.png";
        link.click();
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunduh chart tahunan:", error);
    }
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
      label: "Penyaluran LPG",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <div className="mx-5">
      <div className="mb-4">
        <div className="flex md:flex-row items-start md:items-center gap-4 my-4">
          <div className="pl-2">
            <h1 className="text-xl md:text-2xl font-bold">Ringkasan Eksekutif</h1>
          </div>
        </div>

        {/* TODAY */}
        <Card className="px-6 py-6 my-5 shadow-lg rounded-2xl bg-white border border-gray-200">
          <h1 className="text-2xl font-semibold mb-1 ">Wawasan Hari Ini
            <span className="text-sm m-3 font-semibold text-gray-500 mb-1">
              ({format(new Date(), "dd MMMM yyyy")})
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 justify-between">
            <SummaryItems
              icon={<CalendarCheck className="h-10 w-10 text-white" />}
              title={`ALOKASI HARIAN`}
              value={`${formatNumberQty(getTodayTotalQty(dailyAllocation))} / `}
              additionalInfo={`${formatNumberQty(getTodayTotalQty(dailyAllocation) * 3)} Kg`}
            />
            
            <SummaryItems
              icon={<CalendarDays className="h-10 w-10 text-white" />}
              title={`ALOKASI BULANAN`}
              value={`${formatNumberQty(getTodayTotalQty(monthlyAllocation))} / `}
              additionalInfo={`${formatNumberQty(getTodayTotalQty(monthlyAllocation) * 3)} Kg`}
            />
              
            <SummaryItems
              icon={<ScrollText className="h-10 w-10 text-white" />}
              title={`PENYALURAN LPG`}
              value={`${formatNumberQty(getTodayTotalQty(dailyDistribution))} / `}
              additionalInfo={`${formatNumberQty(getTodayTotalQty(dailyDistribution) * 3)} Kg`}
            />
            
            <SummaryItems
              icon={<Clock4 className="h-10 w-10 text-white" />}
              title={"PENDING HARIAN"}
              value={`${formatNumberQty(calcSummary(dailyAllocation, dailyDistribution))} / `}
              additionalInfo={`${formatNumberQty(calcSummary(dailyAllocation, dailyDistribution) * 3)} Kg`}
            />
            
            <SummaryItems
              icon={<PackagePlus className="h-10 w-10 text-white" />}
              title={"FAKULTATIF"}
              value={`${formatNumberQty(calcSummary(dailyAllocation, monthlyAllocation))} / `}
              additionalInfo={`${formatNumberQty(calcSummary(dailyAllocation, monthlyAllocation) * 3)} Kg`}
            />

            <SummaryItems
              icon={<CalendarX2 className="h-10 w-10 text-white" />}
              title={"ALOKASI TIDAK DITEBUS"}
              value={`${formatNumberQty(calcSummary(monthlyAllocation, dailyAllocation))} / `}
              additionalInfo={`${formatNumberQty(calcSummary(monthlyAllocation, dailyAllocation) * 3)} Kg`}
            />
          </div>
        </Card>

        {/* FILTER DATA */}
        <Card className="px-6 py-6 my-5 shadow-lg rounded-2xl bg-white border border-gray-200 mb-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 my-4">
            <h1 className="text-2xl font-semibold mb-4">Ringkasan
            <span className="text-sm m-3 font-semibold text-gray-500 mb-1">
              {
                dateFilter?.from && dateFilter?.to
                  ? `${format(dateFilter.from, "(dd MMMM yyyy)", { locale: id })} - ${format(
                      dateFilter.to,
                      "(dd MMMM yyyy)",
                      { locale: id }
                    )}`
                  : dateFilter?.from
                  ?`${format(dateFilter.from, "(dd MMMM yyyy)", { locale: id })}`
                  :"(Semua Tanggal)"
                  // : format(new Date(), "dd MMMM yyyy", { locale: id })
              }
              </span>
            </h1>
            <div className="flex flex-row items-center sm:gap-4 ml-auto self-center w-full sm:w-auto">
              <div className="w-full sm:w-auto flex-1">
                <DatePickerWithRange
                  value={dateFilter}
                  onDateChange={(txt)=> {
                    setDateFilter(txt)
                    setIsFiltered(true)
                  }}
                  placeholder={
                    dateFilter?.from && dateFilter?.to
                      ? `${format(dateFilter.from, "dd MMMM yyyy", { locale: id })} - ${format(
                          dateFilter.to,
                          "dd MMMM yyyy",
                          { locale: id }
                        )}`
                      : "Semua Tanggal"
                  }
                  className="w-full sm:w-auto"
                />
              </div>

              {isFiltered && 
              <Button
                variant="destructive"
                onClick={()=>{
                  setIsFiltered(false);
                  clearFilters()
                }}
                className="flex items-center justify-center flex-2"
              >
                <X className="h-5 w-5 cursor-pointer" />
                {/* <span className="truncate">Bersihkan Pencarian</span> */}
              </Button>}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 justify-between">
          <SummaryItems
              icon={<CalendarCheck className="h-10 w-10 text-white" />}
              title={`TOTAL ALOKASI HARIAN (${formatNumberQty(filteredDaily.length)})`}
              value={`${formatNumberQty(totalDailyQty)} / `}
              additionalInfo={`${formatNumberQty(totalDailyQty * 3)} Kg`}
              cs={"p-4"}
            />
            
            <SummaryItems
              icon={<CalendarDays className="h-10 w-10 text-white" />}
              title={`TOTAL ALOKASI BULANAN (${formatNumberQty(filteredMonthly.length)})`}
              value={`${formatNumberQty(totalMonthlyQty)} / `}
              additionalInfo={`${formatNumberQty(totalMonthlyQty * 3)} Kg`}
              cs={"p-4"}
            />
            
            <SummaryItems
              icon={<ScrollText className="h-10 w-10 text-white" />}
              title={`TOTAL PENYALURAN LPG (${formatNumberQty(filteredDistribution.length)})`}
              value={`${formatNumberQty(totalDistributionlyQty)} / `}
              additionalInfo={`${formatNumberQty(totalDistributionlyQty * 3)} Kg`}
              cs={"p-4"}
            />
            
            <SummaryItems
              icon={<Clock4 className="h-10 w-10 text-white" />}
              title={"TOTAL PENDING HARIAN"}
              value={`${formatNumberQty(calculateDiff(totalDailyQty, totalDistributionlyQty))} / `}
              additionalInfo={`${formatNumberQty(calculateDiff(totalDailyQty, totalDistributionlyQty) * 3)} Kg`}
              cs={"p-4"}
            />
            
            <SummaryItems
              icon={<PackagePlus className="h-10 w-10 text-white" />}
              title={"TOTAL FAKULTATIF"}
              value={`${formatNumberQty(calculateDiff(totalDailyQty, totalMonthlyQty))} / `}
              additionalInfo={`${formatNumberQty(calculateDiff(totalDailyQty, totalMonthlyQty) * 3)} Kg`}
              cs={"p-4"}
            />

            <SummaryItems
              icon={<CalendarX2 className="h-10 w-10 text-white" />}
              title={"TOTAL ALOKASI TIDAK DITEBUS"}
              value={`${formatNumberQty(calculateDiff(totalMonthlyQty, totalDailyQty))} / `}
              additionalInfo={`${formatNumberQty(calculateDiff(totalMonthlyQty, totalDailyQty) * 3)} Kg`}
              cs={"p-4"}
            />
          </div>
        </Card>
      </div>

      <div className="mb-16"></div>
        <div className="my-5">
        <div className="pl-2 mt-5">
        <div className="flex items-center justify-between mx-1 mb-4">
          <h1 className="text-2xl font-semibold">Chart Jumlah Tabung</h1>
          <div className="flex space-x-2">
            <Button 
              onClick={downloadWeeklyChart} 
              className="w-auto flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2 cursor-pointer" />
              <span className="truncate">Chart Mingguan</span>
            </Button>
            <Button 
              onClick={downloadYearlyChart} 
              className="w-auto flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2 cursor-pointer" />
              <span className="truncate">Chart Tahunan</span>
            </Button>
          </div>
        </div>
      </div>
          <div ref={weeklyChartRef} id="chart-weekly">
            <Card className="flex flex-col w-full h-[550px] pb-3 shadow-lg rounded-2xl bg-white ">
              <CardHeader className="pb-0">
                <CardTitle>Minggu ini</CardTitle>
                <CardDescription>
                  {format(startOfWeek(new Date(), { weekStartsOn: 0 }), "dd MMMM yyyy", { locale: id })} - 
                  {format(endOfWeek(new Date(), { weekStartsOn: 0 }), "dd MMMM yyyy", { locale: id })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0 pl-2">
                <ChartComponent
                  data={getWeeklyTotalQty(dailyAllocation)}
                  data2={getWeeklyTotalQty(monthlyAllocation)}
                  data3={getWeeklyTotalQty(dailyDistribution)}
                  title="Tabung Elpiji"
                  timeFrame="weekly"
                />
              </CardContent>
            </Card>
          </div>
          <div className="mb-6"></div>
          <div ref={yearlyChartRef} id="chart-annual">
          <Card className="flex flex-col w-full h-[550px] pb-3 shadow-lg rounded-2xl bg-white ">
            <CardHeader className="pb-0">
              <CardTitle>Tahun ini</CardTitle>
              <CardDescription>
                {format(new Date(), "MMMM yyyy", { locale: id })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pl-2">
              <ChartComponent
                data={getAnnualTotalQty(dailyAllocation)}
                data2={getAnnualTotalQty(monthlyAllocation)}
                data3={getAnnualTotalQty(dailyDistribution)}
                title="Tabung Elpiji"
                timeFrame="monthly"
              />
            </CardContent>
          </Card>
          </div>
      </div>
    </div>
  );
};

export default Summary;

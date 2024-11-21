"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DataTable } from "../../ui/data-table";
import Link from "next/link";
import { SearchX, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import MonthPicker from "@/components/FeatureComponents/MonthPicker";
import { useEffect, useState } from "react";
import { format, isSameMonth } from "date-fns";
import { formatNumberQty, calculateTotalQty, calculateMontlyQty } from "@/utils/page";
import { id } from "date-fns/locale";

interface AlokasiBulananProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: {
    id: string;
    username: string;
    role: string;
  };
}

const AlokasiBulanan = <
  TData extends { date?: Date },
  TValue
>({
  columns,
  data,
  user,
}: AlokasiBulananProps<TData, TValue>) => {
  const [currentMonth, setCurrentMonth] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState<TData[]>(data);

  // Apply month filter to the data
  useEffect(() => {
    if (currentMonth) {
      const filtered = data.filter((item) => {
        return (
          item.date &&
          isSameMonth(new Date(item.date), currentMonth) 
        );
      });
      setFilteredData(filtered);
      console.log(filtered)
    } else {
      setFilteredData(data); 
    }
  }, [currentMonth, data]);

  const handleClearSearch = () => {
    setCurrentMonth(null);
  };

  return (
    <div className="w-full">
      <div className="py-4 mx-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 mb-4">
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Jumlah Alokasi:</h1>
            <p className="text-3xl font-bold">
              {formatNumberQty(calculateMontlyQty(filteredData))}
            </p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Volume Alokasi:</h1>
            <p className="text-3xl font-bold">
              {formatNumberQty(calculateMontlyQty(filteredData) * 3)} <span className="text-lg">Kg</span>
            </p>
          </Card>
          <Card className="flex-1 px-4 py-5">
            <h1 className="text-lg font-semibold">Total Data:</h1>
            <p className="text-3xl font-bold">{filteredData.length}</p>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="px-4 py-5 mb-4">
          <div className="px-4 text-center">
            <h1 className="text-lg font-semibold py-2 pb-4">Filter Alokasi</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            {/* Month Picker */}
            <div className="gap-4 ">
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

          <div className="flex justify-between items-center mb-3 space-x-2">
            {user.role === "ADMIN" && (
              <Button variant="default" asChild>
                <Link href="alokasi-bulanan/upload">
                  <Upload className="h-4 w-4 mr-2 cursor-pointer" />
                  Upload Alokasi Bulanan
                </Link>
              </Button>
            )}
            {/* <div className="flex space-x-2">
              {currentMonth && (
                <Button variant="default" onClick={handleClearSearch}>
                  <SearchX className="h-4 w-4 mr-2 cursor-pointer" />
                  Bersihkan Pencarian
                </Button>
              )}
            </div> */}
          </div>
        </Card>

        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default AlokasiBulanan;
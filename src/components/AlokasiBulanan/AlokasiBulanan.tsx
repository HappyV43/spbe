"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import Link from "next/link";
import { Label } from "../ui/label";
import ComboBox from "../FeatureComponents/ComboBox";
import { Search, SearchX, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerWithRange } from "../FeatureComponents/DateRange";
import { toast } from "@/hooks/use-toast";
import { ChartComponent } from "../FeatureComponents/Chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig } from "../ui/chart";
import { endOfMonth, format, getYear, startOfMonth } from "date-fns";

interface AlokasiBulananProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const AlokasiBulanan = <TData extends {
    date?: Date;
    totalQty?: number | 0;
    totalVolume?: number | 0;
    updatedAt?: Date;
  },
  TValue
>({
  columns,
  data,
}: AlokasiBulananProps<TData, TValue>) => {
    return (
        <div className="w-full">
            <div className="items-center py-4 mx-4">
                <div className="flex justify-between items-center mb-3 space-x-2">
                    <Button className="mx-4" variant="default" asChild>
                        <Link href="alokasi-bulanan/upload"> 
                            <Upload className="h-4 w-4 mr-2 cursor-pointer"/>
                            Upload Alokasi
                        </Link>
                    </Button>
                </div>

                <DataTable columns={columns} data={data} />
            </div>
        </div>

        
    );
};

export default AlokasiBulanan;

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DataTable } from "../../ui/data-table";
import Link from "next/link";
import { Upload } from "lucide-react";

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
  TData extends {
    date?: Date;
    totalQty?: number | 0;
    totalVolume?: number | 0;
    updatedAt?: Date;
  },
  TValue
>({
  columns,
  data,
  user,
}: AlokasiBulananProps<TData, TValue>) => {
  return (
    <div className="w-full">
      <div className="items-center py-4 mx-4">
        {user.role === "ADMIN" && (
          <div className="flex justify-between items-center mb-3 space-x-2">
            <Button className="mx-4" variant="default" asChild>
              <Link href="alokasi-bulanan/upload">
                <Upload className="h-4 w-4 mr-2 cursor-pointer" />
                Upload Alokasi Bulanan
              </Link>
            </Button>
          </div>
        )}

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AlokasiBulanan;

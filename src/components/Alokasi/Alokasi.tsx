"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import Link from "next/link";

interface AlokasiProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  } 
const Alokasi = <TData, TValue>({columns, data}: AlokasiProps<TData, TValue>) => {
    return (
        <div className="w-full">
            <div className=" items-center py-4 mx-4">
                <div className="flex flex-row justify-between mb-4">
                    {/* NOTE: when requested */}

                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email" className="text-lg">Search</Label>
                        <Input type="text" id="text" placeholder="Search..." />
                    </div> */}
                    <div className="flex flex-end align-end items-end">
                        <Button variant="outline" className="ml-auto" asChild>
                            <Link href="alokasi/upload">Upload Alokasi</Link>
                        </Button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} />        
            </div>
        </div>
    )
}

export default Alokasi
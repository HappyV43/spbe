"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { Allocation, RawDataMap } from "@/lib/types";
import { read, utils } from "xlsx";
import { uploadBulkExcel } from "@/app/actions/upload-file.action";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function UploadAlokasi({
  user,
}: {
  user: {
    id: string;
    username: string;
  };
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<Allocation[]>([]);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
  
      // Validasi jenis file
      const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Jenis file tidak valid. Harap unggah file dengan format .xlsx atau .xls.", variant: "destructive" });
        return;
      }
  
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSizeInBytes) {
        toast({ title: "Ukuran file melebihi 2 MB. Harap unggah file yang lebih kecil.", variant: "destructive" });
        return;
      }
  
      setSelectedFile(file);
      previewExcel(file);
    }
  };
  

  const previewExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
  
        const requiredColumns = ["SHIP_TO", "SHIP_TO_NAME", "DO_NUMBER", "QUANTITY", "MATERIAL_NAME", "PLANNED_GI_DATE"];
        const sheetHeaders:any = utils.sheet_to_json(workSheet, { header: 1 })[0]; 
        const missingColumns = requiredColumns.filter(col => !sheetHeaders.includes(col));
  
        if (missingColumns.length > 0) {
          toast({ title: `Kolom yang hilang: ${missingColumns.join(", ")}. Harap periksa format file Anda.`, variant:"destructive" });
          return;
        }
  
        const json = utils.sheet_to_json(workSheet);
        const uploadedData = json as RawDataMap[];
        
        const transformedData = uploadedData.map((row) => ({
          shipTo: String(row.SHIP_TO),
          agentName: String(row.SHIP_TO_NAME),
          deliveryNumber: String(row.DO_NUMBER),
          allocatedQty:
            typeof row.QUANTITY === "string"
              ? parseInt(row.QUANTITY)
              : row.QUANTITY,
          materialName: String(row.MATERIAL_NAME),
          plannedGiDate: String(row.PLANNED_GI_DATE),
          giDate: row.giDate ? new Date(row.giDate) : null,
          createdBy: user.id,
          updatedBy: user.id,
        }));
  
        setTableData(transformedData);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
  const uploadExcel = async () => {
    if(selectedFile == null || tableData.length <= 0){
      toast({ 
        title: selectedFile == null 
          ? "Harap pilih file untuk diunggah." 
          : "Data tidak ditemukan. Harap periksa format file.",
        variant: "destructive" 
      });
      return
    }

      console.log(selectedFile)
      console.log(tableData.length)
      const te = await uploadBulkExcel(tableData);
      console.log(te)
      toast({ title: "Upload Excel Berhasil" });
      // redirect("/dashboard/alokasi");
    // } catch (error) {
    //   toast({ title: "Upload Excel Gagal", variant:"destructive" });
    //   console.error(error);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Upload Excel
        </h1>
      </div>

      <div className="w-full max-w-md">
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center gap-4 w-full h-96 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                .xlsx, .xls
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="mt-4 flex justify-center">
          <Input
            disabled
            type="text"
            value={selectedFile ? selectedFile.name : "Upload File"}
            className="text-primary"
          />
          <Button onClick={uploadExcel}>
            {tableData.length > 0 ? "Upload" : "Impor"} Data
          </Button>
        </div>
      </div>

      {tableData.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold my-3">Pratinjau Excel</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">No</TableHead>
                <TableHead className="text-lg">Ship To</TableHead>
                <TableHead className="text-lg">Nama Agen</TableHead>
                <TableHead className="text-lg">Nomer DO</TableHead>
                <TableHead className="text-lg">Jumlah Tabung</TableHead>
                <TableHead className="text-lg">Nama Material</TableHead>
                <TableHead className="text-lg">Planned GI Date</TableHead>
                <TableHead className="text-lg">GI Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="py-3">{index +1}</TableCell>
                  <TableCell className="py-3">{row.shipTo}</TableCell>
                  <TableCell className="py-3">{row.agentName}</TableCell>
                  <TableCell className="py-3">{row.deliveryNumber}</TableCell>
                  <TableCell className="py-3">{row.allocatedQty}</TableCell>
                  <TableCell className="py-3">{row.materialName}</TableCell>
                  <TableCell className="py-3">{row.plannedGiDate}</TableCell>
                  <TableCell className="py-3">{row.giDate ? row.giDate.toLocaleDateString() : ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

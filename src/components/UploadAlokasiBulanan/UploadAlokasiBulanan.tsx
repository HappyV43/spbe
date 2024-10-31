"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // import shadcn table components
import { toast } from "@/hooks/use-toast";
import { MonthlyAllocation } from "@/lib/types";
import { uploadBulkExcelMonthly } from "@/app/actions/upload-file.action";
import { redirect } from "next/navigation";

export default function UploadAlokasiBulanan({
  user,
}: {
  user: {
    id: string;
    username: string;
  };
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<MonthlyAllocation[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validasi jenis file
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title:
            "Jenis file tidak valid. Harap unggah file dengan format .xlsx atau .xls.",
          variant: "destructive",
        });
        return;
      }

      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSizeInBytes) {
        toast({
          title:
            "Ukuran file melebihi 2 MB. Harap unggah file yang lebih kecil.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      previewExcel(file);
    }
  };

  const excelDateToJSDate = (serial: number) => {
    const excelStartDate = new Date(1900, 0, 1); // January 1, 1900
    const dateInMs =
      excelStartDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000;
    return new Date(dateInMs);
  };

  const previewExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(workSheet);
        const uploadedData = json as MonthlyAllocation[];

        const transformedData = uploadedData.map((row) => ({
          Tanggal:
            typeof row.Tanggal === "number"
              ? excelDateToJSDate(row.Tanggal)
              : row.Tanggal,
          Total_Elpiji: row.Total_Elpiji,
          Volume_Total_Elpiji: row.Volume_Total_Elpiji,
          createdBy: user.id,
          updatedBy: user.id,
        }));

        setTableData(transformedData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadExcel = async () => {
    if (selectedFile != null && tableData.length > 0) {
      toast({
        title:
          selectedFile == null
            ? "Harap pilih file untuk diunggah."
            : "Data tidak ditemukan. Harap periksa format file.",
        variant: "destructive",
      });
      const result = await uploadBulkExcelMonthly(tableData);
      if (result?.error) {
        toast({
          title: "Gagal",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Berhasil",
          description: "Alokasi Bulanan berhasil ditambahkan",
        });
      }
    }
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
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
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold">Pratinjau Excel</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} className="my-6">
                  <TableCell>{index + 1}</TableCell>
                  {row.Tanggal instanceof Date
                    ? row.Tanggal.toLocaleDateString()
                    : row.Tanggal}
                  <TableCell>{row.Total_Elpiji}</TableCell>
                  <TableCell>{row.Volume_Total_Elpiji}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

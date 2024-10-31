"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation, Agents, Companies, LpgDistributions } from "@/lib/types";
import { Printer, SquarePlus } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditFormAgents from "../components/CRUD/EditFormAgents";
import EditFormLpg from "@/components/CRUD/EditFormLpg";
import CetakPenyaluran from "@/components/CetakDistribusi/CetakPenyaluran";

export const lpgDistributionColumns: ColumnDef<LpgDistributions>[] = [
  {
    header: "Tindakan",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1">
          <Button
            variant="outline"
            asChild
            className="text-center align-center justify-center w-1"
          >
            <PDFDownloadLink
              className="text-center"
              document={<CetakPenyaluran data={row.original} />}
              fileName={`Penyaluran Elpiji ${row.original.deliveryNumber}.pdf`}
            >
              <Printer className="h-4 w-4 text-center align-center text-green-500 cursor-pointer" />
            </PDFDownloadLink>
          </Button>
          <EditFormLpg row={row.original} />
        </div>
      );
    },
  },
  {
    accessorKey: "bpeNumber",
    header: "Nomor BPE",
  },
  {
    accessorKey: "giDate",
    header: "Tanggal",
  },
  {
    accessorKey: "agentName",
    header: "Nama Agen",
  },
  {
    accessorKey: "licensePlate",
    header: "Nomor Plat",
  },
  {
    accessorKey: "deliveryNumber",
    header: "Nomor DO",
  },
  {
    accessorKey: "allocatedQty",
    header: "Kuantitas",
  },
  {
    accessorKey: "distributionQty",
    header: "Jumlah Tabung",
  },
  {
    accessorKey: "volume",
    header: "Volume Tabung",
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    sortingFn: "datetime",
    sortDescFirst: true,
  },
];

export const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      // console.log(status)
      return (
        <span
          className={status == "Pending" ? ("text-orange-500") : ("text-lime-500")}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "deliveryNumber",
    header: "Nomer DO",
  },
  {
    accessorKey: "shipTo",
    header: "Ship To",
  },
  {
    accessorKey: "agentName",
    header: "Nama Agen",
  },
  {
    accessorKey: "materialName",
    header: "Nama Material",
  },
  {
    accessorKey: "allocatedQty",
    header: "Jumlah",
  },
  {
    accessorKey: "plannedGiDate",
    header: "Planned GI Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("plannedGiDate") as string; // Get the string date (e.g., "01102024")

      // Extract the day, month, and year from the string
      const day = rawDate.slice(0, 2); // "01"
      const month = rawDate.slice(2, 4); // "10"
      const year = rawDate.slice(4); // "2024"

      const formattedDate = `${day}-${month}-${year}`; // Format to "dd-MM-yyyy"

      return <span>{formattedDate}</span>; // Return the formatted date
    },
  },
  {
    accessorKey: "giDate",
    header: "GI Date",
  },
  {
    accessorKey: "bpeNumber",
    header: "Nomer BPE",
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
  },
  {
    header: "Tindakan",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button variant="outline" disabled={row.original.status === "Approved"}>
          <Link
            href={`penyaluran-elpiji/form?query=${row.original.deliveryNumber}`}
            className={
              row.original.status === "Approved" ? "cursor-not-allowed" : ""
            }
          >
            <SquarePlus className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
];

export const agentColumns: ColumnDef<Agents>[] = [
  {
    accessorKey: "Tindakan",
    cell: ({ row }) => {
      return (
        <EditFormAgents row={row.original} />
      );
    },
  },
  {
    accessorKey: "agentName",
    header: "Nama Agen",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "city",
    header: "Kota",
  },
  {
    accessorKey: "phone",
    header: "No HP",
  },
  {
    accessorKey: "fax",
    header: "Fax",
  },
  {
    accessorKey: "companyName",
    header: "Nama Perusahaan",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
  },
];

export const companiesColumns: ColumnDef<Companies>[] = [
  {
    accessorKey: "companyName",
    header: "Nama Perusahaan",
  },
  {
    accessorKey: "address",
    header: "Alamat",
  },
  {
    accessorKey: "telephone",
    header: "No HP",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
  },
];

export const Role = [
  { label: "User", value: "USER" },
  { label: "Admin", value: "ADMIN" },
];

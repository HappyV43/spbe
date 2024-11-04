"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Allocation,
  Agents,
  Companies,
  LpgDistributions,
  MonthlyAllocation,
} from "@/lib/types";
import { Trash, Printer, Pencil, SquarePlus } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import ActionButtons from "@/components/FeatureComponents/ActionButtons";
import Link from "next/link";
import EditFormAgents from "../components/FeatureComponents/CRUD/EditFormAgents";
import EditFormLpg from "@/components/FeatureComponents/CRUD/EditFormLpg";
import CetakPenyaluran from "@/components/FeatureComponents/CetakDistribusi/CetakPenyaluran";
import { formatDate } from "@/utils/page";

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
    cell: ({ row }) => {
      const date = row.original.giDate
        ? new Date(row.original.giDate)
        : null;
      return (
        <div className="flex-[1]">
          {date
            ? `${date.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`
            : "-"}
        </div>
      );
    },
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
    header: "Jumlah Alokasi",
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
    cell: ({ row }) => {
      const date = row.original.updatedAt; 
      return <div>{formatDate(date)}</div>;
    },
  },
];

export const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
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
      const rawDate = row.original.plannedGiDate;
      if (rawDate) {
        const day = rawDate.slice(0, 2);
        const month = rawDate.slice(2, 4);
        const year = rawDate.slice(4);
        const formattedDate = `${day}-${month}-${year}`;
        return <span>{formattedDate}</span>;
      }
      return <span>-</span>;
    },
  },
  {
    accessorKey: "giDate",
    header: "GI Date",
    cell: ({ row }) => {
      const date = row.original.giDate
        ? new Date(row.original.giDate)
        : null;
      return (
        <div className="flex-[1]">
          {date
            ? `${date.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "bpeNumber",
    header: "Nomer BPE",
    cell: ({ row }) => {
      const bpe = row.original.bpeNumber;
      return (
        <>
          {bpe ? bpe : "-" }
        </>
      )
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    size: 1,
    cell: ({ row }) => {
      const date = row.original.updatedAt; 
      return <div>{formatDate(date)}</div>;
    },
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
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format tanggal
  // },
];

export const monthlyAllocationColumns: ColumnDef<MonthlyAllocation>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    size: 1,
    cell: ({ row }) => {
      return (
        <div className="flex-[1]">
          {row.original.date ? new Date(row.original.date).toLocaleDateString("id-ID") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "totalElpiji",
    header: "Jumlah",
    size: 3,
    cell: ({ row }) => {
      return (
        <div className="flex-[3]">{row.original.totalElpiji}</div>
      )
    },
  },
  {
    accessorKey: "volume",
    header: "Total Volume",
    size: 3,
    cell: ({ row }) => {
      return (
        <div className="flex-[3]">{row.original.totalElpiji*3}</div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    size: 1,
    cell: ({ row }) => {
      const date = row.original.updatedAt; 
      return <div>{formatDate(date)}</div>;
    },
  }
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
    cell: ({ row }) => {
      const date = row.original.createdAt; 
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    cell: ({ row }) => {
      const date = row.original.updatedAt; 
      return <div>{formatDate(date)}</div>;
    },
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
    size: 1,
    cell: ({ row }) => {
      const date = row.original.createdAt; 
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    size: 1,
    cell: ({ row }) => {
      const date = row.original.updatedAt; 
      return <div>{formatDate(date)}</div>;
    },
  },
];

export const Role = [
  { label: "User", value: "USER" },
  { label: "Admin", value: "ADMIN" },
];

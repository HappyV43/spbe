"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation } from "@/lib/types";
import { AgentsDataType } from "./DataAgents";
import { CompaniesDataType } from "./DataCompanies";

// Definisikan kolom untuk tabel menggunakan TanStack Table
export const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let statusClass = "";
      if (status === "Pending") {
        statusClass = "text-orange-500";
      } else if (status === "delivered") {
        statusClass = "text-green-500";
      }
      return <span className={statusClass}>{status}</span>;
    },
  },
  {
    accessorKey: "deliveryNumber",
    header: "Delivery Number",
  },
  {
    accessorKey: "shipTo",
    header: "Ship To",
  },
  {
    accessorKey: "namaAgen",
    header: "Agent Name",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "alocatedQty",
    header: "Quantity",
    cell: ({ row }) => row.original.alocatedQty.toLocaleString(), // Optional: format angka
  },
  {
    accessorKey: "giDate",
    header: "GI Date",
  },
  {
    accessorKey: "bpeNumber",
    header: "BPE Number",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(), // Format tanggal
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format tanggal
  // },
];

export const agentColumns: ColumnDef<AgentsDataType>[] = [

  {
      accessorKey: "id",
      header: "ID",
  },
  {
      accessorKey: "name",
      header: "Name",
  },
  {
      accessorKey: "address",
      header: "Address",
  },
  {
      accessorKey: "city",
      header: "City",
  },
  {
      accessorKey: "phone",
      header: "Phone",
  },
  {
      accessorKey: "fax",
      header: "Fax",
  },
  {
      accessorKey: "associatedCompanyId",
      header: "Associated Company Id",
  },
  {
      accessorKey: "createdAt",
      header: "Created At",
  },
  {
      accessorKey: "updatedAt",
      header: "Updated At",
  }
];

export const companiesColumns: ColumnDef<CompaniesDataType>[] = [
  {
      accessorKey: 'id',
      header: 'ID',
  },
  {
      accessorKey: 'company',
      header: 'Company Name',
  },
  {
      accessorKey: 'address',
      header: 'Address',
  },
  {
      accessorKey: 'telephone',
      header: 'Telephone',
  },
  {
      accessorKey: 'createdAt',
      header: 'Created At',
  },
  {
      accessorKey: 'updatedAt',
      header: 'Updated At',
  },
];
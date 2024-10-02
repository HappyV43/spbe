"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation } from "@/lib/types";

// Definisikan kolom untuk tabel menggunakan TanStack Table
export const columns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "deliveryNumber",
    header: "Delivery Number",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
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
    accessorKey: "period",
    header: "Period",
  },
  {
    accessorKey: "alocatedQty",
    header: "Allocated Quantity",
    cell: ({ row }) => row.original.alocatedQty.toLocaleString(), // Optional: format angka
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(), // Format tanggal
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format tanggal
  },
];

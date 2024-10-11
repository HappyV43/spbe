"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation, Agents, Companies, LpgDistributions } from "@/lib/types";

export const lpgDistributionColumns: ColumnDef<LpgDistributions>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  // {
  //   accessorKey: "addresses",
  //   header: "Alamat",
  // },
  // {
  //   accessorKey: "city",
  //   header: "Kota",
  // },
  // {
  //   accessorKey: "phone",
  //   header: "No HP",
  // },
  // {
  //   accessorKey: "fax",
  //   header: "Fax",
  // },
  // {
  //   accessorKey: "associatedCompanyId",
  //   header: "Nama Perusahaan",
  // },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
  },
];

export const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let statusClass = "";
      if (status === "Pending") {
        statusClass = "text-orange-500";
      } else if (status === "Approved") {
        statusClass = "text-green-500";
      }
      return <span className={statusClass}>{status}</span>;
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
    // cell: ({ row }) => row.original.alocatedQty.toLocaleString(), // Optional: format angka
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
    // cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(), // Format tanggal
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format tanggal
  // },
];

export const agentColumns: ColumnDef<Agents>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "addresses",
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
    accessorKey: "associatedCompanyId",
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
    accessorKey: "company",
    header: "Nama Perusahaan",
  },
  {
    accessorKey: "addresses",
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

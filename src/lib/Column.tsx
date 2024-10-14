"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation, Agents, Companies, LpgDistributions } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash, Printer, Pencil} from 'lucide-react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import CetakPenyaluran from "@/components/CetakPenyaluran/CetakPenyaluran";

export const lpgDistributionColumns: ColumnDef<LpgDistributions>[] = [
  {
    accessorKey: "name",
    header: "Nama Agen",
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
    header: "Tindakan",
    cell: ({ row }) => {
      
      // Define actions for edit, delete, and print
      const handleEdit = () => {
        console.log("Edit", row.original);
      };
      const handleDelete = () => {
        console.log("Delete", row.original);
      };
      const handlePrint = () => {
        console.log("Print", row.original);
      };
  
      return (
        <div className="flex justify-center space-x-4">
          {/* Edit Icon */}
          <Pencil 
            className="h-4 w-4 text-blue-500 cursor-pointer"
            onClick={handleEdit}
          />
          {/* Delete Icon */}
          
          {/* Print Icon */}
          <PDFDownloadLink
            document={<CetakPenyaluran data={row.original} />}
            fileName={`Penyaluran Elpiji ${row.original.deliveryNumber}.pdf`}>
            <Printer 
            className="h-4 w-4 text-green-500 cursor-pointer"
            />
          </PDFDownloadLink>
          <Trash 
              className="h-4 w-4 text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
        </div>
      );
    },
  },
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

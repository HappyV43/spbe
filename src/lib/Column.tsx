"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Allocation, Agents, Companies, LpgDistributions } from "@/lib/types";
import { Trash, Printer, Pencil, SquarePlus } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CetakPenyaluran from "@/components/CetakPenyaluran/CetakPenyaluran";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import ActionButtons from "@/components/FeatureComponents/ActionButtons";
import { deleteLpgData } from "@/app/actions/lpg-distribution.action";
import Link from "next/link";

export const lpgDistributionColumns: ColumnDef<LpgDistributions>[] = [
  {
    header: "Tindakan",
    cell: ({ row }) => {
      // Define actions for edit, delete, and print
      const handleEdit = () => {
        console.log("Edit", row.original);
      };
      const handleDelete = async () => {
        const id = row.original.id;

        if (id === undefined) {
          toast({
            title: "Error",
            description: "id gak ada",
            variant: "destructive",
          });
          return;
        }

        const result = await deleteLpgData(id);
        if (result?.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Berhasil",
            description: "Distribusi berhasil dihapus",
          });

        }
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
            fileName={`Penyaluran Elpiji ${row.original.deliveryNumber}.pdf`}
          >
            <Printer className="h-4 w-4 text-green-500 cursor-pointer" />
          </PDFDownloadLink>
          <Dialog>
            <DialogTrigger>
              <Trash className="h-4 w-4 text-red-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={handleDelete}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
  },
];

export const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      // Set different colors based on the status value
      let statusClass = "";
      switch (status) {
        case "Pending":
          statusClass = "text-orange-500";
          break;
        case "Approved":
          statusClass = "text-lime-500";
          break;
        default:
          statusClass = "text-gray-500";
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
  {
    header: "Tindakan",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button
        variant="outline"
        disabled={row.original.status === "Approved"}
      >
        <Link
          href={`penyaluran-elpiji/form?query=${row.original.deliveryNumber}`}
          className={row.original.status === "Approved" ? "cursor-not-allowed" : ""}
        >
          <SquarePlus className="h-4 w-4" />
        </Link>
      </Button>
      )
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format tanggal
  // },
];

export const agentColumns: ColumnDef<Agents>[] = [
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

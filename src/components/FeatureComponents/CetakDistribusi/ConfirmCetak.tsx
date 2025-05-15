"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PackageOpen, Printer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import CetakPenyaluran from "./CetakPenyaluran";
import CetakPlastikWrap from "./CetakPlastikWrap";
import { getCompaniesMetaData } from "@/app/actions/companies.action";

const ConfirmCetak = ({ row, type }: any) => {
  const [id, setId] = useState(row.id);
  const [userId, setUserId] = useState(row.createdBy);
  const [platKendaraan, setPlatKendaraan] = useState(row.licensePlate ?? "");
  const [namaSopir, setNamaSopir] = useState(row.driverName ?? "");
  const [namaSupervisor, setNamaSupervisor] = useState(row.superVisor ?? null);
  const [namaGateKeeper, setNamaGateKeeper] = useState(row.gateKeeper ?? null);
  const [namaAdministrasi, setNamaAdministrasi] = useState(
    row.administrasi ?? null
  );
  const [jumlahTabungBocor, setJumlahTabungBocor] = useState(row.bocor ?? 0);
  const [isiKurang, setIsiKurang] = useState(row.isiKurang ?? 0);
  const [companies, setCompanies] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isDataPrepared, setIsDataPrepared] = useState(false);

  const handlePrepareDownload = async () => {
    setLoading(true);
    const result = await getCompaniesMetaData(userId);
    let url = "";

    if (result[0].id === 1) {
      url =
        "https://f6oujhgi9dzrtqrk.public.blob.vercel-storage.com/SVG%20to%20PNG%20Conversion%20(1)-Xec3SuuiyCo71J4ndm3O533x0jWGTb.png";
      setCompanies({ ...result[0], imageUrl: url });
    } else if (result[0].id === 2) {
      url =
        "https://f6oujhgi9dzrtqrk.public.blob.vercel-storage.com/Logo%20Satya%20Mitra%20Gas-ivGydVea6ML0snBVxegT9AGFX3fqmc.png";
      setCompanies({ ...result[0], imageUrl: url });
    }

    setLoading(false);
    setIsDataPrepared(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-center align-center justify-center w-1"
          onClick={handlePrepareDownload}
        >
          {type == "wrap" ? (
            <PackageOpen
              className="h-4 w-4 text-center align-center text-green-500 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <Printer
              className="h-4 w-4 text-center align-center cursor-pointer"
              style={{ color: "blue" }}
              aria-hidden="true"
            />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <div>
          <DialogHeader>
            <DialogTitle>Print Data</DialogTitle>
            <DialogDescription>Apakah data sudah sesuai?</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Plat Kendaraan</Label>
              <Input
                id="platKendaraan"
                name="platKendaraan"
                value={platKendaraan}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Nama Sopir</Label>
              <Input
                id="namaSopir"
                name="namaSopir"
                value={namaSopir}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">GateKeeper</Label>
              <Input
                id="gateKeeper"
                name="gateKeeper"
                value={namaGateKeeper}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Supervisor</Label>
              <Input
                id="superVisor"
                name="superVisor"
                value={namaSupervisor}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Administrasi</Label>
              <Input
                id="administrasi"
                name="administrasi"
                value={namaAdministrasi}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Tabung Bocor</Label>
              <Input
                id="jumlahTabungBocor"
                name="jumlahTabungBocor"
                value={jumlahTabungBocor}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                type="number"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-center">Isi Kurang</Label>
              <Input
                id="isiKurang"
                name="isiKurang"
                value={isiKurang}
                className="col-span-3 cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                type="number"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="id"
                name="id"
                value={id}
                className="col-span-3 hidden cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button asChild>
                <PDFDownloadLink
                  className="text-center"
                  document={
                    type === "wrap" ? (
                      <CetakPlastikWrap data={row} companies={companies} />
                    ) : (
                      <CetakPenyaluran
                        data={row}
                        companies={companies}
                        // imageUrl={}
                      />
                    )
                  }
                  fileName={
                    type === "wrap"
                      ? `Plastik Wrap ${row.deliveryNumber}.pdf`
                      : `Penyaluran Elpiji ${row.deliveryNumber}.pdf`
                  }
                  aria-label={`Download Penyaluran Elpiji PDF for delivery number ${row.deliveryNumber}`}
                >
                  {type === "wrap"
                    ? "Download Plastik Wrap PDF"
                    : "Download Penyaluran PDF"}
                </PDFDownloadLink>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Kembali</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCetak;

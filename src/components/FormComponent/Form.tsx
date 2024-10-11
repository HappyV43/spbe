"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils"; // assuming you have utility functions for classnames
import { data } from "@/lib/dummyData/DataAlokasi";

interface Props {
  page: string;
}

const Form = ({ page }: Props) => {
  const [formData, setFormData] = useState({
    nomorTransaksi: "",
    nomorDo: "",
    platKendaraan: "",
    namaSopir: "",
    jumlahTabung: "",
    volumeTabung: "",
    jumlahTabungBocor: "",
    isiKurang: "",
    namaAgen: "",
    waktuPengambilan: "",
    status: "",
  });

  const [counter, setCounter] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const generateNomorTransaksi = () => {
    const date = new Date;
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(2);
    return `BPE-${mm}${yy}-${String(counter).padStart(4, '0')}`;
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      nomorTransaksi: generateNomorTransaksi(),
    })); 
  }, [counter]);

  const validateForm = () => {
    const {
      nomorTransaksi,
      nomorDo,
      platKendaraan,
      namaSopir,
      namaAgen,
      waktuPengambilan,
      status,
      jumlahTabung,
      volumeTabung,
    } = formData;

    if (
      !nomorTransaksi ||
      !nomorDo ||
      !platKendaraan ||
      !namaSopir ||
      !namaAgen ||
      !waktuPengambilan ||
      !status ||
      !jumlahTabung ||
      !volumeTabung
    ) {
      setErrorMessage("Ada field yang belum diisi");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted", formData);
      alert("Form data submitted");

      setCounter(counter+1);
    }
  };

  return (
    <>
      {page === "distribution" && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 p-9">
              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nomor Transaksi</Label>
                <Input
                  className="cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200"
                  disabled
                  placeholder="Nomor Transaksi bpe-bbyy-autoinc" value={formData.nomorTransaksi}
                  onChange={handleInputChange}
                  name="nomorTransaksi"
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nomor DO</Label>
                <div className="flex">
                  <Input
                    placeholder="Nomor DO"
                  />
                  <Button
                    type="button"
                    onClick={() => console.log("Search clicked")}
                    className="rounded-l-none"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nama Agen</Label>
                <Input
                  className="cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200"
                  placeholder="Nama agen"
                  disabled
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Waktu Pengambilan</Label>
                <Input
                  className="cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200"
                  placeholder="Waktu pengambilan hh:mm"
                  disabled
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Plat Kendaraan</Label>
                <Input
                  placeholder="Plat kendaraan" 
                  name="platKendaraan"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nama Sopir</Label>
                <Input
                  placeholder="Nama sopir"
                  name="namaSopir"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Status</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="outline-none">
                    <span>{formData.status || "Pilih status"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Jumlah Tabung</Label>
                <Input
                  className="cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200"
                  placeholder="Jumlah tabung"
                  disabled
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Volume Tabung</Label>
                <Input
                  className="cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200"
                  placeholder="Volume tabung total vol tabung * 3"
                  disabled
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Jumlah Tabung Bocor</Label>
                <Input
                  placeholder="Jumlah tabung bocor"
                  name="jumlahTabungBocor"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Isi Kurang</Label>
                <Input
                  placeholder="Isi kurang"
                  name="isiKurang"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end m-11">
              <Button type="submit" disabled={!isFormValid} className="px-9">
                Submit
              </Button>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
      )}

      {page === "agents" && (
        <div>
          <form className="grid mx-6">
            <div className="flex flex-col my-2 mt-6">
              <Label className="font-bold text-xs rounded-md my-2">Nama</Label>
              <Input placeholder="Nama" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Alamat</Label>
              <Input placeholder="Alamat" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Kota</Label>
              <Input placeholder="Kota" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Nomor Telepon</Label>
              <Input placeholder="Nomor telepon" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Fax</Label>
              <Input placeholder="Fax" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Perusahaan Asal</Label>
              <Input placeholder="Perusahaan asal" />
            </div>

            <div className="flex justify-end m-11">
              <Button type="submit" className="px-9" disabled={!isFormValid}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}

      {page === "companies" && (
        <div>
          <form className="grid mx-6 my-2">
            <div className="flex flex-col mt-6">
              <Label className="font-bold text-s my-2">Nama Perusahaan</Label>
              <Input placeholder="Nama perusahaan" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-s my-2">Alamat</Label>
              <Input placeholder="Alamat" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-s my-2">Nomor Telepon</Label>
              <Input placeholder="Nomor telepon" />
            </div>
          </form>

          <div className="flex justify-end m-11">
            <Button type="submit" className="px-9" disabled={!isFormValid}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;

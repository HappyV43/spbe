"use client";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { LpgDistributionSearch, LpgDistributions } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { postLpgData } from "@/app/actions/lpg-distribution.action";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { revalidatePath } from "next/cache";

// TODO: kasih toast jika delivNumbernya gak ada

interface Props {
  page: string;
  data: LpgDistributionSearch[];
}

const Form = ({ page, data }: Props) => {
  // const [formData, setFormData] = useState({
  //   nomorTransaksi: "",
  //   nomorDo: "",
  //   platKendaraan: "",
  //   namaSopir: "",
  //   jumlahTabung: 0,
  //   volumeTabung: 0,
  //   jumlahTabungBocor: Number(""),
  //   isiKurang: Number(""),
  //   namaAgen: "",
  //   waktuPengambilan: new Date(),
  //   status: "",
  // });

  const [counter, setCounter] = useState("0001");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isFormValid, setIsFormValid] = useState(false);

  const generateNomorTransaksi = () => {
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(2);
    return `BPE-${mm}${yy}-${"0001".padStart(4, "0")}`;
  };

  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     nomorTransaksi: generateNomorTransaksi(),
  //   }));
  // }, [counter]);

  // useEffect(() => {
  //   setIsFormValid(validateForm());
  // }, [formData]);

  // const validateForm = () => {
  //   const {
  //     nomorTransaksi,
  //     nomorDo,
  //     platKendaraan,
  //     namaSopir,
  //     namaAgen,
  //     waktuPengambilan,
  //     status,
  //     jumlahTabung,
  //     volumeTabung,
  //   } = formData;

  //   if (
  //     !nomorTransaksi ||
  //     !nomorDo ||
  //     !platKendaraan ||
  //     !namaSopir ||
  //     !namaAgen ||
  //     !waktuPengambilan ||
  //     !status ||
  //     !jumlahTabung ||
  //     !volumeTabung
  //   ) {
  //     setErrorMessage("Ada field yang belum diisi");
  //     return false;
  //   }

  //   setErrorMessage("");
  //   return true;
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //     nomorDo: data && data.length > 0 ? data[0].deliveryNumber : "", // Update nomorDo dengan data atau value dari input
  //     namaAgen: data && data.length > 0 ? data[0].agentName : "",
  //     jumlahTabung: data && data.length > 0 ? Number(data[0].allocatedQty) : 0,
  //     volumeTabung:
  //       data && data.length > 0 ? Number(data[0].allocatedQty) * 3 : 0,
  //   }));

  //   console.log("Updated form data:", {
  //     ...formData,
  //     [name]: value, // Untuk melihat hasil sementara
  //   });
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log("Form data submitted", formData);
  //     alert("Form data submitted");

  //     setCounter(counter + 1);
  //   }
  // };

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    term ? params.set("query", term) : params.delete("query");
    replace(`${pathName}?${params.toString()}`);
  }, 400);
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const nonReq = "cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300"
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const result = await postLpgData(formData);

      if (result?.error) {
        toast({
          title: "Gagal",
          description: result.error,
          variant: "destructive",
        });
      } else {
        ref.current?.reset();
        toast({
          title: "Berhasil",
          description: "Distribusi berhasil ditambahkan",
        });

        redirect("/dashboard/penyaluran-elpiji");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {page === "distribution" && (
        <div>
          <form
            ref={ref}
            action={async (formData) => {
              await handleSubmit(formData);
            }}
          >
            <div className="grid grid-cols-2 gap-6 p-9">
              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">
                  Nomor Transaksi
                </Label>
                <Input
                  className={nonReq}
                  placeholder="Nomor Transaksi bpe-bbyy-autoinc"
                  name="nomorTransaksi"
                  value={generateNomorTransaksi()}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nomor DO</Label>
                <div className="flex">
                  <Input
                    placeholder="Nomor DO"
                    type="text"
                    onChange={(e) => {
                      handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                    name="nomorDo"
                  />
                </div>
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nama Agen</Label>
                <Input
                  className={nonReq}
                  placeholder="Nama agen"
                  name="namaAgen"
                  value={data.length > 0 ? data[0].agentName : ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">
                  Waktu Pengambilan
                </Label>
                <Input
                  className={nonReq}
                  placeholder="Waktu pengambilan"
                  name="waktuPengambilan"
                  value={format(new Date(),"dd MMMM yyyy")}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Plat Kendaraan</Label>
                <Input placeholder="Plat kendaraan" name="platKendaraan" />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Nama Sopir</Label>
                <Input placeholder="Nama sopir" name="namaSopir" />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Status</Label>
                <Select name="status">
                  <SelectTrigger className="outline-none">
                    <SelectValue placeholder="Select Status" />
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
                  type="number"
                  className={nonReq}
                  placeholder="Jumlah tabung"
                  name="jumlahTabung"
                  value={data.length > 0 ? data[0].allocatedQty : ""}
                  readOnly
                />
              </div>

              <div className="my-2">
                <Label className="font-bold text-xs my-2">Id alokasi</Label>
                <Input
                  type="number"
                  className={nonReq}
                  placeholder="alokasi id"
                  name="allocationid"
                  value={data.length > 0 ? data[0].id : ""}
                  readOnly
                />
              </div>

              <div className="my-2">
                <Label className="font-bold text-xs my-2">Ship To</Label>
                <Input
                  type="number"
                  className={nonReq}
                  placeholder="shipTo"
                  name="shipTo"
                  value={data.length > 0 ? data[0].shipTo.trim() : ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Volume Tabung</Label>
                <Input
                  type="number"
                  className={nonReq}
                  placeholder="Volume tabung"
                  name="volumeTabung"
                  value={data.length > 0 ? data[0].allocatedQty * 3 : ""}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">
                  Jumlah Tabung Bocor
                </Label>
                <Input
                  placeholder="Jumlah tabung bocor"
                  name="jumlahTabungBocor"
                />
              </div>

              <div className="flex flex-col my-2">
                <Label className="font-bold text-xs my-2">Isi Kurang</Label>
                <Input placeholder="Isi kurang" name="isiKurang" />
              </div>
            </div>

            <div className="flex justify-end px-11 pb-11">
              <Button type="submit" className="mx-9 px-9" disabled={loading}>
                {pending ? "Menambahkan.. " : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* {page === "agents" && (
        <div>
          <form className="grid mx-6">
            <div className="flex flex-col my-2 mt-6">
              <Label className="font-bold text-xs rounded-md my-2">Nama</Label>
              <Input placeholder="Nama" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Alamat
              </Label>
              <Input placeholder="Alamat" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Kota</Label>
              <Input placeholder="Kota" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Nomor Telepon
              </Label>
              <Input placeholder="Nomor telepon" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Fax</Label>
              <Input placeholder="Fax" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Perusahaan Asal
              </Label>
              <Input placeholder="Perusahaan asal" />
            </div>

            <div className="flex justify-end m-11">
              <Button type="submit" className="px-9">
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
      )} */}
    </>
  );
};

export default Form;

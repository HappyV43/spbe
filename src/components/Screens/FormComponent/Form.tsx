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
import { LpgDistributionSearch } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { postLpgData } from "@/app/actions/lpg-distribution.action";
import { useFormStatus } from "react-dom";
import { postCompaniesData } from "@/app/actions/companies.action";
import CetakPenyaluran from "../../FeatureComponents/CetakDistribusi/CetakPenyaluran";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";

// TODO: kasih toast jika delivNumbernya gak ada

interface Props {
  page: string;
  data?: LpgDistributionSearch[];
  companyName?: { id: number; companyName: string }[];
  bpe?: string;
}

const Form = ({ page, data, companyName, bpe }: Props) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(0);

  const handleCompanySelect = (value: any) => {
    const selectedCompany = companyName?.find(
      (company) => company.companyName === value
    );
    setSelectedCompanyId(Number(selectedCompany?.id) || 0);
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

  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const nonReq =
    "cursor-not-allowed outline outline-2 outline-gray-200 bg-gray-200 dark:outline-gray-600 dark:bg-gray-700 text-slate-600 dark:text-slate-300";
  
    const handleSubmit = async (formData: FormData) => {
      setLoading(true);
  
      // Submit the form data to the backend
      const result = await postLpgData(formData);
  
      if (result?.error) {
        toast({
          title: "Gagal",
          description: result.error,
          variant: "destructive",
        });
        setLoading(false);
      } else {
        ref.current?.reset();
        toast({
          title: "Berhasil",
          description: "Distribusi berhasil ditambahkan",
        });
  
        // Generate the PDF after successful form submission
        // const pdfDoc = pdf(<CetakPenyaluran data={data} />);
        // console.log(pdfBlob)
        // const blob = await pdfDoc.toBlob();
        // setPdfBlob(blob);
        // handleDownload();
        redirect("/dashboard/penyaluran-elpiji");
  
      }
    };
  

  const handleDownload = () => {
    <PDFDownloadLink
      document={<CetakPenyaluran data={data} />}
      fileName={`Penyaluran Elpiji ${searchParams.get("query")?.toString()}.pdf`}
    />
  };

  const handleSubmitAgents = async (formData: FormData) => {};

  const handleSubmitCompany = async (formData: FormData) => {
    const result = await postCompaniesData(formData);

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
        description: "Company berhasil ditambahkan",
      });
      redirect("/master-data/companies");
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
                  value={bpe}
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
                  value={data && data.length > 0 ? data[0].agentName : ""}
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
                  value={format(new Date(), 'yyyy-MM-dd')}
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
                <Select name="status" defaultValue="Approved">
                  <SelectTrigger className="outline-none">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending" >Pending</SelectItem>
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
                  value={data && data.length > 0 ? data[0].allocatedQty : ""}
                  readOnly
                />
              </div>

              <div className="hidden my-2">
                <Label className="font-bold text-xs my-2">Id alokasi</Label>
                <Input
                  type="number"
                  className={nonReq}
                  placeholder="alokasi id"
                  name="allocationid"
                  value={data && data.length > 0 ? data[0].id : ""}
                  readOnly
                />
              </div>

              <div className="hidden my-2">
                <Label className="font-bold text-xs my-2">Ship To</Label>
                <Input
                  type="number"
                  className={nonReq}
                  placeholder="shipTo"
                  name="shipTo"
                  value={data && data.length > 0 ? data[0].shipTo.trim() : ""}
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
                  value={
                    data && data.length > 0 ? data[0].allocatedQty * 3 : ""
                  }
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
              {/* <Button
                  type="submit"
                  className="mx-9 px-9"
                  onClick={async (e) => {
                    e.preventDefault(); // Prevent default form action
                    const formData = new FormData(ref.current as HTMLFormElement);
                    await handleSubmit(formData);
                  }}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit & Download"}
                </Button> */}
            </div>
          </form>
        </div>
      )}

      {page === "agents" && (
        <div>
          <form className="grid mx-6" action={handleSubmitAgents}>
            <div className="flex flex-col my-2 mt-6">
              <Label className="font-bold text-xs rounded-md my-2">Nama</Label>
              <Input placeholder="Nama" name="agentName" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Alamat
              </Label>
              <Input placeholder="Alamat" name="address" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Kota</Label>
              <Input placeholder="Kota" name="city" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Nomor Telepon
              </Label>
              <Input placeholder="Nomor telepon" name="phone" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">Fax</Label>
              <Input placeholder="Fax" name="fax" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-xs rounded-md my-2">
                Perusahaan Asal
              </Label>
              <Select name="companyName" onValueChange={handleCompanySelect}>
                <SelectTrigger className="outline-none">
                  <SelectValue placeholder="Perusahaan Asal" />
                </SelectTrigger>
                <SelectContent>
                  {companyName?.map((names) => (
                    <SelectItem key={names.id} value={names.companyName}>
                      {names.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="companyId" value={selectedCompanyId} />
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
          <form className="grid mx-6 my-2" action={handleSubmitCompany}>
            <div className="flex flex-col mt-6">
              <Label className="font-bold text-s my-2">Nama Perusahaan</Label>
              <Input placeholder="Nama perusahaan" name="companyName" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-s my-2">Alamat</Label>
              <Input placeholder="Alamat" name="address" />
            </div>

            <div className="flex flex-col my-2">
              <Label className="font-bold text-s my-2">Nomor Telepon</Label>
              <Input placeholder="Nomor telepon" name="telephone" />
            </div>

            <div className="flex justify-end m-11">
              <Button type="submit" className="px-9">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;

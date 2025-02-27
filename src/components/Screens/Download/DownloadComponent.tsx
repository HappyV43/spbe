"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ComboBoxNelsen from "@/components/FeatureComponents/ComboBoxNelsen";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader, Printer } from "lucide-react";
import RekapPenyaluranBe from "@/components/FeatureComponents/CetakDistribusi/RekapPenyaluranBe";


type valuesFilter = {
  agentName: string;
  deliveryNumber: string;
  range: any;
};

type bpeNumberData = {
  agentName: string;
  deliveryNumber: string;
};

type LpgDistribution = {
  agentName: string;
  deliveryNumber: string;
  id: number;
  bpeNumber: string;
  giDate: Date;
  licensePlate: string;
  allocatedQty: number;
  distributionQty: number;
  volume: number;
  updatedAt: Date;
};

export default function DownloadComponent({
  dataBpeDeliveryAgent,
  defaultData,
}: {
  dataBpeDeliveryAgent: bpeNumberData[];
  defaultData: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const downloadLinkRef = useRef<HTMLButtonElement>(null);

  const form = useForm<valuesFilter>({
    defaultValues: {
      agentName: "",
      deliveryNumber: "",
      range: null,
    },
  });

  async function fetchData(values: valuesFilter) {
    try {
      const { from, to } = values.range || {};
      const response = await fetch("/api/rekap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          range: {
            from: from ? format(new Date(from), "yyyy-MM-dd") : null,
            to: to ? format(new Date(to), "yyyy-MM-dd") : null,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      setData(result.data);
      // Menunggu PDF ter-generate sebelum klik
      setTimeout(() => {
        downloadLinkRef.current?.click();
      }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fungsi untuk submit dengan loading
  async function onSubmit(values: valuesFilter) {
    setLoading(true);
    await fetchData(values);
    setLoading(false);
  }

  // Reset form and fetch all data
  function handleReset() {
    form.reset();
    onSubmit(form.getValues());
  }

  return (
    <div className="w-full">
      <div className="py-4 mx-4">
        <Card className="px-6 py-6 my-3 shadow-lg rounded-2xl bg-white border border-gray-200">
          <div className="px-4 text-center">
            <h1 className="text-lg font-semibold py-2 pb-4">Filter Rekap</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 mb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name Agent</FormLabel>
                      <FormControl>
                        <ComboBoxNelsen
                          placeholder="Pilih Nama Agen"
                          data={dataBpeDeliveryAgent}
                          selectedValue={field.value}
                          onSelect={field.onChange}
                          valueKey="agentName"
                          displayKey="agentName"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No Delivery</FormLabel>
                      <FormControl>
                        <ComboBoxNelsen
                          placeholder="Pilih Nomor Delivery"
                          data={dataBpeDeliveryAgent}
                          selectedValue={field.value}
                          onSelect={field.onChange}
                          valueKey="deliveryNumber"
                          displayKey="deliveryNumber"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rentang Tanggal</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value?.from && field.value?.to ? (
                                <>
                                  {format(field.value.from, "PPP")} -{" "}
                                  {format(field.value.to, "PPP")}
                                </>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range" // Mengubah mode menjadi range
                            selected={field.value} // Menyambungkan nilai yang dipilih dengan field value
                            onSelect={field.onChange} // Memperbarui form dengan nilai yang dipilih
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            } // Validasi untuk tanggal yang tidak bisa dipilih
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        <span className="truncate">Memproses...</span>
                      </>
                    ) : (
                      <>
                        <Printer className="h-4 w-4 text-green-500 cursor-pointer mr-2" />
                        <span className="truncate">Cetak Rekap</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
        {/* Trigger PDF download automatically after form submission */}
        {data.length > 0 && (
          <PDFDownloadLink
            className="text-center"
            document={<RekapPenyaluranBe data={data} />}
            fileName={`Rekap Penyaluran Elpiji.pdf`}
          >
            <Button ref={downloadLinkRef} className="hidden">
              <Printer className="h-4 w-4 text-green-500 cursor-pointer mr-2" />
              <span className="truncate">Cetak Rekap</span>
            </Button>
          </PDFDownloadLink>
        )}
        {/* {data ? (
          <div>
            <div className="mb-4 p-4 border rounded-lg">
              {data.map((item, index) => (
                <ul key={index}>
                  <li>Tanggal nya:{item.date}</li>
                  <li>
                    {item.records.map((record: any, index: string) => (
                      <ul key={index}>
                        <li>ID: {record.id}</li>
                        <li>BPE Number: {record.bpeNumber}</li>
                        <li>Agent Name: {record.agentName}</li>
                        <li>GI Date: {record.giDate}</li>
                        <li>License Plate: {record.licensePlate}</li>
                        <li>Delivery Number: {record.deliveryNumber}</li>
                        <li>Allocated Qty: {record.allocatedQty}</li>
                        <li>Distribution Qty: {record.distributionQty}</li>
                        <li>Volume: {record.volume}</li>
                        <li>Driver Name: {record.driverName}</li>
                        <li>Bocor: {record.bocor === null ? "No" : "Yes"}</li>
                        <li>
                          Isi Kurang: {record.isiKurang === null ? "No" : "Yes"}
                        </li>
                      </ul>
                    ))}
                  </li>
                  <li>`⁠Total elpiji: ${item.quantity.totalElpiji}`</li>
                  <li>
                   `Total allocated qty: ${item.quantity.totalAllocatedQty}``
                  </li>
                  <li>
                    `Total distribution qty: ${item.quantity.totalDistributionQty}`
                  </li>
                  <li>`Total lo: ${item.quantity.totalLo}`</li>
                  <li>Total pending: ${item.quantity.totalPending}`</li>
                  <li>
                  `Total fakultatif: ${item.quantity.totalFakultatif}`
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )} */}
      </div>
    </div>
  );
}

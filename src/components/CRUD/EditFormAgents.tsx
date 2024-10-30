"use client";
import { updateAgentData } from "@/app/actions/agent.action";
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
import { toast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useRef, useState } from "react";

const EditFormAgents = ({ row }) => {
  const ref = useRef<HTMLFormElement>(null);
  const [agentName, setAgentName] = useState(row.agentName);
  const [phone, setPhone] = useState(row.phone);
  const [fax, setFax] = useState(row.fax);
  const [address, setAddress] = useState(row.address);
  const [city, setCity] = useState(row.city);

  const handleEditAgent = async (formData: FormData) => {
    const result = await updateAgentData(formData);

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
        description: "Agent berhasil diupdate",
      });
      redirect("/master-data/agents");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <form
          ref={ref}
          action={async (formData) => {
            await handleEditAgent(formData);
          }}
        >
          <div>
            <DialogHeader>
              <DialogTitle>Edit Data</DialogTitle>
              <DialogDescription>
                Klik simpan apabila telah melakukan perubahan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Nama Agen</Label>
                <Input
                  id="agentName"
                  name="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Nomor HP</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Fax</Label>
                <Input
                  id="fax"
                  name="fax"
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Alamat</Label>
                <Input
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center">Kota</Label>
                <Input
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="col-span-3"
                />
                <Input
                  id="city"
                  name="agentId"
                  value={row.id}
                  onChange={(e) => setCity(e.target.value)}
                  className="col-span-3 hidden"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Perubahan</Button>
              <DialogClose asChild>
                <Button>Kembali</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormAgents;

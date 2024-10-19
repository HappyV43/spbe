import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props {
  page?: string;
  data: any;
}

export function EditForm({ page, data }: Props) {
  return (
    <>
      {page === "distribution" && (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agentName" className="text-right">Agent Name</Label>
            <Input id="agentName" defaultValue={data?.agentName} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryNumber" className="text-right">Delivery Number</Label>
            <Input id="deliveryNumber" defaultValue={data?.deliveryNumber} className="col-span-3" />
          </div>
          {/* Add more form fields as needed */}
        </div>



        // <Dialog open={openDialog} onOpenChange={openDialog}>
        //   <DialogContent className="fixed inset-0 flex items-center justify-center p-4 sm:p-0">
        //     <div className="sm:max-w-[425px] w-full max-w-[90%] bg-white p-4 rounded-lg shadow-lg m-auto">
        //       <DialogHeader>
        //         <DialogTitle>Edit Data</DialogTitle>
        //         <DialogDescription>
        //           Klik simpan apabila telah melakukan perubahan.
        //         </DialogDescription>
        //       </DialogHeader>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Nama Agen</Label>
        //           <Input id="agentName" className="col-span-3" />
        //         </div>
        //       </div>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Waktu Pengambilan</Label>
        //           <Input id="waktuPengambilan" className="col-span-3" />
        //         </div>
        //       </div>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Plat Kendaraan</Label>
        //           <Input id="platKendaraan" className="col-span-3" />
        //         </div>
        //       </div>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Nama Sopir</Label>
        //           <Input id="namaSopir" className="col-span-3" />
        //         </div>
        //       </div>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Jumlah Tabung Bocor</Label>
        //           <Input id="jumlahTabungBocor" className="col-span-3" />
        //         </div>
        //       </div>
        //       <div className="grid gap-4 py-4">
        //         <div className="grid grid-cols-4 items-center gap-4">
        //           <Label className="text-center">Isi Kurang</Label>
        //           <Input id="isiKurang" className="col-span-3" />
        //         </div>
        //       </div>
        //       <DialogFooter>
        //         <Button type="submit" onClick={close}>
        //           Simpan Perubahan
        //         </Button>
        //         <Button onClick={close}>Kembali</Button>
        //       </DialogFooter>
        //     </div>
        //   </DialogContent>
        // </Dialog>
      )}
    </>
  );
}

export default EditForm;
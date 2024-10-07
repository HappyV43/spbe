import { data } from "@/lib/dummyData/DataAlokasi"
import { Button } from "../ui/button"
import { DataTable } from "../ui/data-table"
import Link from "next/link"

const PenyaluranElpiji = () => {
    return (
        <div className="w-full">
            <div className=" items-center py-4 mx-4">
                <div className="flex flex-row justify-between mb-4">
                    {/* NOTE: when requested */}

                    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email" className="text-lg">Search</Label>
                        <Input type="text" id="text" placeholder="Search..." />
                    </div> */}
                        <Button variant="outline" className="ml-auto" asChild>
                            <Link href="alokasi/upload">New Penyaluran Elpiji </Link>
                        </Button>
                    {/* <div className="flex flex-end align-end items-end">
                    </div> */}
                </div>
                {/* <DataTable columns={columns} data={data} />         */}
            </div>
        </div>
    )
}

export default PenyaluranElpiji
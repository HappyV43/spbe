import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { companiesColumns } from "@/lib/Column";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

interface CompaniesProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Companies = <TData, TValue>({
  columns,
  data,
}: CompaniesProps<TData, TValue>) => {
  return (
    <div className="w-full">
      <div className=" items-center py-4 mx-4">
        {/* <div className="justify-start mb-1">
          <Button variant="outline" className="ml-auto justify-start" asChild>
            <Link href="companies/form">
              <Plus className="h-4 w-4 mr-2 cursor-pointer" />
              New Company
            </Link>
          </Button>
        </div> */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Companies;

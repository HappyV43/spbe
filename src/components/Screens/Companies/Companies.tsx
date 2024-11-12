import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

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
        <div className="justify-start mb-1">
          <Button variant="outline" className="ml-auto justify-start" asChild>
            <Link href="companies/form">
              <Plus className="h-4 w-4 mr-2 cursor-pointer" />
              New Company
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Companies;

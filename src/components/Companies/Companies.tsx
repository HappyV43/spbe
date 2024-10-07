import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { companiesColumns } from "@/lib/Column";

interface CompaniesProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Companies = <TData, TValue>({
  columns,
  data,
}: CompaniesProps<TData, TValue>) => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Companies;

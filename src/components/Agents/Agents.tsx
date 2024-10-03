import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

interface AgentsProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  } 

const Agents = <TData, TValue>({columns, data}: AgentsProps<TData, TValue>) => {
    return (
        <div className="w-full">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default Agents
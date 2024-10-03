import { ColumnDef } from "@tanstack/react-table";
import exp from "constants";
import { DataTable } from "../ui/data-table";
import { companiesColumns } from "@/lib/Column";
import { dataCompanies } from "@/lib/DataCompanies";

interface CompaniesProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const Companies = <TData, TValue>({columns, data}: CompaniesProps<TData, TValue>) => {
    return (
        <div>
            <DataTable columns={companiesColumns} data={dataCompanies}/>
        </div>
    )
}

export default Companies
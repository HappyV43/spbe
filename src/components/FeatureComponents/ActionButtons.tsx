import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Pencil, Printer, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CetakPenyaluran from "../CetakPenyaluran/CetakPenyaluran";

interface ActionButtonProps {
    row: any;
}

export function ActionButtons({
    row,
}: ActionButtonProps) {
    const handleEdit = () => {
        console.log("Edit", row.original);
    };
    const handleDelete = () => {
        console.log("Delete", row.original);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Edit</span>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <PDFDownloadLink
                        document={<CetakPenyaluran data={row.original} />}
                        fileName={`Penyaluran Elpiji ${row.original.deliveryNumber}.pdf`}
                    >
                        <Printer className="h-4 w-4 mr-2 text-green-500" />
                        <span>Print</span>
                    </PDFDownloadLink>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleDelete}>
                    <Trash className="h-4 w-4 mr-2 text-red-500" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ActionButtons;
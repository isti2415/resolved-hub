"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DataTableColumnHeader } from "@/components/data-table/header";
import { RecordModel } from "pocketbase";
import DeleteDialog from "@/components/delete-dialog";
import { deleteSupplier } from "@/actions/purchase/supplier";
import EditSupplierForm from "./edit-suppliers";

const formatDate = (date: string | Date) => {
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
};

const ActionCell = ({ row }: { row: Row<RecordModel> }) => {
  const selected = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
        <EditSupplierForm 
            id={selected.id} 
            name={selected.name} 
            contact_person={selected.contact_person}
            phone={selected.phone}
            email={selected.email}
            address={selected.address}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteDialog 
            button="Delete" 
            description="Deleting this will permanently remove the selected Supplier." 
            onDelete={() => deleteSupplier(selected.id)}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<RecordModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier Name" />
    ),
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    accessorKey: "contact_person",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Person "/>
    ),
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => row.getValue("contact_person"),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (props) => <ActionCell row={props.row} />,
  },
];

export default columns;
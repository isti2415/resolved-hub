"use client";

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
import { deleteProduct } from "@/actions/ims/product";
import EditProductForm from "./edit-product";
import { useState } from "react";

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
          <EditProductForm id={selected.id} name={selected.name} description={selected.description} category_id={selected.category_id} cost_price={selected.cost_price} selling_price={selected.selling_price} quantity_in_stock={selected.quantity_in_stock} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteDialog button="Delete" description="Deleting this will permenantly remove the selected product." onDelete={() => deleteProduct(selected.id)}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<RecordModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => formatDate(row.getValue("created")),
  },
  {
    accessorKey: "updated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => formatDate(row.getValue("updated")),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: (props) => <ActionCell row={props.row} />,
  },
];
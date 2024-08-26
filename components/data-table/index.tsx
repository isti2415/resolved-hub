"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "./pagination";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    });

    const getHeaderTitle = (column: any) => {
        if (typeof column.columnDef.header === 'string') {
            return column.columnDef.header;
        } else if (typeof column.columnDef.header === 'function') {
            const headerProps = column.columnDef.header({ column });
            if (headerProps && headerProps.props && headerProps.props.title) {
                return headerProps.props.title;
            }
        }
        return column.columnDef.accessorKey || column.id;
    };

    return (
        <div className="flex flex-col gap-2 min-h-[calc(100vh-144px)] w-full">
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4">
                {table.getAllColumns().map((column) => {
                    return (
                        column.getCanFilter() && (
                            <Input
                                key={column.id}
                                placeholder={`Filter ${getHeaderTitle(column)}`}
                                value={(column.getFilterValue() ?? "") as string}
                                onChange={(event) =>
                                    column.setFilterValue(event.target.value)
                                }
                            />
                        )
                    );
                })}
            </div>
            <div className="flex-grow overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="font-bold text-xl text-center h-[calc(100vh-264px)]"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

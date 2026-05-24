"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    SortingState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FileSpreadsheet,
    FileText,
    ArrowUpDown,
    FileDown
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    filterValue?: string;
    filterColumn?: string;
    onExportPDF?: (data: TData[]) => void;
    onExportExcel?: (data: TData[]) => void;
    onExportWord?: (data: TData[]) => void;
    onSelectionChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    filterValue,
    filterColumn,
    onExportPDF,
    onExportExcel,
    onExportWord,
    onSelectionChange,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            sorting,
            rowSelection,
        },
    });

    React.useEffect(() => {
        if (onSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
            onSelectionChange(selectedRows);
        }
    }, [rowSelection, table, onSelectionChange]);

    React.useEffect(() => {
        if (filterColumn) {
            table.getColumn(filterColumn)?.setFilterValue(filterValue ?? "");
        }
    }, [filterValue, filterColumn, table]);

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1 shrink-0">
                <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
                    {searchKey && (
                        <Input
                            placeholder={`Search...`}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(searchKey)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm h-9 rounded-xl bg-background"
                        />
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <div className="flex items-center gap-2 mr-2">
                        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Rows:</span>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-9 w-[70px] rounded-xl bg-background">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {onExportExcel && (
                        <Button variant="outline" size="sm" onClick={() => onExportExcel(data)} className="h-9 rounded-xl hover:bg-green-50">
                            <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                            Excel
                        </Button>
                    )}
                    {onExportPDF && (
                        <Button variant="outline" size="sm" onClick={() => onExportPDF(data)} className="h-9 rounded-xl hover:bg-red-50">
                            <FileDown className="mr-2 h-4 w-4 text-red-600" />
                            PDF
                        </Button>
                    )}
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => {
                                        const isSortable = header.column.getCanSort();
                                        const isSorted = header.column.getIsSorted();
                                        return (
                                            <TableHead key={header.id} className="font-semibold text-foreground bg-muted/50">
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={isSortable ? "flex items-center gap-2 cursor-pointer select-none group py-2" : ""}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {isSortable && (
                                                            <ArrowUpDown className={`h-4 w-4 transition-opacity ${isSorted ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100'}`} />
                                                        )}
                                                    </div>
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
                                        className="border-b transition-colors even:bg-muted/30 hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-3">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex items-center justify-between px-2 py-2 shrink-0">
                <div className="text-sm text-muted-foreground font-medium">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="rounded-lg px-4" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <div className="text-sm font-medium mx-2">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg px-4" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

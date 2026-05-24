"use client"

import { useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function ProdTable({
    products,
    onEdit,
    onDelete,
    onSelectionChange,
    onExportExcel,
    onExportPDF
}: any) {
    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(v) => row.toggleSelected(!!v)}
                />
            ),
        },
        {
            accessorKey: "sku",
            header: "SKU",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "category.name",
            header: "Category",
            cell: ({ row }) => (
                <Badge className="bg-red-600 text-white hover:bg-red-700 border-none">
                    {row.original.category.name}
                </Badge>
            ),
        },
        {
            accessorKey: "sub_category.name",
            header: "Sub-Category",
            cell: ({ row }) => (
                <Badge variant="outline" className="text-foreground border-border">
                    {row.original.sub_category.name}
                </Badge>
            ),
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <span>{Number(row.original.price).toFixed(2)}</span>,
        },
        {
            accessorKey: "stock_quantity",
            header: "Stock",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEdit(row.original)}
                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(row.original.id)}
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
        },
    ], [onEdit, onDelete]);

    return (
        <DataTable
            columns={columns}
            data={products}
            searchKey="name"
            onExportExcel={onExportExcel}
            onExportPDF={onExportPDF}
            onSelectionChange={(rows) => onSelectionChange(rows.map((r: any) => r.id))}
        />
    );
}

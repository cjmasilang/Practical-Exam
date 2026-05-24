"use client"

import { useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    category: { name: string };
    created_at: string;
}

interface SubCatTableProps {
    subCategories: SubCategory[];
    onEdit: (sub: SubCategory) => void;
    onDelete: (id: number) => void;
    onSelectionChange: (ids: number[]) => void;
    onExportExcel: () => void;
    onExportPDF: () => void;
}

export function SubCatTable({
    subCategories,
    onEdit,
    onDelete,
    onSelectionChange,
    onExportExcel,
    onExportPDF
}: SubCatTableProps) {
    const columns = useMemo<ColumnDef<SubCategory>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        { accessorKey: "id", header: "ID" },
        {
            accessorKey: "category.name",
            header: "Category",
            cell: ({ row }) => <Badge className="bg-red-600 hover:bg-red-700 text-white border-none">{row.original.category.name}</Badge>
        },
        { accessorKey: "name", header: "Sub-Category Name" },
        { accessorKey: "slug", header: "Slug" },
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
                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => onEdit(row.original)}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Edit Sub-Category</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => onDelete(row.original.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Delete Sub-Category</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )
        }
    ], [onEdit, onDelete]);

    return (
        <DataTable
            columns={columns}
            data={subCategories}
            searchKey="name"
            onExportExcel={onExportExcel}
            onExportPDF={onExportPDF}
            onSelectionChange={(rows) => onSelectionChange(rows.map(r => r.id))}
        />
    );
}

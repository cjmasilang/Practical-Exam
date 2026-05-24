"use client"

import { useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

interface CatTableProps {
    categories: Category[];
    onEdit: (c: Category) => void;
    onDelete: (id: number) => void;
    onSelectionChange: (ids: number[]) => void;
    onExportExcel: () => void;
    onExportPDF: () => void;
}

export function CatTable({ categories, onEdit, onDelete, onSelectionChange, onExportExcel, onExportPDF }: CatTableProps) {
    const columns = useMemo<ColumnDef<Category>[]>(() => [
        {
            id: "select",
            header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />,
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
        },
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "slug", header: "Slug" },
        {
            id: "actions", header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
            )
        }
    ], [onEdit, onDelete]);

    return (
        <DataTable
            columns={columns}
            data={categories}
            searchKey="name"
            onExportExcel={onExportExcel}
            onExportPDF={onExportPDF}
            onSelectionChange={(rows) => onSelectionChange(rows.map(r => r.id))}
        />
    );
}

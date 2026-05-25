"use client";

import { useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox";

export function RoleTable({ roles, onEdit, onDelete, onSelectionChange }: any) {
    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            id: "select",
            header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)} />,
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(val) => row.toggleSelected(!!val)} />,
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "permissions", header: "Permissions", cell: ({ row }) => row.original.permissions.map((p: any) => p.name).join(', ') },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}><Edit2 className="h-4 w-4 text-blue-600" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
            )
        }
    ], [onEdit, onDelete]);

    return (
        <DataTable
            columns={columns}
            data={roles}
            searchKey="name"
            onSelectionChange={(rows) => onSelectionChange(rows.map(r => r.id))}
        />
    );
}

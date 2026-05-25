"use client";

import { useMemo } from 'react';
import { Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

export function RoleTable({ roles, onEdit, onView }: any) {
    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            accessorKey: "name",
            header: "Role Name"
        },
        {
            header: "Permissions",
            cell: ({ row }) => (
                <Button variant="outline" size="sm" onClick={() => onView(row.original)}>
                    View {row.original.permissions.length} Permissions
                </Button>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}>
                        <Edit2 className="h-4 w-4 text-blue-600" />
                    </Button>
                </div>
            )
        }
    ], [onEdit, onView]);

    return (
        <DataTable
            columns={columns}
            data={roles}
            searchKey="name"
        />
    );
}

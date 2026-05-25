"use client";

import { useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from "@/components/ui/checkbox";

interface User {
    id: number;
    name: string;
    email: string;
    roles: any[];
}

interface UserTableProps {
    users: User[];
    onEdit: (u: User) => void;
    onDelete: (id: number) => void;
    onSelectionChange: (ids: number[]) => void;
    onExportExcel: () => void;
    onExportPDF: () => void;
}

export function UserTable({ users, onEdit, onDelete, onSelectionChange, onExportExcel, onExportPDF }: UserTableProps) {
    const columns = useMemo<ColumnDef<User>[]>(() => [
        {
            id: "select",
            header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)} />,
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(val) => row.toggleSelected(!!val)} />,
        },
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "roles", header: "Roles", cell: ({ row }) => row.original.roles.map(r => r.name).join(', ') },
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
            data={users}
            searchKey="name"
            onExportExcel={onExportExcel}
            onExportPDF={onExportPDF}
            onSelectionChange={(rows) => onSelectionChange(rows.map(r => r.id))}
        />
    );
}

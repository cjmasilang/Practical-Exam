"use client";

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Shield, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RoleForm } from './components/roleForm';
import { ArchivedRole } from './components/archivedRole';
import { RoleTable } from './components/roleTable';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { ConfirmDialog } from '@/components/global/confirm-dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Role {
    id: number;
    name: string;
    permissions: any[];
    created_at: string;
}

export default function RoleIndex({ roles, permissions }: { roles: Role[], permissions: any[] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const confirmDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('roles.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); },
            onError: () => hideLoading(tid)
        });
    };

    const confirmBulkDelete = () => {
        const tid = showLoading("Deleting selected...");
        router.post(route('roles.bulkDestroy'), { ids: selectedIds }, {
            onSuccess: () => { hideLoading(tid); setBulkDeleteDialogOpen(false); setSelectedIds([]); },
            onError: () => hideLoading(tid)
        });
    };

    const handleExportExcel = () => {
        const data = roles.map(r => ({
            "Name": r.name,
            "Permissions": r.permissions.map(p => p.name).join(', '),
            "Created": r.created_at
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Roles");
        XLSX.writeFile(wb, "roles.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Permissions', 'Created']],
            body: roles.map(r => [r.name, r.permissions.map(p => p.name).join(', '), r.created_at]),
        });
        doc.save("roles.pdf");
    };

    return (
        <>
            <Head title="Role Management" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Roles & Permissions</h2>
                            <p className="text-sm text-muted-foreground">Manage roles and permissions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
                                <Trash className="mr-2 h-4 w-4" /> Delete ({selectedIds.length})
                            </Button>
                        )}
                        <ArchivedRole />
                        <Button size="sm" onClick={() => { setSelectedRole(null); setOpen(true); }} className="rounded-xl font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add Role
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedRole ? 'Edit' : 'Add'} Role</DialogTitle></DialogHeader>
                        <RoleForm role={selectedRole} permissions={permissions} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <RoleTable
                        roles={roles}
                        onEdit={(r: Role) => { setSelectedRole(r); setOpen(true); }}
                        onDelete={(id: number) => { setIdToDelete(id); setDeleteDialogOpen(true); }}
                        onSelectionChange={setSelectedIds}
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
            <ConfirmDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen} onConfirm={confirmBulkDelete} title={`Delete ${selectedIds.length} Roles`} />
        </>
    );
}

RoleIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'People', href: '#' }, { title: 'Roles', href: '/roles' }]}>
        {page}
    </AppLayout>
);

"use client";

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Users, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserForm } from './components/usersForm';
import { ImportUsers } from './components/importUsers';
import { ArchivedUsers } from './components/archivedUsers';
import { UserTable } from './components/userTable';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { ConfirmDialog } from '@/components/global/confirm-dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface User {
    id: number;
    name: string;
    email: string;
    roles: any[];
    created_at: string;
}

export default function UserIndex({ users, roles }: { users: User[], roles: any[] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const confirmDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('users.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); },
            onError: () => hideLoading(tid)
        });
    };

    const confirmBulkDelete = () => {
        const tid = showLoading("Deleting selected...");
        router.post(route('users.bulkDestroy'), { ids: selectedIds }, {
            onSuccess: () => { hideLoading(tid); setBulkDeleteDialogOpen(false); setSelectedIds([]); },
            onError: () => hideLoading(tid)
        });
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(users);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "users.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Email', 'Created']],
            body: users.map(u => [u.name, u.email, u.created_at]),
        });
        doc.save("users.pdf");
    };

    return (
        <>
            <Head title="User Management" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">User Management</h2>
                            <p className="text-sm text-muted-foreground">Manage system users</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
                                <Trash className="mr-2 h-4 w-4" /> Delete ({selectedIds.length})
                            </Button>
                        )}
                        <ArchivedUsers />
                        <ImportUsers users={users} />
                        <Button size="sm" onClick={() => { setSelectedUser(null); setOpen(true); }} className="rounded-xl font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedUser ? 'Edit' : 'Add'} User</DialogTitle></DialogHeader>
                        <UserForm user={selectedUser} roles={roles} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <UserTable
                        users={users}
                        onEdit={(u) => { setSelectedUser(u); setOpen(true); }}
                        onDelete={(id) => { setIdToDelete(id); setDeleteDialogOpen(true); }}
                        onSelectionChange={setSelectedIds}
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
            <ConfirmDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen} onConfirm={confirmBulkDelete} title={`Delete ${selectedIds.length} Users`} />
        </>
    );
}

UserIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'People', href: '#' }, { title: 'Users', href: '/users' }]}>
        {page}
    </AppLayout>
);

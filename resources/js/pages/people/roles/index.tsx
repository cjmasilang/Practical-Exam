"use client";

import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RoleForm } from './components/roleForm';
import { ArchivedRole } from './components/archivedRole';
import { RoleTable } from './components/roleTable';
import { ConfirmDialog } from '@/components/global/confirm-dialog';
import { Shield, Plus, Trash } from 'lucide-react';
import { route } from "ziggy-js";

export default function RoleIndex({ roles, permissions }: any) {
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    return (
        <>
            <Head title="Role Management" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary"><Shield className="h-5 w-5" /></div>
                        <div>
                            <h2 className="text-xl font-bold">Roles & Permissions</h2>
                            <p className="text-sm text-muted-foreground">Manage system access</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <ArchivedRole />
                        <Button size="sm" onClick={() => { setSelectedRole(null); setOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Role
                        </Button>
                    </div>
                </div>

                <RoleTable
                    roles={roles}
                    onEdit={(r: any) => { setSelectedRole(r); setOpen(true); }}
                    onView={(r: any) => { setSelectedRole(r); setViewOpen(true); }}
                />

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>{selectedRole ? 'Edit' : 'Add'} Role</DialogTitle></DialogHeader>
                        <RoleForm role={selectedRole} permissions={permissions} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedRole?.name} Permissions</DialogTitle></DialogHeader>
                        <div className="grid grid-cols-2 gap-2">
                            {selectedRole?.permissions.map((p: any) => (
                                <span key={p.id} className="text-xs bg-muted px-2 py-1 rounded">{p.name}</span>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

RoleIndex.layout = (page: any) => <AppLayout breadcrumbs={[{ title: 'People', href: '#' }, { title: 'Roles', href: '/roles' }]}>{page}</AppLayout>;

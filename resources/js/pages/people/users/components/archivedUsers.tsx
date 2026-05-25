"use client";

import { useState } from 'react';
import { ArchiveRestore, Search, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";

export function ArchivedUsers() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [archived, setArchived] = useState<any[]>([]);

    const fetchArchived = async () => {
        setLoading(true);
        const response = await fetch(route('users.archived'), { headers: { 'Accept': 'application/json' } });
        setArchived(await response.json());
        setLoading(false);
    };

    const handleRestore = (id: number) => {
        const tid = showLoading("Restoring...");
        router.post(route('users.restore', { id }), {}, {
            onSuccess: () => { hideLoading(tid); fetchArchived(); }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (val) fetchArchived(); }}>
            <DialogTrigger asChild><Button variant="outline"><ArchiveRestore className="mr-2 h-4 w-4" /> Archive</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Archived Users</DialogTitle></DialogHeader>
                {loading ? <Loader2 className="animate-spin mx-auto" /> : (
                    <table className="w-full text-sm">
                        <thead><tr><th>Name</th><th>Email</th><th>Action</th></tr></thead>
                        <tbody>
                            {archived.map(u => (
                                <tr key={u.id}><td>{u.name}</td><td>{u.email}</td>
                                    <td><Button onClick={() => handleRestore(u.id)}><RotateCcw /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </DialogContent>
        </Dialog>
    );
}

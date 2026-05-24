"use client"

import { useState } from 'react';
import { ArchiveRestore, Search, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { format } from 'date-fns';
import { ConfirmDialog } from '@/components/global/confirm-dialog';

interface ArchivedCategory {
    id: number;
    name: string;
    slug: string;
    deleted_at: string;
}

export function ArchivedCat() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [archived, setArchived] = useState<ArchivedCategory[]>([]);
    const [search, setSearch] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    const fetchArchived = async () => {
        setLoading(true);
        try {
            const response = await fetch(route('categories.archived'), {
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
            });
            const data = await response.json();
            setArchived(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = (id: number) => {
        const toastId = showLoading("Restoring...");
        router.post(route('categories.restore', { id }), {}, {
            onSuccess: () => { hideLoading(toastId); fetchArchived(); },
            onError: () => hideLoading(toastId)
        });
    };

    const handlePermanentDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('categories.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); fetchArchived(); },
            onError: () => hideLoading(tid)
        });
    };

    const filtered = archived.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (val) fetchArchived(); }}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-xl font-bold">
                        <ArchiveRestore className="mr-2 h-4 w-4" /> Archive
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl rounded-xl">
                    <DialogHeader>
                        <DialogTitle>Archived Categories</DialogTitle>
                        <DialogDescription>Restore or permanently delete category records.</DialogDescription>
                    </DialogHeader>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search archived..." className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="max-h-[400px] overflow-auto rounded-xl border border-border">
                        {loading ? (
                            <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                        ) : filtered.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 text-left font-bold sticky top-0">
                                    <tr className="border-b"><td className="p-3">Name</td><td className="p-3">Slug</td><td className="p-3">Deleted</td><td className="p-3 text-right">Action</td></tr>
                                </thead>
                                <tbody>
                                    {filtered.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-muted/30">
                                            <td className="p-3 font-medium">{item.name}</td>
                                            <td className="p-3">{item.slug}</td>
                                            <td className="p-3 text-muted-foreground">{item.deleted_at ? format(new Date(item.deleted_at), 'MMM dd, yyyy') : 'N/A'}</td>
                                            <td className="p-3 text-right">
                                                <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => handleRestore(item.id)}><RotateCcw className="h-3 w-3" /></Button>
                                                <Button variant="ghost" size="sm" className="text-red-600" onClick={() => { setIdToDelete(item.id); setDeleteDialogOpen(true); }}><Trash2 className="h-3 w-3" /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center text-muted-foreground">No archived records found.</div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={handlePermanentDelete} title="Permanent Delete" description="Are you sure you want to permanently delete this category?" />
        </>
    );
}

"use client"

import { useState } from 'react';
import { ArchiveRestore, Search, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { format } from 'date-fns';
import { ConfirmDialog } from '@/components/global/confirm-dialog';

export function ArchivedProd() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [archived, setArchived] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);

    const fetchArchived = async () => {
        setLoading(true);
        try {
            const res = await fetch(route('products.archived'), { headers: { 'Accept': 'application/json' } });
            setArchived(await res.json());
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleRestore = (id: number) => {
        const tid = showLoading("Restoring...");
        router.post(route('products.restore', { id }), {}, { onSuccess: () => { hideLoading(tid); fetchArchived(); } });
    };

    const handlePermanentDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('products.destroy', { id: idToDelete }), { onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); fetchArchived(); } });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) fetchArchived(); }}>
                <DialogTrigger asChild><Button variant="outline" className="rounded-xl font-bold"><ArchiveRestore className="mr-2 h-4 w-4" /> Archive</Button></DialogTrigger>
                <DialogContent className="max-w-2xl rounded-xl">
                    <DialogHeader><DialogTitle>Archived Products</DialogTitle></DialogHeader>
                    <div className="relative mb-4"><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                    <div className="max-h-[400px] overflow-auto border rounded-xl">
                        {loading ? <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /></div> : (
                            <table className="w-full text-sm">
                                <thead><tr className="border-b"><td className="p-3">SKU</td><td className="p-3">Name</td><td className="p-3 text-right">Action</td></tr></thead>
                                <tbody>{archived.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-3">{item.sku}</td>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3 text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleRestore(item.id)}><RotateCcw className="h-3 w-3" /></Button>
                                            <Button variant="ghost" size="sm" onClick={() => { setIdToDelete(item.id); setDeleteDialogOpen(true); }}><Trash2 className="h-3 w-3" /></Button>
                                        </td>
                                    </tr>
                                ))}</tbody>
                            </table>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={handlePermanentDelete} title="Permanent Delete" />
        </>
    );
}

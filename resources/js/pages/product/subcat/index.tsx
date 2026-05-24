"use client"

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, ListTree, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SubCatForm from './components/subCatForm';
import { ImportSubCat } from './components/importSubCat';
import { ArchivedSubCat } from './components/archivedSubCat';
import { SubCatTable } from './components/subCatTable';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { ConfirmDialog } from '@/components/global/confirm-dialog';

interface SubCategory {
    id: number;
    cat_id: number;
    name: string;
    slug: string;
    category: { name: string };
    created_at: string;
}

export default function SubCategoryIndex({ subCategories }: { subCategories: SubCategory[] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const confirmDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('subCat.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); },
            onError: () => hideLoading(tid)
        });
    };

    const confirmBulkDelete = () => {
        const tid = showLoading("Deleting...");
        router.post(route('subCat.bulkDestroy'), { ids: selectedIds }, {
            onSuccess: () => { hideLoading(tid); setBulkDeleteDialogOpen(false); setSelectedIds([]); },
            onError: () => hideLoading(tid)
        });
    };

    return (
        <>
            <Head title="Sub-Category Listing" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary"><ListTree className="h-5 w-5" /></div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Sub-Category Listing</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}><Trash className="mr-2 h-4 w-4" /> Delete ({selectedIds.length})</Button>
                        )}
                        <ArchivedSubCat />
                        <ImportSubCat subCategories={subCategories} />
                        <Button size="sm" onClick={() => { setSelectedSub(null); setOpen(true); }} className="rounded-xl font-bold"><Plus className="mr-2 h-4 w-4" /> Add Sub-Category</Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedSub ? 'Edit' : 'Add'} Sub-Category</DialogTitle></DialogHeader>
                        <SubCatForm subCategory={selectedSub} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <SubCatTable
                        subCategories={subCategories}
                        onEdit={(d: SubCategory) => { setSelectedSub(d); setOpen(true); }}
                        onDelete={(id: number) => { setIdToDelete(id); setDeleteDialogOpen(true); }}
                        onSelectionChange={setSelectedIds}
                        onExportExcel={() => {}}
                        onExportPDF={() => {}}
                    />
                </div>
            </div>

            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
            <ConfirmDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen} onConfirm={confirmBulkDelete} title={`Delete ${selectedIds.length} Sub-Categories`} />
        </>
    );
}

SubCategoryIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Setup', href: '#' }, { title: 'Sub-Categories', href: '/subCat' }]}>
        {page}
    </AppLayout>
);

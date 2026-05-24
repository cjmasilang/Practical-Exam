"use client"

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, ListTree, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CatForm from './components/catForm';
import { ImportCat } from './components/importCat';
import { ArchivedCat } from './components/archivedCat';
import { CatTable } from './components/catTable';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { ConfirmDialog } from '@/components/global/confirm-dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

export default function CategoryIndex({ categories }: { categories: Category[] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const confirmDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('categories.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); },
            onError: () => hideLoading(tid)
        });
    };

    const confirmBulkDelete = () => {
        const tid = showLoading("Deleting selected...");
        router.post(route('categories.bulkDestroy'), { ids: selectedIds }, {
            onSuccess: () => { hideLoading(tid); setBulkDeleteDialogOpen(false); setSelectedIds([]); },
            onError: () => hideLoading(tid)
        });
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(categories);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Categories");
        XLSX.writeFile(wb, "categories.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Slug', 'Created']],
            body: categories.map(d => [d.name, d.slug, d.created_at]),
        });
        doc.save("categories.pdf");
    };

    return (
        <>
            <Head title="Category Listing" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <ListTree className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Category Listing</h2>
                            <p className="text-sm text-muted-foreground">Manage product categories</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
                                <Trash className="mr-2 h-4 w-4" /> Delete ({selectedIds.length})
                            </Button>
                        )}
                        <ArchivedCat />
                        <ImportCat categories={categories} />
                        <Button size="sm" onClick={() => { setSelectedCategory(null); setOpen(true); }} className="rounded-xl font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedCategory ? 'Edit' : 'Add'} Category</DialogTitle></DialogHeader>
                        <CatForm category={selectedCategory} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <CatTable
                        categories={categories}
                        onEdit={(d) => { setSelectedCategory(d); setOpen(true); }}
                        onDelete={(id) => { setIdToDelete(id); setDeleteDialogOpen(true); }}
                        onSelectionChange={setSelectedIds}
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>

            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
            <ConfirmDialog
                open={bulkDeleteDialogOpen}
                onOpenChange={setBulkDeleteDialogOpen}
                onConfirm={confirmBulkDelete}
                title={`Delete ${selectedIds.length} Categories`}
            />
        </>
    );
}

CategoryIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Setup', href: '#' }, { title: 'Categories', href: '/categories' }]}>
        {page}
    </AppLayout>
);

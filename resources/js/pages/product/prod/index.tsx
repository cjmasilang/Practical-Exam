"use client"

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Package, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProdForm from './components/prodForm';
import { ImportProd } from './components/importProd';
import { ArchivedProd } from './components/archivedProd';
import { ProdTable } from './components/prodTable';
import { route } from "ziggy-js";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { ConfirmDialog } from '@/components/global/confirm-dialog';

interface Product {
    id: number;
    cat_id: number;
    subcat_id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock_quantity: number;
    sku: string;
    category: { name: string };
    sub_category: { name: string };
    created_at: string;
}

export default function ProductIndex({ products }: { products: Product[] }) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const confirmDelete = () => {
        if (!idToDelete) return;
        const tid = showLoading("Deleting...");
        router.delete(route('products.destroy', { id: idToDelete }), {
            onSuccess: () => { hideLoading(tid); setDeleteDialogOpen(false); },
            onError: () => hideLoading(tid)
        });
    };

    const confirmBulkDelete = () => {
        const tid = showLoading("Deleting selected...");
        router.post(route('products.bulkDestroy'), { ids: selectedIds }, {
            onSuccess: () => { hideLoading(tid); setBulkDeleteDialogOpen(false); setSelectedIds([]); },
            onError: () => hideLoading(tid)
        });
    };

    return (
        <>
            <Head title="Product Listing" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary"><Package className="h-5 w-5" /></div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Product Listing</h2>
                            <p className="text-sm text-muted-foreground">Manage your product inventory</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)} className="rounded-xl font-bold">
                                <Trash className="mr-2 h-4 w-4" /> Delete ({selectedIds.length})
                            </Button>
                        )}
                        <ArchivedProd />
                        <ImportProd />
                        <Button size="sm" onClick={() => { setSelectedProduct(null); setOpen(true); }} className="rounded-xl font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader><DialogTitle>{selectedProduct ? 'Edit' : 'Add'} Product</DialogTitle></DialogHeader>
                        <ProdForm product={selectedProduct} onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <ProdTable
                        products={products}
                        onEdit={(p: Product) => { setSelectedProduct(p); setOpen(true); }}
                        onDelete={(id: number) => { setIdToDelete(id); setDeleteDialogOpen(true); }}
                        onSelectionChange={setSelectedIds}
                        onExportExcel={() => {}}
                        onExportPDF={() => {}}
                    />
                </div>
            </div>
            <ConfirmDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
            <ConfirmDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen} onConfirm={confirmBulkDelete} title={`Delete ${selectedIds.length} Products`} />
        </>
    );
}

ProductIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Management', href: '#' }, { title: 'Products', href: '/products' }]}>{page}</AppLayout>
);

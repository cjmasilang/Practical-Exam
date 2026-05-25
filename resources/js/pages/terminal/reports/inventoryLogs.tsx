"use client";

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PackageSearch } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function InventoryLogsIndex({ products = [] }: { products?: any[] }) {
    const columns: ColumnDef<any>[] = [
        { accessorKey: "sku", header: "SKU" },
        { accessorKey: "name", header: "Product" },
        { accessorKey: "category.name", header: "Category", cell: ({ row }) => row.original.category?.name || 'N/A' },
        { accessorKey: "stock_quantity", header: "Stock Level" },
        { accessorKey: "price", header: "Price", cell: ({ row }) => `₱${Number(row.original.price).toFixed(2)}` },
    ];

    const handleExportExcel = () => {
        const data = products.map(p => ({
            "SKU": p.sku,
            "Product": p.name,
            "Category": p.category?.name || 'N/A',
            "Stock": p.stock_quantity,
            "Price": p.price
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventory");
        XLSX.writeFile(wb, "inventory_logs.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['SKU', 'Product', 'Category', 'Stock', 'Price']],
            body: products.map(p => [p.sku, p.name, p.category?.name || 'N/A', p.stock_quantity, p.price]),
        });
        doc.save("inventory_logs.pdf");
    };

    return (
        <>
            <Head title="Inventory Logs" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <PackageSearch className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Inventory Logs</h2>
                            <p className="text-sm text-muted-foreground">Real-time stock monitoring</p>
                        </div>
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <DataTable
                        columns={columns}
                        data={products}
                        searchKey="name"
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
        </>
    );
}

InventoryLogsIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Reports', href: '#' }, { title: 'Inventory Logs', href: '/reports/inventory-logs' }]}>
        {page}
    </AppLayout>
);

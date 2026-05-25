"use client";

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ListTree } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function SalesItemsIndex({ salesItems = [] }: { salesItems?: any[] }) {
    const columns: ColumnDef<any>[] = [
        { accessorKey: "sale_id", header: "Sale ID" },
        { accessorKey: "cat_id", header: "Category ID" },
        { accessorKey: "subcat_id", header: "Subcategory ID" },
        {
            accessorKey: "sale.customer.name",
            header: "Customer",
            cell: ({ row }) => row.original.sale?.customer?.name || 'Guest'
        },
        {
            accessorKey: "product.name",
            header: "Product",
            cell: ({ row }) => row.original.product?.name || 'N/A'
        },
        { accessorKey: "quantity", header: "Qty" },
        {
            accessorKey: "unit_price",
            header: "Unit Price",
            cell: ({ row }) => Number(row.original.unit_price).toFixed(2)
        },
        {
            id: "subtotal",
            header: "Subtotal",
            cell: ({ row }) => (Number(row.original.quantity) * Number(row.original.unit_price)).toFixed(2)
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString()
        },
    ];

    const handleExportExcel = () => {
        const data = salesItems.map(s => ({
            "Sale ID": s.sale_id,
            "Cat ID": s.cat_id,
            "Subcat ID": s.subcat_id,
            "Customer": s.sale?.customer?.name || 'Guest',
            "Product": s.product?.name || 'N/A',
            "Qty": s.quantity,
            "Unit Price": Number(s.unit_price).toFixed(2),
            "Subtotal": (s.quantity * s.unit_price).toFixed(2),
            "Date": new Date(s.created_at).toLocaleDateString()
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SalesItems");
        XLSX.writeFile(wb, "sales_items_breakdown.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Sale ID', 'Cat ID', 'SubID', 'Customer', 'Product', 'Qty', 'Price', 'Total', 'Date']],
            body: salesItems.map(s => [
                s.sale_id,
                s.cat_id,
                s.subcat_id,
                s.sale?.customer?.name || 'Guest',
                s.product?.name || 'N/A',
                s.quantity,
                Number(s.unit_price).toFixed(2),
                (s.quantity * s.unit_price).toFixed(2),
                new Date(s.created_at).toLocaleDateString()
            ]),
        });
        doc.save("sales_items_breakdown.pdf");
    };

    return (
        <>
            <Head title="Sales Items Breakdown" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <ListTree className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Sales Items Breakdown</h2>
                            <p className="text-sm text-muted-foreground">Comprehensive view of all sales line items</p>
                        </div>
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <DataTable
                        columns={columns}
                        data={salesItems}
                        searchKey="sale_id"
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
        </>
    );
}

SalesItemsIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Terminal', href: '#' }, { title: 'Sales Items', href: '/sales-items' }]}>
        {page}
    </AppLayout>
);

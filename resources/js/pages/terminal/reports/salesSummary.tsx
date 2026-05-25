"use client";

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function SalesSummary({ sales, summary, filters }: any) {
    const [dateRange, setDateRange] = useState({ start_date: filters.start_date || '', end_date: filters.end_date || '' });

    const handleFilter = () => {
        router.get('/reports/sales-summary', dateRange, { preserveState: true });
    };

    const columns: ColumnDef<any>[] = [
        { accessorKey: "id", header: "Sale ID" },
        { accessorKey: "customer.name", header: "Customer", cell: ({ row }) => row.original.customer?.name || 'Guest' },
        {
            id: "items",
            header: "Items Sold",
            cell: ({ row }) => row.original.items?.map((i: any) => i.product?.name).join(', ') || 'N/A'
        },
        { accessorKey: "payment_method", header: "Method" },
        { accessorKey: "total_amount", header: "Amount", cell: ({ row }) => `₱${Number(row.original.total_amount).toFixed(2)}` },
        { accessorKey: "created_at", header: "Date", cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString() },
    ];

    const handleExportExcel = () => {
        const data = sales.map((s: any) => ({
            "Sale ID": s.id,
            "Customer": s.customer?.name || 'Guest',
            "Items": s.items?.map((i: any) => i.product?.name).join(', '),
            "Method": s.payment_method,
            "Amount": Number(s.total_amount).toFixed(2),
            "Date": new Date(s.created_at).toLocaleDateString()
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SalesSummary");
        XLSX.writeFile(wb, "sales_summary.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['ID', 'Customer', 'Items', 'Method', 'Amount', 'Date']],
            body: sales.map((s: any) => [
                s.id,
                s.customer?.name || 'Guest',
                s.items?.map((i: any) => i.product?.name).join(', '),
                s.payment_method,
                Number(s.total_amount).toFixed(2),
                new Date(s.created_at).toLocaleDateString()
            ]),
        });
        doc.save("sales_summary.pdf");
    };

    return (
        <>
            <Head title="Sales Summary" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card><CardHeader><CardTitle>Total Sales</CardTitle></CardHeader><CardContent className="text-2xl font-bold">₱{Number(summary.total_sales).toFixed(2)}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Transactions</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{summary.transaction_count}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Total Qty Sold</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{summary.total_items_sold}</CardContent></Card>
                </div>

                <div className="flex gap-2 bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                    <input type="date" aria-label="Start Date" className="bg-black border border-zinc-800 rounded p-2 text-sm" value={dateRange.start_date} onChange={(e) => setDateRange({...dateRange, start_date: e.target.value})} />
                    <input type="date" aria-label="End Date" className="bg-black border border-zinc-800 rounded p-2 text-sm" value={dateRange.end_date} onChange={(e) => setDateRange({...dateRange, end_date: e.target.value})} />
                    <Button onClick={handleFilter}>Apply Filter</Button>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <DataTable
                        columns={columns}
                        data={sales}
                        searchKey="id"
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
        </>
    );
}

SalesSummary.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Reports', href: '#' }, { title: 'Sales Summary', href: '/reports/sales-summary' }]}>
        {page}
    </AppLayout>
);

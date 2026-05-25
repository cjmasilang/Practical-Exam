"use client";

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function CustomerIndex({ customers = [] }: { customers?: any[] }) {
    const columns: ColumnDef<any>[] = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phone", header: "Phone" },
        { accessorKey: "created_at", header: "Joined", cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString() },
    ];

    const handleExportExcel = () => {
        const data = customers.map(c => ({
            "Name": c.name,
            "Email": c.email,
            "Phone": c.phone,
            "Joined": new Date(c.created_at).toLocaleDateString()
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Customers");
        XLSX.writeFile(wb, "customers_list.xlsx");
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Email', 'Phone', 'Joined']],
            body: customers.map(c => [c.name, c.email || 'N/A', c.phone || 'N/A', new Date(c.created_at).toLocaleDateString()]),
        });
        doc.save("customers_list.pdf");
    };

    return (
        <>
            <Head title="Customer Management" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Customer Directory</h2>
                            <p className="text-sm text-muted-foreground">Manage and track your registered customers</p>
                        </div>
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <DataTable
                        columns={columns}
                        data={customers}
                        searchKey="name"
                        onExportExcel={handleExportExcel}
                        onExportPDF={handleExportPDF}
                    />
                </div>
            </div>
        </>
    );
}

CustomerIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'People', href: '#' }, { title: 'Customers', href: '/customers' }]}>
        {page}
    </AppLayout>
);

"use client";

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

export default function SalesIndex({ sales = [] }: { sales?: any[] }) {
    const columns: ColumnDef<any>[] = [
        { accessorKey: "id", header: "Sale ID" },
        { 
            accessorKey: "customer.name", 
            header: "Customer",
            cell: ({ row }) => row.original.customer?.name || 'Guest'
        },
        { 
            accessorKey: "total_amount", 
            header: "Total Amount",
            cell: ({ row }) => `₱${Number(row.original.total_amount).toFixed(2)}`
        },
        { accessorKey: "payment_method", header: "Payment Method" },
        { 
            accessorKey: "created_at", 
            header: "Date",
            cell: ({ row }) => new Date(row.original.created_at).toLocaleString()
        },
    ];

    return (
        <>
            <Head title="Sales Records" />
            <div className="flex h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Sales Records</h2>
                            <p className="text-sm text-muted-foreground">List of all completed transactions</p>
                        </div>
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background">
                    <DataTable
                        columns={columns}
                        data={sales}
                        searchKey="id"
                    />
                </div>
            </div>
        </>
    );
}

SalesIndex.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Terminal', href: '#' }, { title: 'Sales', href: '/sales' }]}>
        {page}
    </AppLayout>
);
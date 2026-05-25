"use client";

import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Download, Printer, Package, Users } from 'lucide-react';
import * as XLSX from 'xlsx';
import domtoimage from 'dom-to-image';

export default function Dashboard({ metrics, chartData }: { metrics: any, chartData: any[] }) {
    const lineChartRef = useRef<HTMLDivElement>(null);
    const barChartRef = useRef<HTMLDivElement>(null);

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(chartData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SalesData");
        XLSX.writeFile(wb, "sales_report.xlsx");
    };

    const handleDownloadChart = (ref: React.RefObject<HTMLDivElement>, name: string) => {
        if (ref.current) {
            domtoimage.toPng(ref.current)
                .then((dataUrl: string) => {
                    const link = document.createElement('a');
                    link.download = `${name}.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((error: any) => console.error('Error:', error));
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={handleExportExcel}>
                        <Download className="mr-2 h-4 w-4" /> Export Excel
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Sales</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">₱{metrics.total_sales}</div></CardContent></Card>
                    <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Today's Sales</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">₱{metrics.today_sales}</div></CardContent></Card>
                    <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Orders</CardTitle><ShoppingCart className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{metrics.total_orders}</div></CardContent></Card>
                    <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Products</CardTitle><Package className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{metrics.total_products}</div></CardContent></Card>
                    <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Customers</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{metrics.total_customers}</div></CardContent></Card>
                </div>

                <div className="grid gap-6 md:grid-cols-1">
                    <Card className="p-6 h-[400px]" ref={lineChartRef}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Sales Trend</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadChart(lineChartRef, 'sales_trend')}><Download className="h-4 w-4" /></Button>
                        </div>
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="p-6 h-[400px]" ref={barChartRef}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Sales Distribution</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadChart(barChartRef, 'sales_dist')}><Download className="h-4 w-4" /></Button>
                        </div>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Bar dataKey="total" fill="#2563eb" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
        {page}
    </AppLayout>
);

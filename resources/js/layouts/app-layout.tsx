import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import { Toaster } from 'sonner';
import { ToastHandler } from '@/components/loading/toast-handler';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <ToastHandler />
            <Toaster richColors closeButton position="top-right" />
            {children}
        </AppLayoutTemplate>
    );
}

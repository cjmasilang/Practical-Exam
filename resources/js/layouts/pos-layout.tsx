import { Toaster } from 'sonner';

export default function PosLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full bg-slate-950 text-slate-100 antialiased font-sans overflow-hidden">
            <Toaster position="top-right" theme="dark" />
            {children}
        </div>
    );
}

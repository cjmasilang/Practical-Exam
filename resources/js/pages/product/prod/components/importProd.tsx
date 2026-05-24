"use client"

import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { route } from "ziggy-js"
import { UploadCloud } from "lucide-react"
import { ImportValidation } from "@/components/global/import-validation"
import { showLoading, hideLoading } from "@/components/loading/toast-loading"

export function ImportProd({ onSuccess }: any) {
    const { errors: serverErrors } = usePage().props as any;
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [importing, setImporting] = useState(false);

    async function handleImport() {
        if (!file) return;
        setImporting(true);
        const tid = showLoading("Processing import...");
        router.post(route("products.import"), { file }, {
            forceFormData: true,
            onSuccess: () => { hideLoading(tid); setOpen(false); setFile(null); if (onSuccess) onSuccess(); },
            onError: () => hideLoading(tid),
            onFinish: () => setImporting(false)
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm" variant="outline" className="rounded-xl"><UploadCloud className="mr-2 h-4 w-4" /> Import</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Import Products</DialogTitle></DialogHeader>
                <div className="space-y-4">
                    <ImportValidation errors={serverErrors?.import || []} />
                    <Input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <Button onClick={handleImport} disabled={!file || importing} className="w-full">{importing ? "Processing..." : "Process Import"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { route } from "ziggy-js"
import { FileSpreadsheet, Download, UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImportValidation } from "@/components/global/import-validation"
import { showLoading, hideLoading } from "@/components/loading/toast-loading"
import { isDuplicate } from "@/components/global/validation-helper"

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ImportCatProps {
    categories: Category[];
    onSuccess?: () => void;
}

export function ImportCat({ categories = [], onSuccess }: ImportCatProps) {
    const { errors: serverErrors } = usePage().props as any
    const [file, setFile] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [importing, setImporting] = useState(false)
    const [localErrors, setLocalErrors] = useState<string[]>([])

    const validateFile = async (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
                if (lines.length <= 1) {
                    setLocalErrors(["File is empty or missing data rows."]);
                    resolve(false);
                    return;
                }
                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                const nameIndex = headers.indexOf('name');
                if (nameIndex === -1) {
                    setLocalErrors(["Invalid format: Missing 'name' header."]);
                    resolve(false);
                    return;
                }
                const errors: string[] = [];
                const seenInFile = new Set();
                lines.slice(1).forEach((line, index) => {
                    const columns = line.split(',');
                    const name = columns[nameIndex]?.trim();
                    if (!name) {
                        errors.push(`Row ${index + 2}: Name is required.`);
                    } else if (isDuplicate(categories, 'name', name)) {
                        errors.push(`Row ${index + 2}: Category "${name}" already exists.`);
                    } else if (seenInFile.has(name.toLowerCase())) {
                        errors.push(`Row ${index + 2}: Duplicate name "${name}" in file.`);
                    }
                    seenInFile.add(name.toLowerCase());
                });
                if (errors.length > 0) { setLocalErrors(errors); resolve(false); } else { setLocalErrors([]); resolve(true); }
            };
            reader.readAsText(file);
        });
    };

    async function handleImport() {
        if (!file) return;
        const isValid = await validateFile(file);
        if (!isValid) return;
        setImporting(true);
        const toastId = showLoading("Processing import...");
        router.post(route("categories.import"), { file }, {
            forceFormData: true,
            onSuccess: () => { hideLoading(toastId); setOpen(false); setFile(null); if (onSuccess) onSuccess(); },
            onError: () => hideLoading(toastId),
            onFinish: () => setImporting(false)
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm" variant="outline" className="h-9 rounded-xl"><UploadCloud className="mr-2 h-4 w-4" /> Import</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[450px] rounded-xl">
                <DialogHeader><DialogTitle>Import Categories</DialogTitle><DialogDescription>Upload your CSV file.</DialogDescription></DialogHeader>
                <div className="mt-4 space-y-4">
                    <ImportValidation errors={[...localErrors, ...(serverErrors?.import ? Object.values(serverErrors.import) as string[] : [])]} />
                    <Input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <Button onClick={handleImport} disabled={!file || importing} className="w-full">{importing ? "Processing..." : "Process Import"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

"use client";

import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { route } from "ziggy-js";
import { UploadCloud } from "lucide-react";
import { showLoading, hideLoading } from "@/components/loading/toast-loading";

export function ImportRole() {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    const handleImport = () => {
        if (!file) return;
        const tid = showLoading("Importing...");
        router.post(route("roles.import"), { file }, {
            forceFormData: true,
            onSuccess: () => { hideLoading(tid); setOpen(false); }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="outline"><UploadCloud className="mr-2 h-4 w-4" /> Import</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Import Roles</DialogTitle></DialogHeader>
                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <Button onClick={handleImport}>Process Import</Button>
            </DialogContent>
        </Dialog>
    );
}

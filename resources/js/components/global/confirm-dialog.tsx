"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    variant?: "destructive" | "default";
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone and will permanently remove the data.",
    cancelText = "Cancel",
    confirmText = "Continue & Delete",
    variant = "destructive"
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">{cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={variant === "destructive" ? "bg-red-600 hover:bg-red-700 text-white rounded-lg" : "rounded-lg"}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

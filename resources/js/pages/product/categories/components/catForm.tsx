"use client"

import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { route } from "ziggy-js";

interface Category {
    id: number;
    name: string;
}

interface CatFormProps {
    category?: Category | null;
    onSuccess: () => void;
}

export default function CatForm({ category, onSuccess }: CatFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = showLoading(category ? "Updating..." : "Adding...");

        const options = {
            onSuccess: () => { hideLoading(toastId); onSuccess(); },
            onError: () => hideLoading(toastId)
        };

        if (category) {
            put(route('categories.update', { id: category.id }), options);
        } else {
            post(route('categories.store'), options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Enter name" />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={processing} className="rounded-xl font-bold">{category ? 'Update' : 'Save'}</Button>
            </div>
        </form>
    );
}

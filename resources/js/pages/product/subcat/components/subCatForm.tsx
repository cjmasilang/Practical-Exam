"use client"

import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { route } from "ziggy-js";

interface SubCategory {
    id: number;
    cat_id: number;
    name: string;
}

interface SubCatFormProps {
    subCategory?: SubCategory | null;
    onSuccess: () => void;
}

export default function SubCatForm({ subCategory, onSuccess }: SubCatFormProps) {
    const { categories = [] } = usePage<any>().props;
    const { data, setData, post, put, processing, errors } = useForm({
        cat_id: subCategory?.cat_id || '',
        name: subCategory?.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = showLoading(subCategory ? "Updating sub-category..." : "Adding sub-category...");

        const options = {
            onSuccess: () => {
                hideLoading(toastId);
                onSuccess();
            },
            onError: () => {
                hideLoading(toastId);
            },
            onFinish: () => {
                hideLoading(toastId);
            }
        };

        if (subCategory) {
            put(route('subCat.update', { id: subCategory.id }), options);
        } else {
            post(route('subCat.store'), options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cat_id">Parent Category</Label>
                <Select
                    value={String(data.cat_id)}
                    onValueChange={(v) => setData('cat_id', Number(v))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories && categories.length > 0 ? (
                            categories.map((c: any) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="0" disabled>No categories available</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.cat_id && <p className="text-xs text-red-500">{errors.cat_id}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Sub-Category Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter sub-category name"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={processing} className="rounded-xl font-bold">
                    {subCategory ? 'Update' : 'Save'} Category
                </Button>
            </div>
        </form>
    );
}

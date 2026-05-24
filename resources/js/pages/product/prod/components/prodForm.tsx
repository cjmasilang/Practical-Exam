"use client"

import { useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { route } from "ziggy-js";

export default function ProdForm({ product, onSuccess }: any) {
    const { categories = [], allSubCategories = [] } = usePage<any>().props;

    const { data, setData, post, put, processing, errors } = useForm({
        cat_id: product?.cat_id || '',
        subcat_id: product?.subcat_id || '',
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock_quantity: product?.stock_quantity || '',
        sku: product?.sku || '',
    });

    const filteredSubCategories = useMemo(() => {
        return allSubCategories.filter((s: any) => s.cat_id === Number(data.cat_id));
    }, [data.cat_id, allSubCategories]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tid = showLoading(product ? "Updating product..." : "Adding product...");
        const options = {
            onSuccess: () => { hideLoading(tid); onSuccess(); },
            onError: () => { hideLoading(tid); }
        };
        product ? put(route('products.update', { id: product.id }), options) : post(route('products.store'), options);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                        value={String(data.cat_id)}
                        onValueChange={(v) => {
                            setData('cat_id', Number(v));
                            setData('subcat_id', '');
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c: any) => (
                                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Sub-Category</Label>
                    <Select
                        disabled={!data.cat_id}
                        value={String(data.subcat_id)}
                        onValueChange={(v) => setData('subcat_id', Number(v))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={data.cat_id ? "Select sub-category" : "Select category first"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredSubCategories.map((s: any) => (
                                <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter product name"
                />
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Enter product description"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                        value={data.sku}
                        onChange={(e) => setData('sku', e.target.value)}
                        placeholder="SKU-001"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value))}
                        placeholder="0.00"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input
                        type="number"
                        value={data.stock_quantity}
                        onChange={(e) => setData('stock_quantity', Number(e.target.value))}
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={processing} className="rounded-xl font-bold">
                    {product ? 'Update' : 'Save'} Product
                </Button>
            </div>
        </form>
    );
}

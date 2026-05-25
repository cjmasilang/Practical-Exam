"use client";

import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { route } from "ziggy-js";

export function RoleForm({ role, permissions, onSuccess }: any) {
    const { data, setData, post, put, processing } = useForm({
        name: role?.name || '',
        permissions: role?.permissions.map((p: any) => p.name) || []
    });

    const togglePermission = (pName: string) => {
        setData('permissions', data.permissions.includes(pName)
            ? data.permissions.filter((p: string) => p !== pName)
            : [...data.permissions, pName]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tid = showLoading(role ? "Updating..." : "Creating...");
        const options = { onSuccess: () => { hideLoading(tid); onSuccess(); }, onError: () => hideLoading(tid) };
        if (role) put(route('roles.update', role.id), options);
        else post(route('roles.store'), options);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Role Name</Label>
                <Input value={data.name} onChange={e => setData('name', e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 h-60 overflow-y-auto border p-2 rounded-xl">
                    {permissions.map((p: any) => (
                        <div key={p.id} className="flex items-center space-x-2">
                            <Checkbox checked={data.permissions.includes(p.name)} onCheckedChange={() => togglePermission(p.name)} />
                            <Label>{p.name}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button disabled={processing} className="w-full">Save Role</Button>
        </form>
    );
}

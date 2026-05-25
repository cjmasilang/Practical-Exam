"use client";

import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { showLoading, hideLoading } from "@/components/loading/toast-loading";
import { route } from "ziggy-js";

export function UserForm({ user, roles, onSuccess }: any) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        roles: user?.roles.map((r: any) => r.name) || []
    });

    const toggleRole = (roleName: string) => {
        const newRoles = data.roles.includes(roleName)
            ? data.roles.filter((r: string) => r !== roleName)
            : [...data.roles, roleName];
        setData('roles', newRoles);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tid = showLoading(user ? "Updating..." : "Creating...");
        const options = {
            onSuccess: () => { hideLoading(tid); onSuccess(); },
            onError: () => hideLoading(tid)
        };

        if (user) put(route('users.update', user.id), options);
        else post(route('users.store'), options);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Name</Label>
                <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <Label>Password {user && '(Leave blank to keep current)'}</Label>
                <Input type="password" onChange={e => setData('password', e.target.value)} />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
                <Label>Roles</Label>
                <div className="grid grid-cols-2 gap-2">
                    {roles.map((role: any) => (
                        <div key={role.id} className="flex items-center space-x-2">
                            <Checkbox
                                checked={data.roles.includes(role.name)}
                                onCheckedChange={() => toggleRole(role.name)}
                            />
                            <Label>{role.name}</Label>
                        </div>
                    ))}
                </div>
                {errors.roles && <p className="text-xs text-red-500">{errors.roles}</p>}
            </div>

            <Button disabled={processing} className="w-full">
                {user ? 'Update User' : 'Create User'}
            </Button>
        </form>
    );
}

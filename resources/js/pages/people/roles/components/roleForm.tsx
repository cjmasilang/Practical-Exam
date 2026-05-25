import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { route } from "ziggy-js";

export function RoleForm({ role, permissions, onSuccess }: any) {
    const { data, setData, post, put, processing } = useForm({
        name: role?.name || '',
        permissions: role?.permissions.map((p: any) => p.name) || []
    });

    const groupedPermissions = permissions.reduce((acc: any, p: any) => {
        const module = p.name.split('_')[1] || 'general';
        if (!acc[module]) acc[module] = [];
        acc[module].push(p);
        return acc;
    }, {});

    const toggleModule = (module: string, checked: boolean) => {
        const modulePerms = groupedPermissions[module].map((p: any) => p.name);
        const newPerms = checked
            ? [...new Set([...data.permissions, ...modulePerms])]
            : data.permissions.filter((p: string) => !modulePerms.includes(p));
        setData('permissions', newPerms);
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); role ? put(route('roles.update', role.id), { onSuccess }) : post(route('roles.store'), { onSuccess }); }} className="space-y-6">
            <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Role Name" />

            <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([module, perms]: any) => (
                    <div key={module} className="border p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs">
                            <Checkbox onCheckedChange={(c) => toggleModule(module, !!c)} /> {module}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {perms.map((p: any) => (
                                <div key={p.id} className="flex items-center gap-1 text-sm">
                                    <Checkbox checked={data.permissions.includes(p.name)} onCheckedChange={() => {
                                        const newP = data.permissions.includes(p.name) ? data.permissions.filter((i: string) => i !== p.name) : [...data.permissions, p.name];
                                        setData('permissions', newP);
                                    }} /> {p.name.split('_')[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Button disabled={processing} className="w-full">Save Role</Button>
        </form>
    );
}

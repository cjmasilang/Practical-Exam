<?php

namespace App\Services\People;

use Spatie\Permission\Models\Role;

class RoleServices
{
    public function getAll()
    {
        return Role::with('permissions')->latest()->get();
    }

    public function create(array $data)
    {
        $role = Role::create(['name' => $data['name']]);
        $role->syncPermissions($data['permissions']);
        return $role;
    }

    public function update(int $id, array $data)
    {
        $role = Role::findOrFail($id);
        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissions']);
        return $role;
    }

    public function delete(int $id)
    {
        return Role::findOrFail($id)->delete();
    }

    public function bulkDestroy(array $ids)
    {
        return Role::whereIn('id', $ids)->delete();
    }

    public function restore(int $id)
    {
        return Role::onlyTrashed()->findOrFail($id)->restore();
    }

    public function import(array $data)
    {
        return Role::insert($data);
    }
}

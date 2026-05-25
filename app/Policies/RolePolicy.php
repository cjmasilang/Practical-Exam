<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    public function viewAny(User $user)
    {
        return $user->hasPermissionTo('view_roles');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create_roles');
    }

    public function update(User $user, Role $role)
    {
        return $user->hasPermissionTo('edit_roles');
    }

    public function delete(User $user, Role $role)
    {
        return $user->hasPermissionTo('delete_roles');
    }
}

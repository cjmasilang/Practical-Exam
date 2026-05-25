<?php

namespace App\Services\People;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserServices
{
    public function getAll()
    {
        return User::with('roles')->latest()->get();
    }

    public function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        $user->syncRoles($data['roles']);
        return $user;
    }

    public function update(int $id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
            $user->save();
        }
        $user->syncRoles($data['roles']);
        return $user;
    }

    public function delete(int $id)
    {
        return User::findOrFail($id)->delete();
    }

    public function bulkDestroy(array $ids)
    {
        return User::whereIn('id', $ids)->delete();
    }

    public function restore(int $id)
    {
        return User::onlyTrashed()->findOrFail($id)->restore();
    }


     public function import(array $data)
    {
        return User::insert($data);
    }
}

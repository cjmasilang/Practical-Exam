<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Http\Requests\People\RoleBasedRequest;
use App\Services\People\RoleServices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleBasedController extends Controller
{
    protected $roleServices;

    public function __construct(RoleServices $roleServices)
    {
        $this->roleServices = $roleServices;
    }

    public function index()
    {
        $this->authorize('viewAny', Role::class);
        return Inertia::render('people/roles/index', [
            'roles' => Role::with('permissions')->latest()->get(),
            'permissions' => Permission::all()
        ]);
    }

    public function store(RoleBasedRequest $request)
    {
        $this->authorize('create', Role::class);
        $this->roleServices->create($request->validated());
        return redirect()->back()->with('message', 'Role created successfully.');
    }

    public function update(RoleBasedRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $this->authorize('update', $role);
        $this->roleServices->update((int)$id, $request->validated());
        return redirect()->back()->with('message', 'Role updated successfully.');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $this->authorize('delete', $role);
        $this->roleServices->delete((int)$id);
        return redirect()->back()->with('message', 'Role deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->authorize('delete', Role::class);
        $this->roleServices->bulkDestroy($request->ids);
        return redirect()->back()->with('message', 'Selected roles deleted.');
    }

    public function archived()
    {
        $this->authorize('viewAny', Role::class);
        return response()->json(Role::onlyTrashed()->latest()->get());
    }

    public function restore($id)
    {
        $role = Role::onlyTrashed()->findOrFail($id);
        $this->authorize('update', $role);
        $this->roleServices->restore((int)$id);
        return redirect()->back()->with('message', 'Role restored successfully.');
    }
}

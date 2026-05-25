<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Http\Requests\People\UserRequest;
use App\Models\User;
use App\Services\People\UserServices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    protected $userServices;

    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    public function index()
    {
        return Inertia::render('people/users/index', [
            'users' => $this->userServices->getAll(),
            'roles' => Role::all()
        ]);
    }

    public function store(UserRequest $request)
    {
        $this->userServices->create($request->validated());
        return redirect()->back()->with('message', 'User created successfully.');
    }

    public function update(UserRequest $request, $id)
    {
        $this->userServices->update((int)$id, $request->validated());
        return redirect()->back()->with('message', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $this->userServices->delete((int)$id);
        return redirect()->back()->with('message', 'User deleted successfully.');
    }

    public function import(Request $request)
    {
        $this->userServices->import($request->all());
        return redirect()->back()->with('message', 'Users imported successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->userServices->bulkDestroy($request->ids);
        return redirect()->back()->with('message', 'Selected users deleted.');
    }

    public function archived()
    {
        return response()->json(User::onlyTrashed()->latest()->get());
    }

    public function restore($id)
    {
        $this->userServices->restore((int)$id);
        return redirect()->back()->with('message', 'User restored successfully.');
    }
}

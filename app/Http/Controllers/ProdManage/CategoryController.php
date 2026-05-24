<?php

namespace App\Http\Controllers\ProdManage;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdManage\CatRequest;
use App\Models\TblCat;
use App\Services\ProdManage\CatServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $catServices;

    public function __construct(CatServices $catServices)
    {
        $this->catServices = $catServices;
    }

    public function index()
    {
        return Inertia::render('product/categories/index', [
            'categories' => $this->catServices->getAll()
        ]);
    }

    public function store(CatRequest $request)
    {
        $this->catServices->create($request->validated());
        return redirect()->back()->with('message', 'Category created successfully.');
    }

    public function update(CatRequest $request, $id)
    {
        $this->catServices->update((int)$id, $request->validated());
        return redirect()->back()->with('message', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $this->catServices->delete((int)$id);
        return redirect()->back()->with('message', 'Category deleted successfully.');
    }

    public function import(Request $request)
    {
        $this->catServices->import($request->all());
        return redirect()->back()->with('message', 'Categories imported successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->catServices->bulkDestroy($request->ids);
        return redirect()->back()->with('message', 'Selected categories deleted.');
    }

    public function archived()
    {
        return response()->json(TblCat::onlyTrashed()->latest()->get());
    }


    public function restore($id)
    {
        $this->catServices->restore((int)$id);
        return redirect()->back()->with('message', 'Category restored successfully.');
    }
}

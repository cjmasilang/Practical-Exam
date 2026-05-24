<?php

namespace App\Http\Controllers\ProdManage;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdManage\SubCatRequest;
use App\Models\TblCat;
use App\Models\TblSubCat;
use App\Services\ProdManage\SubCatServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubCatController extends Controller
{
    protected $service;

    public function __construct(SubCatServices $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('product/subcat/index', [
            'subCategories' => $this->service->getAll(),
            'categories' => TblCat::all()
        ]);
    }

    public function store(SubCatRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->back()->with('message', 'Sub-category created successfully.');
    }

    public function update(SubCatRequest $request, $id)
    {
        $this->service->update((int)$id, $request->validated());
        return redirect()->back()->with('message', 'Sub-category updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->delete((int)$id);
        return redirect()->back()->with('message', 'Sub-category deleted successfully.');
    }

    public function import(Request $request)
    {
        $this->service->import($request->all());
        return redirect()->back()->with('message', 'Sub-categories imported successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->service->bulkDestroy($request->ids);
        return redirect()->back()->with('message', 'Sub-categories deleted successfully.');
    }

    public function archived()
    {
        return response()->json(TblSubCat::onlyTrashed()->latest()->get());
    }

    public function restore($id)
    {
        $this->service->restore((int)$id);
        return redirect()->back()->with('message', 'Sub-category restored successfully.');
    }
}

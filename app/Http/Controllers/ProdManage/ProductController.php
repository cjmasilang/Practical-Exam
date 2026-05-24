<?php

namespace App\Http\Controllers\ProdManage;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdManage\ProdRequest;
use App\Models\TblCat;
use App\Models\TblProduct;
use App\Models\TblSubCat;
use App\Services\ProdManage\ProdServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $service;

    public function __construct(ProdServices $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('product/prod/index', [
            'products' => $this->service->getAll(),
            'categories' => TblCat::all(),
            'allSubCategories' => TblSubCat::all()
        ]);
    }

    public function store(ProdRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->back()->with('message', 'Product created successfully.');
    }

    public function update(ProdRequest $request, $id)
    {
        $this->service->update((int)$id, $request->validated());
        return redirect()->back()->with('message', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->delete((int)$id);
        return redirect()->back()->with('message', 'Product deleted successfully.');
    }

    public function import(Request $request)
    {
        $this->service->import($request->all());
        return redirect()->back()->with('message', 'Products imported successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $this->service->bulkDestroy($request->ids);
        return redirect()->back()->with('message', 'Products deleted successfully.');
    }

    public function archived()
    {
        return response()->json(TblProduct::onlyTrashed()->get());
    }

    public function restore($id)
    {
        $this->service->restore((int)$id);
        return redirect()->back()->with('message', 'Product restored successfully.');
    }
}

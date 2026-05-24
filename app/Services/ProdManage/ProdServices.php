<?php

namespace App\Services\ProdManage;

use App\Models\TblProduct;
use Illuminate\Support\Str;

class ProdServices
{
    public function getAll()
    {
        return TblProduct::with(['category', 'subCategory'])->get();
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return TblProduct::create($data);
    }

    public function update(int $id, array $data)
    {
        $product = TblProduct::findOrFail($id);
        $data['slug'] = Str::slug($data['name']);
        $product->update($data);
        return $product;
    }

    public function delete(int $id)
    {
        return TblProduct::findOrFail($id)->delete();
    }

    public function import(array $data)
    {
        return TblProduct::insert($data);
    }

    public function bulkDestroy(array $ids)
    {
        return TblProduct::whereIn('id', $ids)->delete();
    }

    public function restore(int $id)
    {
        return TblProduct::onlyTrashed()->findOrFail($id)->restore();
    }
}

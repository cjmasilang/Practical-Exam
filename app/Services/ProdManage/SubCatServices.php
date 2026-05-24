<?php

namespace App\Services\ProdManage;

use App\Models\TblSubCat;
use Illuminate\Support\Str;

class SubCatServices
{
    public function getAll()
    {
        return TblSubCat::with('category')->get();
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return TblSubCat::create($data);
    }

    public function update(int $id, array $data)
    {
        $sub = TblSubCat::findOrFail($id);
        $data['slug'] = Str::slug($data['name']);
        $sub->update($data);
        return $sub;
    }

    public function delete(int $id)
    {
        return TblSubCat::findOrFail($id)->delete();
    }

    public function import(array $data)
    {
        return TblSubCat::insert($data);
    }

    public function bulkDestroy(array $ids)
    {
        return TblSubCat::whereIn('id', $ids)->delete();
    }

    public function restore(int $id)
    {
        return TblSubCat::onlyTrashed()->findOrFail($id)->restore();
    }
}

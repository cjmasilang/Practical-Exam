<?php

namespace App\Services\ProdManage;

use App\Models\TblCat;
use Illuminate\Support\Str;

class CatServices
{
    public function getAll()
    {
        return TblCat::all();
    }

    public function create(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return TblCat::create($data);
    }

    public function update(int $id, array $data)
    {
        $category = TblCat::findOrFail($id);
        $data['slug'] = Str::slug($data['name']);
        $category->update($data);
        return $category;
    }

    public function delete(int $id)
    {
        return TblCat::findOrFail($id)->delete();
    }

    public function import(array $data)
    {
        return TblCat::insert($data);
    }

    public function bulkDestroy(array $ids)
    {
        return TblCat::whereIn('id', $ids)->delete();
    }

    public function restore(int $id)
    {
        return TblCat::onlyTrashed()->findOrFail($id)->restore();
    }
}

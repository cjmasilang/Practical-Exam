<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TblSubCat extends Model
{
    use SoftDeletes;

    protected $table = 'tblsubcat';
    protected $fillable = ['cat_id', 'name', 'slug'];

    public function category()
    {
        return $this->belongsTo(TblCat::class, 'cat_id');
    }
}

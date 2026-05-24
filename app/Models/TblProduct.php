<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class TblProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tblproduct';

    protected $fillable = [
        'cat_id',
        'subcat_id',
        'name',
        'slug',
        'description',
        'price',
        'stock_quantity',
        'sku',
        'image_path',
        'is_active'
    ];

    public function category() {
        return $this->belongsTo(TblCat::class, 'cat_id');
    }

    public function subCategory() {
        return $this->belongsTo(TblSubCat::class, 'subcat_id');
    }

    protected static function newFactory()
    {
        return \Database\Factories\TblProductFactory::new();
    }
}

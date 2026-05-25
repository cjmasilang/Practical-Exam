<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblSalesItems extends Model
{
    protected $table = 'tblsalesitems';
    protected $fillable = ['sale_id', 'product_id', 'cat_id', 'subcat_id', 'quantity', 'unit_price'];

    public function product() {
        return $this->belongsTo(TblProduct::class, 'product_id');
    }

    public function sale() {
        return $this->belongsTo(TblSales::class, 'sale_id');
    }
}

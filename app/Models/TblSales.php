<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblSales extends Model
{
    protected $table = 'tblsales';
    protected $fillable = ['customer_id', 'total_amount', 'payment_method'];

    public function customer() {
        return $this->belongsTo(TblCustomer::class, 'customer_id');
    }

    public function items() {
        return $this->hasMany(TblSalesItems::class, 'sale_id');
    }
}

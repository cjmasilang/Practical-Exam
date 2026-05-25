<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblCustomer extends Model
{
    protected $table = 'tblcustomer';
    protected $fillable = ['name', 'email', 'phone'];

    public function sales() {
        return $this->hasMany(TblSales::class, 'customer_id');
    }
}

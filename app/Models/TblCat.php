<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TblCat extends Model
{
    use SoftDeletes;

    protected $table = 'tblcat';

    protected $fillable = ['name', 'slug'];
}

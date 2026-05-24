<?php

namespace Database\Seeders;

use App\Models\TblProduct;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        TblProduct::factory()->count(50)->create();
    }
}

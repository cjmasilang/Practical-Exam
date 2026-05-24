<?php

namespace Database\Seeders;

use App\Models\TblCat;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Electronics', 'Computers', 'Smartphones', 'Accessories', 'Networking', 'Gaming', 'Software'];

        foreach ($categories as $cat) {
            TblCat::create([
                'name' => $cat,
                'slug' => \Illuminate\Support\Str::slug($cat),
            ]);
        }
    }
}

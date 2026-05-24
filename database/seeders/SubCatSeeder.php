<?php

namespace Database\Seeders;

use App\Models\TblCat;
use App\Models\TblSubCat;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SubCatSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Electronics' => ['Televisions', 'Home Audio', 'Cameras'],
            'Computers' => ['Laptops', 'Desktops', 'Monitors'],
            'Smartphones' => ['Android', 'iOS', 'Feature Phones'],
            'Accessories' => ['Cables', 'Chargers', 'Cases'],
            'Networking' => ['Routers', 'Switches', 'Modems'],
            'Gaming' => ['Consoles', 'PC Games', 'Controllers'],
            'Software' => ['Antivirus', 'OS', 'Office Suites'],
        ];

        foreach ($data as $catName => $subCats) {
            $category = TblCat::where('name', $catName)->first();

            if ($category) {
                foreach ($subCats as $subName) {
                    TblSubCat::create([
                        'cat_id' => $category->id,
                        'name' => $subName,
                        'slug' => Str::slug($subName),
                    ]);
                }
            }
        }
    }
}

<?php

namespace Database\Factories;

use App\Models\TblCat;
use App\Models\TblSubCat;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SubCatFactory extends Factory
{
    protected $model = TblSubCat::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->word();
        return [
            'cat_id' => TblCat::inRandomOrder()->first()->id ?? TblCat::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
        ];
    }
}

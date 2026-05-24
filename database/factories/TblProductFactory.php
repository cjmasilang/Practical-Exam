<?php

namespace Database\Factories;

use App\Models\TblProduct;
use App\Models\TblSubCat;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TblProductFactory extends Factory
{
    protected $model = TblProduct::class;

    public function definition(): array
    {
        $sub = TblSubCat::inRandomOrder()->first();

        $names = [
            'Televisions' => ['Samsung 55" 4K TV', 'LG OLED 65" Smart TV', 'Sony Bravia 50"'],
            'Home Audio' => ['JBL Soundbar', 'Sony Wireless Speaker', 'Bose Noise Cancelling'],
            'Cameras' => ['Canon EOS R6', 'Sony Alpha a7 IV', 'Nikon D850'],
            'Laptops' => ['MacBook Pro M3', 'Dell XPS 15', 'Lenovo ThinkPad X1'],
            'Desktops' => ['HP Pavilion Tower', 'iMac 24-inch', 'Alienware Aurora'],
            'Monitors' => ['ASUS TUF Gaming 27"', 'Dell UltraSharp 24"', 'LG Ultrawide 34"'],
            'Android' => ['Samsung Galaxy S24', 'Google Pixel 8', 'Xiaomi 14 Ultra'],
            'iOS' => ['iPhone 15 Pro', 'iPhone 14', 'iPhone 13'],
            'Feature Phones' => ['Nokia 3310', 'Philips Basic Phone'],
            'Cables' => ['USB-C to Lightning', 'HDMI 2.1 Cable', 'DisplayPort 1.4'],
            'Chargers' => ['Anker 65W GaN', 'Apple 20W Power Adapter'],
            'Cases' => ['Leather Wallet Case', 'Silicone Protective Case'],
            'Routers' => ['TP-Link WiFi 6', 'Netgear Nighthawk', 'ASUS ZenWiFi'],
            'Switches' => ['Cisco 8-Port Switch', 'Netgear Unmanaged'],
            'Modems' => ['Arris Surfboard', 'Netgear DOCSIS 3.1'],
            'Consoles' => ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
            'PC Games' => ['Steam Gift Card', 'Elden Ring Key'],
            'Controllers' => ['DualSense Wireless', 'Xbox Controller'],
            'Antivirus' => ['Norton 360', 'Bitdefender Total Security'],
            'OS' => ['Windows 11 Pro', 'macOS Sonoma'],
            'Office Suites' => ['Microsoft 365', 'Adobe Creative Cloud'],
        ];

        $subName = $sub ? $sub->name : 'General';
        $productName = isset($names[$subName]) ? $this->faker->randomElement($names[$subName]) : $subName . ' ' . $this->faker->numberBetween(100, 999);

        return [
            'cat_id' => $sub ? $sub->cat_id : 1,
            'subcat_id' => $sub ? $sub->id : 1,
            'name' => $productName,
            'slug' => Str::slug($productName) . '-' . Str::random(5),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 500, 80000),
            'stock_quantity' => $this->faker->numberBetween(5, 200),
            'sku' => strtoupper(Str::random(3)) . '-' . $this->faker->numberBetween(1000, 9999),
            'is_active' => true,
        ];
    }
}

<?php

namespace App\Services\Terminal;

use App\Models\{TblSales, TblSalesItems, TblProduct, TblCustomer};
use Illuminate\Support\Facades\DB;

class PosServices
{
    public function processTransaction(array $data): TblSales
    {
        return DB::transaction(function () use ($data) {
            $customer = TblCustomer::firstOrCreate(
                ['email' => $data['customer']['email'] ?? null],
                [
                    'name' => $data['customer']['name'] ?? 'Guest',
                    'phone' => $data['customer']['phone'] ?? null
                ]
            );

            $sale = TblSales::create([
                'customer_id' => $customer->id,
                'total_amount' => $data['total_amount'],
                'payment_method' => $data['payment_method']
            ]);

            foreach ($data['items'] as $item) {
                $product = TblProduct::findOrFail($item['id']);

                TblSalesItems::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'cat_id' => $product->cat_id,
                    'subcat_id' => $product->subcat_id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price
                ]);

                $product->decrement('stock_quantity', $item['quantity']);
            }

            return $sale;
        });
    }
}

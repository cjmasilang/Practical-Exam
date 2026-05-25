<?php

namespace App\Http\Controllers\Terminal;

use App\Http\Controllers\Controller;
use App\Models\TblSales;
use App\Models\TblSalesItems;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index()
    {
        return Inertia::render('terminal/sales/index', [
            'sales' => TblSales::with('customer')->latest()->get()
        ]);
    }

    public function items()
    {
        return Inertia::render('terminal/sales/salesItems', [
            'salesItems' => TblSalesItems::with(['sale.customer', 'product', 'sale'])->latest()->get()
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\TblSales;
use App\Models\TblProduct;
use App\Models\TblCustomer;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $metrics = [
            'total_sales' => TblSales::sum('total_amount'),
            'today_sales' => TblSales::whereDate('created_at', today())->sum('total_amount'),
            'total_orders' => TblSales::count(),
            'total_products' => TblProduct::count(),
            'total_customers' => TblCustomer::count(),
        ];

        $chartData = TblSales::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(total_amount) as total'))
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->limit(7)
            ->get();

        return Inertia::render('dashboard', [
            'metrics' => $metrics,
            'chartData' => $chartData
        ]);
    }
}

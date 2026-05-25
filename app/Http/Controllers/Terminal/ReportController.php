<?php

namespace App\Http\Controllers\Terminal;

use App\Http\Controllers\Controller;
use App\Models\TblProduct;
use App\Models\TblSales;
use App\Models\TblSalesItems;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function salesSummary(Request $request)
    {
        $query = TblSales::query()->with(['customer', 'items.product']);

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $sales = $query->latest()->get();

        $summary = [
            'total_sales' => $sales->sum('total_amount'),
            'transaction_count' => $sales->count(),
            'total_items_sold' => $sales->sum(fn($s) => $s->items->sum('quantity'))
        ];

        return Inertia::render('terminal/reports/salesSummary', [
            'sales' => $sales,
            'summary' => $summary,
            'filters' => $request->only(['start_date', 'end_date'])
        ]);
    }

    public function inventoryLogs()
    {
        return Inertia::render('terminal/reports/inventoryLogs', [
            'products' => TblProduct::with(['category', 'subCategory'])->get()
        ]);
    }
}

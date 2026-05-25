<?php

use App\Http\Controllers\Terminal\PosController;
use App\Http\Controllers\Terminal\ReportController;
use App\Http\Controllers\Terminal\SalesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/pos', [PosController::class, 'index'])->name('pos');
    Route::post('/pos/process', [PosController::class, 'process'])->name('process');


    Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');
    Route::get('/sales-items', [SalesController::class, 'items'])->name('sales.items');

    Route::get('/reports/sales-summary', [ReportController::class, 'salesSummary'])->name('reports.sales-summary');
    Route::get('/reports/inventory-logs', [ReportController::class, 'inventoryLogs'])->name('reports.sinventory-logs');

});

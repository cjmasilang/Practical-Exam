<?php

use App\Http\Controllers\Terminal\PosController;
use App\Http\Controllers\Terminal\ReportController;
use App\Http\Controllers\Terminal\SalesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('pos')->name('pos.')->middleware('can:view_pos')->group(function () {
        Route::get('/', [PosController::class, 'index'])->name('index');
        Route::post('/process', [PosController::class, 'process'])->name('process')->middleware('can:create_sales');
    });

    Route::prefix('sales')->name('sales.')->middleware('can:view_sales')->group(function () {
        Route::get('/', [SalesController::class, 'index'])->name('index');
        Route::get('/items', [SalesController::class, 'items'])->name('items');
    });

    Route::prefix('reports')->name('reports.')->middleware('can:view_reports')->group(function () {
        Route::get('/sales-summary', [ReportController::class, 'salesSummary'])->name('sales-summary');
        Route::get('/inventory-logs', [ReportController::class, 'inventoryLogs'])->name('inventory-logs');
    });
});

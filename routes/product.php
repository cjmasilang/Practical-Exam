<?php

use App\Http\Controllers\ProdManage\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::post('/', [CategoryController::class, 'store'])->name('store');
        Route::put('/{id}', [CategoryController::class, 'update'])->name('update');
        Route::delete('/{id}', [CategoryController::class, 'destroy'])->name('destroy');
        Route::post('/import', [CategoryController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [CategoryController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [CategoryController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [CategoryController::class, 'restore'])->name('restore');

    });
});

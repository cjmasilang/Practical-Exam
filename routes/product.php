<?php

use App\Http\Controllers\ProdManage\CategoryController;
use App\Http\Controllers\ProdManage\ProductController;
use App\Http\Controllers\ProdManage\SubCatController;
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

    Route::prefix('subCat')->name('subCat.')->group(function () {
        Route::get('/', [SubCatController::class, 'index'])->name('index');
        Route::post('/', [SubCatController::class, 'store'])->name('store');
        Route::put('/{id}', [SubCatController::class, 'update'])->name('update');
        Route::delete('/{id}', [SubCatController::class, 'destroy'])->name('destroy');
        Route::post('/import', [SubCatController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [SubCatController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [SubCatController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [SubCatController::class, 'restore'])->name('restore');

    });

    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::put('/{id}', [ProductController::class, 'update'])->name('update');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->name('destroy');
        Route::post('/import', [ProductController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [ProductController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [ProductController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [ProductController::class, 'restore'])->name('restore');

    });
});

<?php

use App\Http\Controllers\ProdManage\CategoryController;
use App\Http\Controllers\ProdManage\ProductController;
use App\Http\Controllers\ProdManage\SubCatController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'throttle:60,1'])->group(function () {

    Route::prefix('categories')->name('categories.')->middleware('can:view_categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::post('/', [CategoryController::class, 'store'])->name('store')->middleware('can:create_categories');
        Route::put('/{id}', [CategoryController::class, 'update'])->name('update')->middleware('can:edit_categories');
        Route::delete('/{id}', [CategoryController::class, 'destroy'])->name('destroy')->middleware('can:delete_categories');
        Route::post('/import', [CategoryController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [CategoryController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [CategoryController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [CategoryController::class, 'restore'])->name('restore');
    });

    Route::prefix('subCat')->name('subCat.')->middleware('can:view_sub_categories')->group(function () {
        Route::get('/', [SubCatController::class, 'index'])->name('index');
        Route::post('/', [SubCatController::class, 'store'])->name('store')->middleware('can:create_sub_categories');
        Route::put('/{id}', [SubCatController::class, 'update'])->name('update')->middleware('can:edit_sub_categories');
        Route::delete('/{id}', [SubCatController::class, 'destroy'])->name('destroy')->middleware('can:delete_sub_categories');
        Route::post('/import', [SubCatController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [SubCatController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [SubCatController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [SubCatController::class, 'restore'])->name('restore');
    });

    Route::prefix('products')->name('products.')->middleware('can:view_products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::post('/', [ProductController::class, 'store'])->name('store')->middleware('can:create_products');
        Route::put('/{id}', [ProductController::class, 'update'])->name('update')->middleware('can:edit_products');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->name('destroy')->middleware('can:delete_products');
        Route::post('/import', [ProductController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [ProductController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [ProductController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [ProductController::class, 'restore'])->name('restore');
    });
});

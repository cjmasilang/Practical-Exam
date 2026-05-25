<?php

use App\Http\Controllers\People\CustomerController;
use App\Http\Controllers\People\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::put('/{id}', [UserController::class, 'update'])->name('update');
        Route::delete('/{id}', [UserController::class, 'destroy'])->name('destroy');
        Route::post('/import', [UserController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [UserController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [UserController::class, 'restore'])->name('restore');

    });

});

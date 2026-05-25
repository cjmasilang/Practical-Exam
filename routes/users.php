<?php

use App\Http\Controllers\People\CustomerController;
use App\Http\Controllers\People\RoleBasedController;
use App\Http\Controllers\People\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('customers')->name('customers.')->middleware('can:view_customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index'])->name('index');
    });

    Route::prefix('users')->name('users.')->middleware('can:view_users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/store', [UserController::class, 'store'])->name('store')->middleware('can:create_users');
        Route::put('/update/{id}', [UserController::class, 'update'])->name('update')->middleware('can:edit_users');
        Route::delete('/destroy/{id}', [UserController::class, 'destroy'])->name('destroy')->middleware('can:delete_users');
        Route::post('/import', [UserController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [UserController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [UserController::class, 'restore'])->name('restore');
    });

    Route::prefix('roles')->name('roles.')->middleware('can:view_roles')->group(function () {
        Route::get('/', [RoleBasedController::class, 'index'])->name('index');
        Route::post('/store', [RoleBasedController::class, 'store'])->name('store')->middleware('can:create_roles');
        Route::put('/update/{id}', [RoleBasedController::class, 'update'])->name('update')->middleware('can:edit_roles');
        Route::delete('/destroy/{id}', [RoleBasedController::class, 'destroy'])->name('destroy')->middleware('can:delete_roles');
        Route::post('/import', [RoleBasedController::class, 'import'])->name('import');
        Route::post('/bulk-destroy', [RoleBasedController::class, 'bulkDestroy'])->name('bulkDestroy');
        Route::get('/archived', [RoleBasedController::class, 'archived'])->name('archived');
        Route::post('/{id}/restore', [RoleBasedController::class, 'restore'])->name('restore');
    });
});

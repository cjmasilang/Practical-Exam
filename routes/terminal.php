<?php

use App\Http\Controllers\Terminal\PosController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/pos', [PosController::class, 'index'])->name('pos');

});

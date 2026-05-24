<?php

namespace App\Http\Controllers\Terminal;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        return Inertia::render('terminal/pos');
    }
}

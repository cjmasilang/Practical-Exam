<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Models\TblCustomer;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('people/customer/index', [
            'customers' => TblCustomer::latest()->get()
        ]);
    }
}

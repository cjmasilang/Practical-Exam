<?php

namespace App\Http\Controllers\Terminal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Terminal\PosRequest;
use App\Models\TblProduct;
use App\Services\Terminal\PosServices;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PosController extends Controller
{
    public function __construct(
        protected PosServices $posService
    ) {}

    public function index(): Response
    {
        return Inertia::render('terminal/pos', [
            'products' => TblProduct::where('is_active', true)
                ->where('stock_quantity', '>', 0)
                ->get()
        ]);
    }

    public function process(PosRequest $request): RedirectResponse
    {
        $this->posService->processTransaction($request->validated());

        return redirect()->route('pos')->with('success', 'Transaction processed successfully.');
    }
}

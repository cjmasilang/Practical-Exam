<?php

namespace App\Http\Requests\Terminal;

use Illuminate\Foundation\Http\FormRequest;

class PosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer.name' => 'required|string|max:255',
            'customer.email' => 'nullable|email',
            'customer.phone' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:tblproduct,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string'
        ];
    }
}

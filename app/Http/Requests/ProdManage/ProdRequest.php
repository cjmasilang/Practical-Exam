<?php

namespace App\Http\Requests\ProdManage;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProdRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cat_id' => 'required|exists:tblcat,id',
            'subcat_id' => 'required|exists:tblsubcat,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'sku' => 'required|unique:tblproduct,sku,' . $this->route('id'),
        ];
    }
}

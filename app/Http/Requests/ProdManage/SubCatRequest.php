<?php

namespace App\Http\Requests\ProdManage;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubCatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cat_id' => 'required|exists:tblcat,id',
            'name' => 'required|string|max:255',
        ];
    }
}

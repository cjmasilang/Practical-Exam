<?php

namespace App\Http\Requests\ProdManage;

use Illuminate\Foundation\Http\FormRequest;

class CatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:tblcat,name,' . $this->route('id'),
        ];
    }
}

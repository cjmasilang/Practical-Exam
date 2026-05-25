<?php

namespace App\Http\Requests\People;

use Illuminate\Foundation\Http\FormRequest;

class RoleBasedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'permissions' => 'required|array'
        ];
    }
}

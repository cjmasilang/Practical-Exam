<?php

namespace App\Http\Requests\People;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'password' => $userId ? 'nullable|min:8' : 'required|min:8',
            'roles' => 'required|array'
        ];
    }
}

<?php

namespace App\Services;

use App\Models\User;

class RegisterService
{
    public function registerUser(array $credentials)
    {
        $user = User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => $credentials['password'], // Laravel 10 hasha automaticamente
        ]);


        return $user;
    }
}

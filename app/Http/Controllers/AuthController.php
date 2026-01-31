<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $user = $this->authService->loginUser($request->validated());

        if (!$user) {
            return response()->json(['message' => 'Credenziali non valide!'], 401);
        }

        return response()->json($user, 200);
    }

    public function logout()
    {
        $this->authService->logout();

        return response()->json(['message' => 'Logout effettuato'], 200);
    }
}

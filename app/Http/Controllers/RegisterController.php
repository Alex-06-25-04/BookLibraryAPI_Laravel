<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\RegisterService;

class RegisterController extends Controller
{
    private RegisterService $registerService;

    public function __construct(RegisterService $registerService)
    {
        $this->registerService = $registerService;
    }
    public function register(RegisterRequest $request)
    {
        $validation = $this->registerService->registerUser($request->validated());

        return response()->json($validation, 201);
    }
}

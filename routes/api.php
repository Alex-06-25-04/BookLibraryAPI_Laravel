<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReadingListController;

Route::post('/register', [RegisterController::class, 'register'])
    ->middleware('throttle:5,1'); // 5 tentativi per minuto
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// Rotte protette (Solo utenti loggati con Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/books', [BookController::class, 'getBooks']);
    Route::get('/books/genres', [BookController::class, 'filters']);

    Route::post('/books/stats', [BookController::class, 'countGenres']);

    Route::get('/books/{book}', [BookController::class, 'getDetailsById']);

    Route::post('/reading-list/toggle', [ReadingListController::class, 'toggle']);

    Route::get('/reading-list', [ReadingListController::class, 'getFavoriteList']);
    Route::get('/reading-list/{book}', [ReadingListController::class, 'check']);
    Route::delete('/reading-list/{book}', [ReadingListController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
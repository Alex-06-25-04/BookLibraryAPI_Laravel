<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterRequest;
use App\Models\Book;
use App\Services\BookService;

class BookController extends Controller
{
    private BookService $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }
    public function getBooks()
    {
        return response()->json($this->bookService->getAllBooks(), 200);
    }

    public function filters(FilterRequest $request)
    {
        $filters = $this->bookService->getFiltered($request->validated());

        return response()->json($filters, 200);
    }

    public function getDetailsById(Book $book)
    {
        return response()->json($book, 200);
    }

    public function countGenres()
    {
        $stats = $this->bookService->countStats();

        return response()->json($stats, 200);
    }
}

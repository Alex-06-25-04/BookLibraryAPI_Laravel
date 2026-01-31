<?php

namespace App\Http\Controllers;

use App\Services\ReadingListService;
use App\Models\Book;
use App\Http\Requests\ToggleRequest;

class ReadingListController extends Controller
{
    private ReadingListService $readingListService;

    public function __construct(ReadingListService $readingListService)
    {
        $this->readingListService = $readingListService;
    }

    public function toggle(ToggleRequest $request)
    {
        $result = $request->validated();

        $toggle = $this->readingListService->toggleFavoriteBook($result['book_id']);

        return response()->json($toggle, 200);
    }

    public function destroy(Book $book)
    {
        $this->readingListService->remove($book->id);
        return response()->noContent();
    }

    public function getFavoriteList()
    {
        $books = $this->readingListService->getFavoriteBooksList();

        return response()->json($books, 200);
    }

    public function check(Book $book)
    {
        return response()->json($this->readingListService->checkBookId($book->id), 200);
    }
}

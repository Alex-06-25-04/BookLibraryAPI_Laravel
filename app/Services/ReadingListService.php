<?php

namespace App\Services;

class ReadingListService
{
    public function toggleFavoriteBook(int $bookId)
    {
        $user = auth()->user();

        $favorite = $user->books()->toggle($bookId);

        if (!empty($favorite['attached'])) {
            return [
                'action' => 'added',
                'message' => 'Aggiunto alla lista dei preferiti!',
                'is_favorite' => true
            ];
        } else {
            return [
                'action' => 'deleted',
                'message' => 'Rimosso dalla lista dei preferiti!',
                'is_favorite' => false
            ];
        }
    }

    public function remove(int $bookId)
    {
        auth()->user()->books()->detach($bookId);
    }

    public function getFavoriteBooksList()
    {
        return auth()->user()->books;
    }

    public function checkBookId(int $bookId)
    {
        return auth()->user()->books()->where('book_id', $bookId)->exists();
    }
}
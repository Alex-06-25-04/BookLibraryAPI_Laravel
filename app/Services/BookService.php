<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Validation\ValidationException;

class BookService
{
    public function getAllBooks()
    {
        return Book::all();
    }

    public function getFiltered(array $filters)
    {
        $query = Book::query();

        // Filtra per i titoli (Condizione per la rcerca nel frontend)
        if (!empty($filters['title'])) {
            $query->where('title', 'LIKE', "%{$filters['title']}%");
        }

        // Filtro genere
        if (!empty($filters['genre'])) {
            // Recuperiamo i generi validi DINAMICAMENTE dal DB per il controllo
            $validGenres = Book::distinct()->pluck('genre')->toArray();

            // Se il genere non esiste affatto nel DB, allora diamo errore
            if (!in_array($filters['genre'], $validGenres)) {
                throw ValidationException::withMessages([
                    'genre' => ['Il genere selezionato non esiste nel nostro catalogo!']
                ]);
            }
            $query->where('genre', $filters['genre']);
        }

        // Filtra per autore SOLO se il parametro non è buoto o la stringa "null"
        if (!empty($filters['author']) && $filters['author'] !== 'null') {
            $query->where('author', $filters['author']);
        }

        return $query->get();
    }

    public function countStats()
    {

        // Con prisma
        // const AllGenres = await prisma.book.findMany([
        //     distrinct: ['genre'],
        //     select: {genre: true}
        // ]);

        // const results = {};

        // for (const g of allGenres) {
        //     results[g.genre] = await prisma.count([
        //         where: {genre: g.genre}
        //     ])
        // }

        // return results;

        $allGenres = Book::groupBy('genre')
            ->distinct()
            ->pluck('genre'); // Prende solo il valore stringa del genere

        $results = [];

        foreach ($allGenres as $genre) {
            $results[$genre] = Book::where('genre', $genre)->count();
        }

        // Query ottimizzata
        // $stats = Book::select('genre')
        //     ->selectRaw('COUNT(*) as total')
        //     ->groupBy('genre')
        //     ->get()
        //     ->pluck('total', 'genre'); chiave = genre, valore = count

        return $results;
    }
}
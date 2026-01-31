<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $queries = ['fantasy', 'scifi', 'thriller', 'romance'];

        foreach ($queries as $query) {
            $response = Http::get('https://www.googleapis.com/books/v1/volumes', [
                'q' => $query,
                'maxResults' => 40
            ]);

            $data = $response->json();

            foreach ($data['items'] as $item) {
                $volumeInfo = $item['volumeInfo'];

                // Trova ISBN_13
                $isbn = null;
                if (isset($volumeInfo['industryIdentifiers'])) {
                    foreach ($volumeInfo['industryIdentifiers'] as $identifier) {
                        if ($identifier['type'] === 'ISBN_13') {
                            $isbn = $identifier['identifier'];
                            break;
                        }
                    }
                }

                Book::create([
                    'title' => $volumeInfo['title'] ?? null,
                    'author' => $volumeInfo['authors'][0] ?? null,
                    'isbn' => $isbn,
                    'publication_year' => $volumeInfo['publishedDate'] ?? null,
                    'genre' => $volumeInfo['categories'][0] ?? null,
                    'cover_url' => $volumeInfo['imageLinks']['thumbnail'] ?? null,
                    'description' => $volumeInfo['description'] ?? null
                ]);
            }
        }
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'publication_year',
        'genre',
        'cover_url',
        'description'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'reading_lists', 'book_id', 'user_id');
    }
}

import { fetchApi } from './fetchApi.js';

export default class BookApi {
    getAllBooks = async () => {
        return await fetchApi('/books');
    }

    getDetailsById = async (bookId) => {
        return await fetchApi(`/books/${bookId}`);
    }

    filters = async ({ genre = null, author = null, title = null }) => {
        // Partiamo dal genere che è obbligatorio per questo filtro
        const params = new URLSearchParams();

        // Aggiungiamo i parametri solo se esistono
        if (genre) params.append('genre', genre);
        if (author && author !== null) params.append('author', author);
        if (title) params.append('title', title);

        // Se non ci sono filtri, params.toString() sarà vuoto
        const queryString = params.toString();
        const endpoint = queryString ? `/books/genres?${queryString}` : '/books';
        return await fetchApi(endpoint);
    }

    countGenres = async (genres) => {
        return await fetchApi(`/books/stats?genres=${genres}`, {
            method: 'POST'
        });
    }
}
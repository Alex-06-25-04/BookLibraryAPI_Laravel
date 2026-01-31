export default class BookDetailComponent {
    constructor(book, isFavorite) {
        this.book = book;
        this.isFavorite = isFavorite;
    }

    renderDetail() {
        return `
        <div class="book-detail">
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${this.book.cover_url}" alt="${this.book.title}" />
                    </div>

                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${this.book.title}</h3>

                            <p class="card-text"><strong>Genere:</strong> ${this.book?.genre || 'Genere non disponibile!'}</p>
                            <p class="card-text"><strong>Autore:</strong> ${this.book?.author || 'Autore non disponibile!'}</p>
                            <p class="card-text"><strong>Descrizione:</strong> ${this.book?.description || 'Descrizione non disponibile!'}</p> 
                            <p class="card-text"><small class="text-muted"><strong>Pubblicato:</strong> ${this.book.publication_year}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <h3 id="toggle-favorite">${this.isFavorite ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>'}</h3>
        </div>
        `;
    }
}
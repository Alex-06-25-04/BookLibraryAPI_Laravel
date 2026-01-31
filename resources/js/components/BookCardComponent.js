export default class BookCardComponent {
    constructor(book, options = {}) {
        this.book = book;
        this.showActions = options.showActions ?? false;
    }

    renderCard() {
        return `
        <div class="book-card brutalist-card" data-book-id="${this.book.id}">
            
            <div class="genre-badge">
                <span class="badge-text">${(this.book?.genre || 'NON DEFINITO').toUpperCase()}</span>
            </div>

            <div class="book-cover">
                <img src="${this.book.cover_url}" loading="lazy" alt="${this.book.title}" class="cover-img" />
            </div>

            <div class="book-info">
                <h3 class="book-title">${this.book.title}</h3>

                ${this.showActions
                ? `
                    <div class="book-actions">
                        <button class="action-dots"><i class="bi bi-three-dots-vertical"></i></button>
                        <div class="action-menu hidden">
                            <button class="btn-remove" data-action="remove">
                                <i class="bi bi-trash-fill"></i> Rimuovi
                            </button>
                        </div>
                    </div>
                    `
                : ''
            }
            </div>
        </div>
        `;
    }
}
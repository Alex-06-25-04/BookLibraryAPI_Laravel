import BookCardComponent from './BookCardComponent.js';

export default class BookListComponent {
    constructor(items, options = {}, router = null, onVoidClick = null) {
        this.items = items;
        this.showActions = options.showActions ?? false;
        this.router = router;

        this.onVoidClick = onVoidClick;
    }

    renderList() {
        if (!Array.isArray(this.items)) {
            console.error('BookListComponent: items non è un array', this.items);
            return '';
        }
        if (this.items.length === 0) return `
        <div class="void-list">
            <h3>Nessun libro preferito al momento!</h3>
            <p>Esplora la nostra Home!</p>
            <button id="goHome" type="button">Vai alla home</button>
        </div>
        `;

        return `
        <div class="book-list">
            ${this.items.map((book) => new BookCardComponent(book, { showActions: this.showActions }).renderCard()).join('')}
        </div>
    `;
    }

    mount() {
        const container = document.querySelector('#goHome');
        if (this.onVoidClick && container) this.onVoidClick(container);
    }
}
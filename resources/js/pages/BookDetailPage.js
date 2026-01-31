import BasePage from './BasePage.js';
import ReadingListApi from '../api/ReadingListApi.js';
import HeaderComponent from '../components/HeaderComponent.js';
import BookDetailComponent from '../components/BookDetailComponent.js';
import BookApi from '../api/BookApi.js';
import ToastNotification from '../components/ToastNotification.js';

export default class BookDetailPage extends BasePage {
    constructor(router, bookId) {
        super(router);
        this.readingListApi = new ReadingListApi();
        this.bookId = bookId;
        this.book = null;
        this.bookApi = new BookApi();
        this.isFavorite = null;
    }

    async init() {
        const [bookDetails, isFavorite] = await Promise.all([
            this.bookApi.getDetailsById(this.bookId),
            this.readingListApi.check(this.bookId)
        ]);

        this.book = bookDetails;
        this.isFavorite = isFavorite;
    }

    renderHeader() {
        const header = new HeaderComponent({
            userName: this.user.name,
            router: this.router,
            showSearch: false,
            actions: [
                {
                    type: 'navigate',
                    icon: '<i class="bi bi-house-door-fill"></i>',
                    label: 'Home',
                    url: '/',
                    class: 'btn-home'
                },
                {
                    type: 'navigate',
                    icon: '<i class="bi bi-book-fill"></i>',
                    label: 'Favorites',
                    url: '/reading-list',
                    class: 'btn-favorites'
                },
            ]
        });
        this.elements.header.innerHTML = header.renderHeader();
        header.attachHeaderEvents();
    }

    renderContent() {
        if (!this.book) return '<p>Caricamento...</p>';
        return new BookDetailComponent(this.book, this.isFavorite).renderDetail();
    }

    attachToggleEvent() {
        const toggleBtn = document.getElementById('toggle-favorite');

        toggleBtn?.addEventListener('click', async () => {
            const previousState = this.isFavorite;

            this.isFavorite = !this.isFavorite;

            toggleBtn.innerHTML = this.isFavorite ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';

            try {
                const result = await this.readingListApi.toggle(this.bookId);
                this.isFavorite = result.is_favorite; // Conferma dallo stato server
            } catch (e) {
                // Rollback in caso di errore
                this.isFavorite = previousState;
                toggleBtn.innerHTML = previousState ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
                ToastNotification.error('Impossibile aggiornare i preferiti!');
            }
        });
    }

    afterRender() {
        this.initElements();
        this.renderHeader();

        this.elements.main.innerHTML = this.renderContent();

        this.attachToggleEvent();
    }
}
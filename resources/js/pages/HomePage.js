import BasePage from './BasePage.js';
import Sidebar from '../components/Sidebar.js';
import BookListComponent from '../components/BookListComponent.js';
import HeaderComponent from '../components/HeaderComponent.js';
import { attachNavigation } from '../utils/attachNavigation.js';
import BookApi from '../api/BookApi.js';
import ToastNotification from '../components/ToastNotification.js';

export default class HomePage extends BasePage {
    constructor(router) {
        super(router);
        this.bookApi = new BookApi();
        this.items = [];
        this.genreType = 'All';
        this.hasSidebar = true;

        this.count = {};
        this.totalBooksCount = 0;
    }

    async init() {
        await this.loadItems();
    }

    async loadItems() {
        const [books, counts] = await Promise.all([
            this.bookApi.getAllBooks(),
            this.bookApi.countGenres()
        ]);

        this.items = books;
        this.count = counts;
        this.totalBooksCount = books.length;
    }

    renderContent() {
        return new BookListComponent(this.items).renderList();
    }

    async afterRender() {
        this.initElements()
        this.renderHeader();
        this.renderSidebar();

        this.elements.main.innerHTML = this.renderContent();

        attachNavigation(
            this.router,
            {
                selector: '.book-card[data-book-id]',
                dataAttr: 'bookId',
                baseUrl: '/books'
            },
        );
    }

    renderHeader() {
        const header = new HeaderComponent({
            userName: this.user.name,
            router: this.router,
            showSearch: true,
            actions: [
                {
                    type: 'navigate',
                    icon: '<i class="bi bi-book-fill"></i>',
                    label: 'Favorites',
                    url: '/reading-list',
                    class: 'btn-favorites'
                }
            ],
            onSearch: async (valueText) => {
                try {
                    this.items = await this.bookApi.filters({ title: valueText });
                    this.elements.main.innerHTML = this.renderContent();
                } catch (e) {
                    console.error('Errore nella ricerca del titolo: ', e);
                    ToastNotification.error('Errore durante la ricerca!');
                    this.items = [];
                }
            }
        });
        this.elements.header.innerHTML = header.renderHeader();
        header.attachHeaderEvents();
    }

    async eventSidebar(genre) {
        this.genreType = genre;
        let response;
        if (this.genreType === 'All') {
            response = await this.bookApi.getAllBooks();
        } else {
            response = await this.bookApi.filters({ genre: this.genreType });
        }

        // Se response è l'errore di Laravel, non ha .length e non è un array
        this.items = Array.isArray(response) ? response : [];

        // Aggiorna la lista dei libri e riattacca eventi sempre, anche per "All"
        this.elements.main.innerHTML = this.renderContent();
    }

    renderSidebar() {
        const sidebar = new Sidebar(this.totalBooksCount, this.count, this.genreType, async (genre) => await this.eventSidebar(genre));
        this.elements.aside.innerHTML = sidebar.render();
        sidebar.afterRender();
    }
}
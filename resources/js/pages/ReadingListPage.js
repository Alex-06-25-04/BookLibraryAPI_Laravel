import BasePage from './BasePage.js';
import ReadingListApi from '../api/ReadingListApi.js';
import BookListComponent from '../components/BookListComponent.js';
import HeaderComponent from '../components/HeaderComponent.js';
import { attachNavigation } from '../utils/attachNavigation.js';

export default class ReadingListPage extends BasePage {
    #instanceOfBookList = null;

    constructor(router) {
        super(router);
        this.readingListApi = new ReadingListApi();
        this.items = [];
    }

    async init() {
        this.items = await this.readingListApi.getFavoriteList();
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
                }
            ]
        });
        this.elements.header.innerHTML = header.renderHeader();
        header.attachHeaderEvents();
    }

    renderContent() {
        this.#instanceOfBookList = new BookListComponent(
            this.items,
            { showActions: true },
            this.router,
            (container) => container?.addEventListener('click', () => this.router.navigate('/'))
        );
        return this.#instanceOfBookList.renderList();
    }

    attachNavigation() {
        attachNavigation(
            this.router,
            {
                selector: '.book-card[data-book-id]',
                dataAttr: 'bookId',
                baseUrl: '/books'
            }
        );
    }

    attachDropdownEvents() {
        // Chiudi dropdown quando clicchi fuori
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.book-actions')) {
                document.querySelectorAll('.action-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
            }
        });

        // Evento del click del dropdown
        document.querySelectorAll('.action-dots').forEach(btn => {
            btn?.addEventListener('click', (e) => {
                e.stopPropagation();

                // Chiudi tutti gli altri menu aperti
                document.querySelectorAll('.action-menu').forEach(menu => {
                    if (menu !== btn.nextElementSibling) {
                        menu.classList.add('hidden');
                    }
                });

                // Toggle del dropdown corrente
                btn.nextElementSibling.classList.toggle('hidden');
            });
        });
    }

    attachRemoveEvents() {
        // Evento al click per rimuovere dai preferiti il libro
        document.querySelectorAll('[data-action="remove"]').forEach(btn => {
            btn?.addEventListener('click', async (e) => {
                e.stopPropagation();
                const bookId = btn.closest('.book-card').dataset.bookId;
                await this.readingListApi.destroy(bookId);

                // Ricaricare i contenuti dentro la lista dei favoriti
                await this.reloadList();
            });
        });
    }

    async afterRender() {
        this.initElements();
        this.renderHeader();

        this.elements.main.innerHTML = this.renderContent();

        this.attachNavigation();
        this.attachDropdownEvents();
        this.attachRemoveEvents();

        // Monta il listener sul bottone "Vai alla home" se presente
        this.#instanceOfBookList?.mount();
    }

    async reloadList() {
        this.items = await this.readingListApi.getFavoriteList();
        this.elements.main.innerHTML = this.renderContent();

        // Riattacco solo gli eventi necessari
        this.attachNavigation();
        this.attachDropdownEvents();
        this.attachRemoveEvents();
        this.#instanceOfBookList?.mount();
    }
}
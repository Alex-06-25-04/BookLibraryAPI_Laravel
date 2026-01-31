import AuthPage from '../pages/AuthPage.js';
import HomePage from '../pages/HomePage.js';
import BookDetailPage from '../pages/BookDetailPage.js';
import ReadingListPage from '../pages/ReadingListPage.js';

const routes = {
    '/': HomePage,
    '/reading-list': ReadingListPage,
    '/auth': AuthPage
};

export default class Router {
    constructor() {
        this.app = document.getElementById('app');
    }

    init() {
        // Gestisce il tasto indietro del browser
        window.addEventListener('popstate', () => this.route());

        // Carica la pagina iniziale
        this.route()
    }

    navigate(url) {
        history.pushState(null, null, url);
        this.route();
    }

    async route() {
        const token = localStorage.getItem('auth_token');
        let path = window.location.pathname;

        let PageClass = routes[path];

        // Route dinamica /books/:id
        const match = path.match(/^\/books\/(\d+)$/);
        let pageInstance;

        if (match) {
            const bookId = match[1];
            pageInstance = new BookDetailPage(this, bookId);
        } else {
            PageClass = PageClass || routes['/'];
            pageInstance = new PageClass(this);
        }

        // AUTH GUARD
        if (!token && path !== '/auth') {
            this.navigate('/auth');
            return;
        }

        if (token && path === '/auth') {
            this.navigate('/');
            return;
        }

        if (pageInstance.init) await pageInstance.init();

        this.app.innerHTML = pageInstance.render();

        if (pageInstance.afterRender) await pageInstance.afterRender();
    }
}
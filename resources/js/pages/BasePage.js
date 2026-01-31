export default class BasePage {
    constructor(router) {
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('user')) || { name: 'UTENTE' };
        this.hasSidebar = false;

        this.elements = {
            header: null,
            aside: null,
            main: null
        };
    }

    async loadItems() { }

    render() {
        return `
        <div class="page">
            <header id="header-content"></header>
            ${this.hasSidebar ? '<aside id="aside-content"></aside>' : ''}
            <main id="main-content"></main>
        </div>
    `;
    }

    initElements() {
        this.elements.header = document.querySelector('#header-content');
        this.elements.aside = document.querySelector('#aside-content');
        this.elements.main = document.querySelector('#main-content');
    }

    renderHeader() {
        return '';
    }

    renderContent() {
        return '';
    }
}
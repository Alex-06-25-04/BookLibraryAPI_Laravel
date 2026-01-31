import AuthApi from '../api/AuthApi.js';

export default class HeaderComponent {
    constructor(config) {
        this.userName = config.userName;
        this.router = config.router;
        this.actions = config.actions || []; // Array di azioni
        this.showSearch = config.showSearch ?? false;
        this.authApi = new AuthApi();
        this.onSearch = config.onSearch;
    }

    renderHeader() {
        return `
        <div class="home-page-header">
            <h2 id="principal-title" title="Home Page">Book Library</h2>
            <h3>Benvenuto nella libreria digitale dei tuoi sogni <3</h3>

            ${this.showSearch ? '<input type="search" id="searchTitle" placeholder="Cerca titolo.." />' : ''}
        </div>

        <div class="header-actions">
            <span class="user-info"><i class="bi bi-person-circle"></i> ${this.userName}</span>

            ${this.actions.map(action => `
                <button class="btn-action ${action.class || ''}" data-action="${action.type}" data-url="${action.url || ''}" >
                    ${action.icon} ${action.label}
                </button>
                `).join('')}
            
            <button class="btn-logout"><i class="bi bi-box-arrow-right"></i> Logout</button>
        </div>
        `;
    }

    attachHeaderEvents() {
        document.querySelector('#principal-title')?.addEventListener('click', () => this.router.navigate('/'));

        document.querySelectorAll('.btn-action').forEach(btn => {
            btn?.addEventListener('click', (e) => {
                const actionType = e.target.closest('.btn-action').dataset.action;
                const actionUrl = e.target.closest('.btn-action').dataset.url;

                if (actionType === 'navigate' && actionUrl) {
                    this.router.navigate(actionUrl);
                }
            });
        });

        // Variabile per Debounce
        let timeout;
        document.getElementById('searchTitle')?.addEventListener('input', async (e) => {
            const value = e.target.value.toLowerCase();
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                if (this.onSearch) await this.onSearch(value);
            }, 300);
        });

        document.querySelector('.btn-logout')?.addEventListener('click', async () => await this.authApi.logout());
    }
}
export default class Sidebar {
    constructor(totalAll, count, currentGenre, onGenreClick) {
        this.totalAll = totalAll || {};
        this.count = count || {};
        this.currentGenre = currentGenre || 'All'
        this.onGenreClick = onGenreClick;
    }

    render() {
        const principalDiv = `
        <input type="search" id="searchbarGenres" placeholder="Cerca genere.." />
        <div class="stat-item ${this.currentGenre === 'All' ? 'active' : ''}" data-genre="All">
            <label class="genre"><strong>Tutto:</strong></label> ${this.totalAll}
        </div>`;

        const genresDiv = Object.entries(this.count)
            .filter(([genre]) => genre && genre.trim() !== '') // filtra i dati diversi da '', null, undefined, 0
            .map(([genre, total]) => `
        <div class="stat-item ${this.currentGenre === genre ? 'active' : ''}" data-genre="${genre}"> 
            <label class="genre"><strong>${genre}:</strong></label> ${total}
        </div>
    `).join('') || '<p>Nessuna statistica disponibile</p>';

        return principalDiv + genresDiv;
    }

    afterRender() {
        const searchbar = document.getElementById('searchbarGenres');

        // Evento searchbar (input)
        searchbar?.addEventListener('input', (e) => {
            // Prendo il valore del testo scritto dall'evento (toLowerCase())
            const valueText = e.target.value.toLowerCase();

            // Itero su ogni contenitore dei generi
            document.querySelectorAll('.stat-item[data-genre]').forEach(el => {
                // prendo il genere dalla label (toLowerCase)
                const label = el.querySelector('.genre').textContent.toLowerCase();

                // Contenitore.style.display = se strong include il contenuto del test ? 'flex' : 'none'
                el.style.display = label.includes(valueText) || valueText === '' ? 'flex' : 'none';
            });
        });

        document.querySelectorAll('.stat-item[data-genre]').forEach(el => {
            el?.addEventListener('click', () => {
                // Rimuovi active da tutti i filtri
                document.querySelectorAll('.stat-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Aggiungi active al cliccato
                el.classList.add('active');

                // Esegui callback
                const genre = el.dataset.genre;
                if (this.onGenreClick) this.onGenreClick(genre);
            });
        });
    }
}
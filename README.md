# BookLibraryAPI_Laravel

## Descrizione
Applicazione web per la gestione di una biblioteca personale costruita con Laravel. Il progetto permette di visualizzare libri provenienti da un'API pubblica, gestire una reading list personalizzata e visualizzare statistiche sui generi letterari. Include un sistema di autenticazione basato su Laravel Sanctum.

## Struttura del Progetto
```
BookLibraryAPI_Laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── BookController.php
│   │   │   ├── ReadingListController.php
│   │   │   └── RegisterController.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── Book.php
│   │   └── User.php
│   ├── Providers/
│   └── Services/
│       └── BookService.php
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── css/
│   │   ├── app.css
│   │   ├── auth.css
│   │   ├── book-detail.css
│   │   ├── home.css
│   │   └── reading-list.css
│   ├── js/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── utils/
│   │   └── app.js
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── api.php
│   ├── web.php
│   └── console.php
├── storage/
├── vendor/
├── .env
├── .env.example
├── .gitignore
├── composer.json
├── package.json
└── README.md
```

## Tecnologie Utilizzate
- **Laravel 11.x** - Framework PHP
- **SQLite** - Database
- **Laravel Sanctum** - Autenticazione API con token
- **Vite** - Build tool frontend
- **Vanilla JavaScript** - Frontend SPA
- **CSS3** - Styling

## Installazione

### Prerequisiti
- PHP >= 8.2
- Composer
- Node.js & NPM
- SQLite

### Passaggi

1. **Clona il repository**
```bash
git clone 
cd BookLibraryAPI_Laravel
```

2. **Installa le dipendenze PHP**
```bash
composer install
```

3. **Installa le dipendenze Node.js**
```bash
npm install
```

4. **Copia il file di configurazione**
```bash
cp .env.example .env
```

5. **Genera la chiave dell'applicazione**
```bash
php artisan key:generate
```

6. **Crea il database SQLite**
```bash
touch database/database.sqlite
```

7. **Esegui le migrazioni**
```bash
php artisan migrate
```

8. **Avvia il server di sviluppo**
```bash
php artisan serve
```

9. **[In un altro terminale] Avvia Vite**
```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:8000`

## Endpoints API

### Autenticazione
- `POST /api/register` - Registrazione nuovo utente
  - Body: `{ name, email, password, password_confirmation }`
- `POST /api/login` - Login utente
  - Body: `{ email, password }`
- `POST /api/logout` - Logout utente (richiede autenticazione)

### Libri
- `GET /api/books` - Ottiene tutti i libri dall'API pubblica
- `GET /api/books/genres` - Filtra libri per genere
- `POST /api/books/stats` - Ottiene statistiche sui generi
- `GET /api/books/{book}` - Dettagli di un libro specifico

### Reading List (Lista di Lettura Personale - FAVORITI)
- `POST /api/reading-list/toggle` - Aggiungi/rimuovi libro dalla reading list
  - Body: `{ book_id }`
- `GET /api/reading-list` - Ottiene la reading list dell'utente
- `GET /api/reading-list/{book}` - Verifica se un libro è nella reading list
- `DELETE /api/reading-list/{book}` - Rimuove un libro dalla reading list

**Nota:** Tutte le rotte tranne `/register` e `/login` richiedono autenticazione tramite token Bearer.

## Funzionalità

- ✅ Autenticazione utenti con Laravel Sanctum
- ✅ Visualizzazione catalogo libri da API pubblica
- ✅ Dettaglio libro con copertina, autore, ISBN, anno, descrizione
- ✅ Gestione reading list personale
- ✅ Filtri per genere letterario
- ✅ Statistiche sui generi nella propria reading list
- ✅ SPA con routing lato client
- ✅ Rate limiting su login e registrazione (5 tentativi/minuto)

## Note

⚠️ **Progetto in sviluppo**

Questo progetto è ancora in fase di sviluppo. Mancano ancora:
- Alcune features backend e frontend
- Rifiniture UI/UX
- Paginazione completa
- Test automatizzati
- Ottimizzazioni varie

Il progetto verrà aggiornato con nuove funzionalità e miglioramenti nel tempo.

## Licenza
MIT License
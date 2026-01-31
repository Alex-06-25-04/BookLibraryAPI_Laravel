import AuthApi from '../api/AuthApi.js';
import ToastNotification from '../components/ToastNotification.js';
import RegisterComponent from '../components/AuthComponents/RegisterComponent.js';
import LoginComponent from '../components/AuthComponents/LoginComponent.js';
import SwitchPanelComponent from '../components/AuthComponents/SwitchPanelComponent.js';

export default class AuthPage {
    constructor(router) {
        this.router = router;
        this.authApi = new AuthApi();
        this.registerFormComponent = RegisterComponent();
        this.loginFormComponent = LoginComponent();
        this.switchPanelComponent = SwitchPanelComponent();
    }

    afterRender() {
        this.attachEvents();
    }

    render() {
        return `
        <div class="container min-vh-100 d-flex align-items-center justify-content-center">
            <div class="row w-100 justify-content-center">
                <div class="col-md-10 col-lg-8">
                    <div id="auth-container" class="auth-container card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div class="row g-0">
                            <!-- Login Container -->
                            ${this.loginFormComponent}
                        
                            <!-- Register Container -->
                            ${this.registerFormComponent}

                            <!-- Switch Panel (UN SOLO PANNELLO CHE SI SPOSTA) -->
                            ${this.switchPanelComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    attachEvents() {
        const switchBtn = document.getElementById('switchBtn');
        const switchText = document.getElementById('switchText');
        const switchDescription = document.querySelector('.switch-description');
        const authContainer = document.getElementById('auth-container');

        let isRegister = false;

        switchBtn?.addEventListener('click', () => {
            isRegister = !isRegister;

            authContainer.classList.toggle('register-active', isRegister);

            switchText.textContent = isRegister ? 'Hai già un account?' : 'Non hai un account?';
            switchBtn.textContent = isRegister ? 'Accedi' : 'Registrati';
            switchDescription.textContent = isRegister ? 'Accedi per goderti Book Library' : 'Registrati per iniziare a usare Book Library';
        });

        // Events per submit dei form
        document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            await this.handleRegister(form);
        });

        document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            await this.handleLogin(form);
        });
    }

    async handleRegister(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            await this.authApi.register(data);

            ToastNotification.success('Registrazione effettuata con successo!');

            form.reset();

            // Navigate to Login
            document.getElementById('switchBtn').click();

        } catch (e) {
            console.error('Errore durante il register: ', e);
            ToastNotification.error('Qualcosa è andato storto durante la registrazione!');
        }
    }

    async handleLogin(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            await this.authApi.login(data);

            form.reset();

            this.router.navigate('/');

        } catch (e) {
            console.error('Errore durante il login: ', e);
            ToastNotification.error('Qualcosa è andato storto durante il login!');
        }
    }
}
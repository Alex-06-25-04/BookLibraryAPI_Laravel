export default function SwitchPanelComponent() {
    return `
    <div class="col-md-6 switch-panel bg-gradient-primary d-flex align-items-center justify-content-center p-5 text-white">
        <div class="text-center">
            <i class="bi bi-person-plus-fill switch-icon" style="font-size: 4rem; opacity: 0.8;"></i>
            <h3 class="mt-4 fw-bold" id="switchText">Non hai un account?</h3>
            <p class="mb-4 switch-description">Registrati per iniziare a usare Entertainment-Hub</p>
            <button id="switchBtn" class="btn btn-outline-light btn-lg px-5">
                Registrati
            </button>
        </div>
    </div>
    `;
}
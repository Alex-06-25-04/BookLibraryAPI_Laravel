export default function RegisterComponent() {
    return `
    <div class="col-md-6 form-container register-container p-5">
        <div class="text-center mb-4">
            <i class="bi bi-person-plus-fill text-success" style="font-size: 3rem;"></i>
            <h2 class="mt-3 fw-bold">Registrati</h2>
        </div>
                            
        <form id="registerForm">
            <div class="mb-3">
                <label class="form-label">
                    <i class="bi bi-person-fill me-2"></i>Nome
                </label>
                <input 
                    type="text" 
                    class="form-control form-control-lg" 
                    placeholder="Mario Rossi" 
                    name="name" 
                    required 
                />
            </div>
                                
            <div class="mb-3">
                <label class="form-label">
                    <i class="bi bi-envelope-fill me-2"></i>Email
                </label>
                <input 
                    type="email" 
                    class="form-control form-control-lg" 
                    placeholder="tua@email.com" 
                    name="email" 
                    required 
                />
            </div>
                                
            <div class="mb-4">
                <label class="form-label">
                    <i class="bi bi-lock-fill me-2"></i>Password
                </label>
                <input 
                    type="password" 
                    class="form-control form-control-lg" 
                    placeholder="••••••••" 
                    name="password" 
                    required 
                />
            </div>
                                
            <div class="d-grid">
                <button type="submit" class="btn btn-success btn-lg">
                    <i class="bi bi-person-check-fill me-2"></i>Registrati
                </button>
            </div>
        </form>
    </div>
    `;
}
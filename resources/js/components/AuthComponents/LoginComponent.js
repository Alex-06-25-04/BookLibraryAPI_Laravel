export default function LoginComponent() {
    return `
    <div class="col-md-6 form-container login-container p-5">
        <div class="text-center mb-4">
            <i class="bi bi-archive-fill text-primary" style="font-size: 3rem;"></i>
            <h2 class="mt-3 fw-bold">Accedi</h2>
        </div>
                            
        <form id="loginForm">
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
                <button type="submit" class="btn btn-primary btn-lg">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Login
                </button>
            </div>
        </form>
    </div>
    `;
}
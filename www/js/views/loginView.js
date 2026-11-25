/**
 * W-00: Pantalla de Inicio de Sesión Único con Detección Automática por Dominio Oficial
 * APF3 - Diseño de Productos y Servicios (UTP Arequipa)
 * 
 * Dominios del Ecosistema SafeTeen:
 * - Conductor Joven (Hijo): @safeteen.ford.pe (Dominio exclusivo de la app)
 * - Tutor Familiar (Padre): @gmail.com / dominios personales de los padres
 * 
 * Diseño ultra-intuitivo, responsivo para todos los teléfonos (iOS & Android).
 */

window.ViewLogin = (function () {
    function render(container) {
        container.innerHTML = `
            <div class="w-full max-w-sm mx-auto my-auto p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl animate-fadeIn text-left">
                
                <!-- Encabezado y Logotipo Oficial Ford -->
                <div class="text-center mb-5">
                    <div class="w-16 h-9 rounded-full bg-[#002c6c] border-2 border-white/90 flex items-center justify-center font-black italic tracking-tighter text-white text-sm shadow-xl shadow-blue-950 mx-auto mb-3">
                        Ford
                    </div>
                    <h2 class="text-lg font-black text-white tracking-tight leading-tight">
                        Ford SafeTeen Co-Drive
                    </h2>
                    <p class="text-xs text-gray-400 mt-1">
                        Ecosistema Telemático y de Aprendizaje Familiar
                    </p>
                </div>

                <!-- Notificación de Formulario Unificado -->
                <div class="mb-4 p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-[11px] text-cyan-200 flex items-center gap-2.5">
                    <span class="text-lg shrink-0">🔐</span>
                    <span class="leading-tight">
                        Acceso único: tu rol se asigna automáticamente según el dominio de tu cuenta.
                    </span>
                </div>

                <!-- Formulario de Autenticación -->
                <form id="form-auth" class="space-y-4" onsubmit="return false;">
                    
                    <!-- Caja de Error Dinámico -->
                    <div id="auth-error-box" class="hidden p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-xs text-red-200 leading-tight">
                    </div>

                    <!-- Campo Correo Electrónico con Detección de Dominio -->
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <label class="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                                Correo Electrónico
                            </label>
                            <!-- Badge de Detección Dinámica -->
                            <span id="domain-badge" class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-gray-400 border border-slate-700">
                                Ingresa tu correo
                            </span>
                        </div>
                        <input 
                            type="email" 
                            id="auth-email" 
                            placeholder="tomas@safeteen.ford.pe o ricardo@gmail.com" 
                            value="tomas@safeteen.ford.pe"
                            autocomplete="email"
                            class="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono">
                    </div>

                    <!-- Campo Contraseña -->
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <label class="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                                Contraseña
                            </label>
                            <span class="text-[9px] text-gray-400">Mín. 6 caracteres</span>
                        </div>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="auth-password" 
                                placeholder="••••••••" 
                                value="FordTerritory2026!"
                                autocomplete="current-password"
                                class="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 pr-11 transition-all font-mono">
                            <button 
                                type="button" 
                                id="btn-toggle-password" 
                                aria-label="Mostrar u ocultar contraseña"
                                class="absolute right-3 top-3 text-gray-400 hover:text-white text-base transition-colors p-1">
                                👁️
                            </button>
                        </div>
                    </div>

                    <!-- Píldoras de sugerencia rápida (1 Clic para pruebas) -->
                    <div class="pt-1">
                        <div class="text-[9px] text-gray-400 uppercase font-mono mb-1.5">
                            💡 Cuentas del Ecosistema SafeTeen:
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button type="button" id="pill-fill-tomas" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono transition-all active:scale-95 flex items-center gap-1">
                                <span>🚗</span>
                                <span>tomas@safeteen.ford.pe (Hijo)</span>
                            </button>
                            <button type="button" id="pill-fill-ricardo" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-blue-500/40 text-[10px] text-blue-300 font-mono transition-all active:scale-95 flex items-center gap-1">
                                <span>👨‍💼</span>
                                <span>ricardo@gmail.com (Padre)</span>
                            </button>
                        </div>
                    </div>

                    <!-- Botón Principal de Inicio de Sesión -->
                    <div class="pt-2">
                        <button 
                            type="button" 
                            id="btn-submit-auth" 
                            class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 active:scale-95 text-white font-extrabold text-xs shadow-xl shadow-cyan-950 transition-all flex items-center justify-center gap-2">
                            <span id="btn-submit-label">Ingresar a Ford SafeTeen</span>
                            <span>›</span>
                        </button>
                    </div>

                </form>

                <!-- Pie Informativo de Seguridad -->
                <div class="mt-5 pt-3 border-t border-slate-800/80 text-center">
                    <div class="text-[10px] text-gray-400 flex items-center justify-center gap-1.5 font-mono">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Autenticación Segura con Supabase DB & Bus CAN</span>
                    </div>
                </div>

            </div>
        `;

        setupListeners(container);
    }

    function setupListeners(container) {
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        const domainBadge = document.getElementById('domain-badge');
        const errorBox = document.getElementById('auth-error-box');
        const btnSubmit = document.getElementById('btn-submit-auth');
        const btnTogglePass = document.getElementById('btn-toggle-password');
        const pillTomas = document.getElementById('pill-fill-tomas');
        const pillRicardo = document.getElementById('pill-fill-ricardo');

        // Actualizar el chip de dominio en tiempo real
        const updateDomainBadge = () => {
            const email = (emailInput.value || '').trim().toLowerCase();
            if (!email) {
                domainBadge.className = 'text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-gray-400 border border-slate-700';
                domainBadge.textContent = 'Ingresa tu correo';
                return;
            }

            const rol = window.SafeTeenAuth ? window.SafeTeenAuth.detectRoleFromDomain(email) : 'tutor';
            if (rol === 'hijo') {
                domainBadge.className = 'text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold';
                domainBadge.textContent = '🚗 Conductor Joven (@safeteen.ford.pe)';
            } else {
                domainBadge.className = 'text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700 font-bold';
                domainBadge.textContent = '👨‍💼 Tutor Familiar (Padre)';
            }
        };

        if (emailInput) {
            emailInput.addEventListener('input', updateDomainBadge);
            updateDomainBadge();
        }

        // Mostrar / ocultar contraseña
        if (btnTogglePass && passwordInput) {
            btnTogglePass.onclick = () => {
                const isPass = passwordInput.type === 'password';
                passwordInput.type = isPass ? 'text' : 'password';
                btnTogglePass.textContent = isPass ? '🔒' : '👁️';
            };
        }

        // Sugerencias de relleno rápido
        if (pillTomas && emailInput) {
            pillTomas.onclick = () => {
                emailInput.value = 'tomas@safeteen.ford.pe';
                passwordInput.value = 'FordTerritory2026!';
                updateDomainBadge();
            };
        }
        if (pillRicardo && emailInput) {
            pillRicardo.onclick = () => {
                emailInput.value = 'ricardo@gmail.com';
                passwordInput.value = 'FordTerritory2026!';
                updateDomainBadge();
            };
        }

        // Enviar formulario
        if (btnSubmit) {
            btnSubmit.onclick = async () => {
                if (errorBox) errorBox.classList.add('hidden');
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = `<span class="animate-spin inline-block mr-1">⏳</span> Validando credenciales...`;

                try {
                    const email = emailInput.value;
                    const password = passwordInput.value;

                    // Llamada al cliente unificado de autenticación
                    const user = await window.SafeTeenAuth.login(email, password);

                    // Notificar inicio de sesión exitoso
                    if (window.SafeTeenApp && window.SafeTeenApp.onUserLoggedIn) {
                        window.SafeTeenApp.onUserLoggedIn(user);
                    }
                } catch (err) {
                    if (errorBox) {
                        errorBox.textContent = err.message || 'Error al iniciar sesión.';
                        errorBox.classList.remove('hidden');
                        errorBox.classList.remove('animate-shake');
                        void errorBox.offsetWidth; // Reflow
                        errorBox.classList.add('animate-shake');
                    }
                    if (window.SafeTeenUtils) {
                        window.SafeTeenUtils.triggerHaptic([100, 50, 100]);
                    }
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = `<span>Ingresar a Ford SafeTeen</span> <span>›</span>`;
                }
            };
        }
    }

    return {
        render: render
    };
})();

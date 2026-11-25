/**
 * W-05: Manual de Uso y Onboarding Familiar Paso a Paso
 * Guía de inducción para nuevos usuarios y familias (Figura 11 del APF3)
 */

window.ViewOnboarding = (function () {
    function render(container) {
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-4 max-w-md mx-auto">
                <!-- Barra Superior -->
                <div class="flex justify-between items-center mb-4 border-b pb-2 ${esBalsamiq ? 'border-dashed border-gray-400' : 'border-slate-800'}">
                    <button type="button" id="btn-back-onboarding" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
                        &lt; Atrás
                    </button>
                    <div class="text-center">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-blue-400">Manual de Uso y Guía</h2>
                        <span class="text-[10px] text-gray-400">Inducción Paso a Paso</span>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        [Guía]
                    </span>
                </div>

                <div class="text-center mb-4">
                    <div class="text-xs font-bold uppercase tracking-wide text-white">
                        ONBOARDING: PASO A PASO FAMILIAR
                    </div>
                    <div class="text-[10px] text-gray-400 mt-0.5">
                        Guía rápida de configuración y uso inicial
                    </div>
                </div>

                <!-- Pasos 1 al 4 -->
                <div class="space-y-3 mb-5">
                    <!-- Paso 1 -->
                    <div class="card-section p-3 rounded-xl border flex items-start gap-3 ${esBalsamiq ? 'border-black bg-white text-black' : 'border-blue-500/30 bg-slate-900/80 text-gray-200'}">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-md">
                            1
                        </div>
                        <div>
                            <div class="font-bold text-xs text-blue-400">Paso 1: Vincular Vehículo con SYNC 4</div>
                            <p class="text-[10px] text-gray-400 mt-0.5">
                                Enciende el vehículo y abre FordPass. Ingresa el VIN de tu Ford Territory (3FADP4BJ9NM82143) para sincronizar telemetría de bus CAN en segundo plano sin cables.
                            </p>
                        </div>
                    </div>

                    <!-- Paso 2 -->
                    <div class="card-section p-3 rounded-xl border flex items-start gap-3 ${esBalsamiq ? 'border-black bg-white text-black' : 'border-indigo-500/30 bg-slate-900/80 text-gray-200'}">
                        <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-md">
                            2
                        </div>
                        <div>
                            <div class="font-bold text-xs text-indigo-400">Paso 2: Pactar Contrato Digital</div>
                            <p class="text-[10px] text-gray-400 mt-0.5">
                                Padre e hijo definen el Score meta semanal (ej. 88 pts) y seleccionan las geocercas autorizadas de arribo seguro (Campus UTP, Hogar).
                            </p>
                        </div>
                    </div>

                    <!-- Paso 3 -->
                    <div class="card-section p-3 rounded-xl border flex items-start gap-3 ${esBalsamiq ? 'border-black bg-white text-black' : 'border-emerald-500/30 bg-slate-900/80 text-gray-200'}">
                        <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-md">
                            3
                        </div>
                        <div>
                            <div class="font-bold text-xs text-emerald-400">Paso 3: Conducir en Modo Silencioso</div>
                            <p class="text-[10px] text-gray-400 mt-0.5">
                                Maneja con comodidad. La pantalla SYNC 4 guía con resplandor ambiental cian sutil y Co-Pilot360 contextualiza frenadas sin pitidos agresivos ni estresantes.
                            </p>
                        </div>
                    </div>

                    <!-- Paso 4 -->
                    <div class="card-section p-3 rounded-xl border flex items-start gap-3 ${esBalsamiq ? 'border-black bg-white text-black' : 'border-amber-500/30 bg-slate-900/80 text-gray-200'}">
                        <div class="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-md">
                            4
                        </div>
                        <div>
                            <div class="font-bold text-xs text-amber-400">Paso 4: Llegada Segura y Score</div>
                            <p class="text-[10px] text-gray-400 mt-0.5">
                                Al engranar Park (P), el tutor recibe el push instantáneo con batería del móvil y el joven revisa su Score, racha e insignias post-viaje.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Botón de Tour Interactivo -->
                <button id="btn-iniciar-tour" class="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${esBalsamiq ? 'bg-black text-white' : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500'}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>INICIAR TOUR INTERACTIVO</span>
                </button>
            </div>
        `;

        const btnBack = container.querySelector('#btn-back-onboarding');
        if (btnBack) {
            btnBack.onclick = () => window.SafeTeenApp && window.SafeTeenApp.goBackHome();
        }

        container.querySelector('#btn-iniciar-tour').onclick = function () {
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: 'Tour Guiado Ford SafeTeen',
                    message: '1. En la barra inferior puedes navegar entre tu Dashboard de Conducción, la vista de Paz Mental Familiar, el Contrato Digital y el Modo Inclusivo.\n\n2. Con el botón flotante [🎮 Simular CAN] puedes experimentar eventos en tiempo real (frenadas defensivas de Co-Pilot360, sirenas de emergencia y arribo seguro en Park).',
                    icon: '🚀',
                    confirmText: '¡Comenzar Experiencia!'
                });
            }
        };
    }

    return { render: render };
})();

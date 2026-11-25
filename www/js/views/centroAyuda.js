/**
 * W-06: Centro de Ayuda, Soporte Técnico y Preguntas Frecuentes (FAQ)
 * Resuelve las dudas críticas de padres e hijos sobre privacidad y scoring (Figura 12 del APF3)
 */

window.ViewCentroAyuda = (function () {
    function render(container) {
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-4 max-w-md mx-auto">
                <!-- Barra Superior -->
                <div class="flex justify-between items-center mb-4 border-b pb-2 ${esBalsamiq ? 'border-dashed border-gray-400' : 'border-slate-800'}">
                    <button type="button" id="btn-back-ayuda" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
                        &lt; Atrás
                    </button>
                    <div class="text-center">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-blue-400">Centro de Ayuda y FAQ</h2>
                        <span class="text-[10px] text-gray-400">Soporte y Transparencia Ford</span>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        [ ? ]
                    </span>
                </div>

                <!-- Buscador Contextual -->
                <div class="mb-4">
                    <div class="relative">
                        <input type="text" id="input-faq-search" placeholder="Buscar dudas, privacidad, scoring o soporte..." class="w-full py-2 pl-8 pr-3 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400">
                        <span class="absolute left-2.5 top-2.5 text-xs text-gray-400">🔍</span>
                    </div>
                </div>

                <!-- Lista de Preguntas Frecuentes Desplegables -->
                <div class="space-y-3 mb-5" id="faq-list">
                    <!-- FAQ 1 -->
                    <div class="faq-item card-section p-3 rounded-xl border cursor-pointer transition-all ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                        <div class="flex justify-between items-center font-bold text-xs text-cyan-400">
                            <span>[?] ¿Cómo se calcula mi Score (0 a 100)?</span>
                            <span class="faq-icon text-xs">+</span>
                        </div>
                        <div class="faq-content text-[11px] text-gray-300 mt-2 space-y-1.5 hidden border-t border-slate-800/60 pt-2">
                            <p>El Score de Conducción se calcula en tiempo real con datos matemáticos del bus CAN vehicular:</p>
                            <ul class="list-disc pl-4 space-y-0.5 text-gray-400">
                                <li><strong>40% Suavidad de frenado:</strong> Evalúa la presión hidráulica del cilindro maestro ABS (0 a 180 bar).</li>
                                <li><strong>30% Mantenimiento de carril:</strong> Proporcionado por las cámaras Co-Pilot360.</li>
                                <li><strong>30% Velocidad reglamentaria:</strong> Lectura directa de sensores de rotación de rueda.</li>
                            </ul>
                            <p class="text-emerald-400 font-semibold mt-1">
                                🛡️ ¿Frenaste por un perro o bache? Co-Pilot360 detecta el obstáculo frontal y cataloga la maniobra como "Frenada Defensiva Legítima" SIN descontar ningún punto.
                            </p>
                        </div>
                    </div>

                    <!-- FAQ 2 -->
                    <div class="faq-item card-section p-3 rounded-xl border cursor-pointer transition-all ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                        <div class="flex justify-between items-center font-bold text-xs text-cyan-400">
                            <span>[?] ¿Por qué mis padres no ven mi mapa en vivo?</span>
                            <span class="faq-icon text-xs">+</span>
                        </div>
                        <div class="faq-content text-[11px] text-gray-300 mt-2 space-y-1.5 hidden border-t border-slate-800/60 pt-2">
                            <p>Ford SafeTeen Co-Drive erradica el modelo de vigilancia satelital carcelaria (tipo Life360). La política de privacidad del ecosistema garantiza:</p>
                            <p>1. <strong>Cero espionaje de rutas:</strong> Tus padres nunca verán el mapa continuo de las calles donde manejas.</p>
                            <p>2. <strong>Confirmación por Geocercas:</strong> El tutor solo recibe un mensaje de paz mental cuando el vehículo ingresa a la zona pactada (Campus UTP u Hogar) y engranas Park (P).</p>
                        </div>
                    </div>

                    <!-- FAQ 3 -->
                    <div class="faq-item card-section p-3 rounded-xl border cursor-pointer transition-all ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                        <div class="flex justify-between items-center font-bold text-xs text-cyan-400">
                            <span>[?] ¿Qué ocurre si mi celular se queda sin batería?</span>
                            <span class="faq-icon text-xs">+</span>
                        </div>
                        <div class="faq-content text-[11px] text-gray-300 mt-2 space-y-1.5 hidden border-t border-slate-800/60 pt-2">
                            <p>Se disipa el pánico parental: Cuando arribas al destino, el sistema transmite el estado de batería del smartphone (ej. 84%) y confirma que el auto quedó apagado y bloqueado con cero llamadas en tránsito.</p>
                            <p>Si el teléfono se apaga después, los padres ya cuentan con la tranquilidad de que llegaste sano y salvo.</p>
                        </div>
                    </div>
                </div>

                <!-- Módulo de Soporte Técnico 24/7 -->
                <div class="card-section p-3.5 rounded-xl border text-center ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/90 text-gray-300'}">
                    <div class="text-xs font-bold text-white mb-1">¿Necesitas más asistencia familiar?</div>
                    <div class="text-[10px] text-gray-400 mb-3">Atención Ford SafeTeen 24/7 disponible</div>
                    <button id="btn-contactar-soporte" class="w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r from-blue-700 to-cyan-700 text-white hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
                        <span>📞 CONTACTAR SOPORTE FORD</span>
                    </button>
                </div>
            </div>
        `;

        // Acordeones interactivos
        const btnBack = container.querySelector('#btn-back-ayuda');
        if (btnBack) {
            btnBack.onclick = () => window.SafeTeenApp && window.SafeTeenApp.goBackHome();
        }

        container.querySelectorAll('.faq-item').forEach(item => {
            item.onclick = function () {
                const content = item.querySelector('.faq-content');
                const icon = item.querySelector('.faq-icon');
                const isHidden = content.classList.contains('hidden');
                
                // cerrar todos
                container.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
                container.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

                if (isHidden) {
                    content.classList.remove('hidden');
                    icon.textContent = '−';
                }
            };
        });

        // Búsqueda en FAQ
        const inputSearch = container.querySelector('#input-faq-search');
        inputSearch.oninput = function () {
            const query = inputSearch.value.toLowerCase();
            container.querySelectorAll('.faq-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        };

        container.querySelector('#btn-contactar-soporte').onclick = function () {
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: 'Línea de Asistencia Ford SafeTeen',
                    message: 'Conectando con la Central de Telemetría y Soporte Arequipa (0800-FORD-CARE). Asistencia en ruta 24/7 disponible.',
                    icon: '📞',
                    confirmText: 'Llamar al 0800-FORD',
                    cancelText: 'Cerrar',
                    onConfirm: () => {
                        window.SafeTeenUtils.showToast('Llamada en Curso', 'Conectando con soporte técnico Ford...', '📞', 'info');
                    }
                });
            }
        };
    }

    return { render: render };
})();

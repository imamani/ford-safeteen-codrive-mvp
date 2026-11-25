/**
 * W-03: Modo Inclusivo & Accesibilidad Sensorial Universal
 * Diseñado para Mateo Huarca (Figura 9 del APF3, RF-13, RF-14, WCAG 2.2 y ISO 9241-171)
 */

window.ViewModoInclusivo = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const perfil = state.perfiles.mateo;
        const config = perfil.configAccesibilidad;
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-4 max-w-md mx-auto">
                <!-- Barra Superior -->
                <div class="flex justify-between items-center mb-4 border-b pb-2 ${esBalsamiq ? 'border-dashed border-gray-400' : 'border-slate-800'}">
                    <button type="button" id="btn-back-inclusivo" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
                        &lt; Atrás
                    </button>
                    <div class="text-center">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-cyan-400">Accesibilidad Sensorial</h2>
                        <span class="text-[10px] text-gray-400">Inclusión Universal ISO 9241-171</span>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        [Inclusivo]
                    </span>
                </div>

                <!-- Tarjeta de Identidad Inclusiva -->
                <div class="text-center mb-4 p-2.5 rounded-lg border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200'}">
                    <div class="text-[11px] font-bold uppercase">
                        PERFIL INCLUSIVO: ${perfil.nombre} (21 AÑOS)
                    </div>
                    <div class="text-[9px] text-cyan-300/80 mt-0.5">
                        Condición: ${perfil.condicion}
                    </div>
                </div>

                <!-- Switch 1: Sustitución de Pitidos por Luces SYNC 4 -->
                <div class="card-section p-3 rounded-xl mb-3 border flex items-center justify-between ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="pr-3">
                        <div class="font-bold text-xs text-white">Sustitución de Pitidos por Luces SYNC 4</div>
                        <div class="text-[10px] text-gray-400 mt-0.5">
                            Reemplaza alarmas acústicas con franjas cromáticas en pantalla de 12'' (Cian / Ámbar).
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" id="chk-luces" class="sr-only peer" ${config.lucesSync4 ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                </div>

                <!-- Switch 2: Pulsos Hápticos en Volante y Asiento -->
                <div class="card-section p-3 rounded-xl mb-3 border flex items-center justify-between ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="pr-3">
                        <div class="font-bold text-xs text-white">Pulsos Hápticos en Volante y Asiento</div>
                        <div class="text-[10px] text-gray-400 mt-0.5">
                            Vibración direccional para cambio involuntario de carril y alerta de punto ciego (BLIS).
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" id="chk-haptico" class="sr-only peer" ${config.pulsosHapticos ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                </div>

                <!-- Switch 3: Detector Inteligente de Sirenas Externas -->
                <div class="card-section p-3 rounded-xl mb-3 border flex items-center justify-between ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="pr-3">
                        <div class="font-bold text-xs text-white">Detector Inteligente de Sirenas Externas</div>
                        <div class="text-[10px] text-gray-400 mt-0.5">
                            Micrófonos de SYNC 4 procesan frecuencias de ambulancias y proyectan advertencia en clúster.
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" id="chk-sirenas" class="sr-only peer" ${config.detectorSirenas ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                </div>

                <!-- Marco de Vista Previa en Clúster SYNC 4 -->
                <div class="card-section p-3 rounded-xl mb-4 border ${esBalsamiq ? 'border-black bg-gray-100 text-black' : 'border-slate-800 bg-slate-950 text-gray-200'}">
                    <div class="text-[10px] font-mono text-center text-gray-400 mb-2 uppercase">
                        VISTA PREVIA EN CLÚSTER SYNC 4
                    </div>
                    <div class="p-3 rounded-lg bg-red-600 text-white font-bold text-center text-xs shadow-lg animate-pulse flex items-center justify-center gap-2">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        <span>[!] AMBULANCIA APROXIMÁNDOSE POR RETAGUARDIA</span>
                    </div>
                    <div class="text-[9px] text-center text-gray-400 mt-2 font-mono">
                        (Volante: vibración suave izquierda • Clúster: destello ámbar continuo)
                    </div>
                </div>

                <!-- Botones de Acción -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                    <button id="btn-probar-haptico" class="py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide border flex items-center justify-center gap-1.5 transition-all active:scale-95 ${esBalsamiq ? 'border-black bg-white text-black' : 'border-cyan-500 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'}">
                        <span>📲 PROBAR HÁPTICO</span>
                    </button>
                    <button id="btn-guardar-perfil" class="py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all active:scale-95 ${esBalsamiq ? 'bg-black text-white' : 'bg-cyan-600 text-white hover:bg-cyan-500'}">
                        <span>GUARDAR PERFIL</span>
                    </button>
                </div>

                <!-- Botón de Certificado Telemático Inclusivo (RF-14) -->
                <button id="btn-ver-certificado" class="w-full py-2.5 px-3 rounded-xl font-bold text-xs border border-purple-500/50 bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span>VER CERTIFICADO TELEMÁTICO INCLUSIVO (RF-14)</span>
                </button>
            </div>
        `;

        // Interacciones
        const btnBack = container.querySelector('#btn-back-inclusivo');
        if (btnBack) {
            btnBack.onclick = () => window.SafeTeenApp && window.SafeTeenApp.goBackHome();
        }

        container.querySelector('#chk-luces').onchange = function (e) {
            config.lucesSync4 = e.target.checked;
            window.SafeTeenData.save();
        };

        container.querySelector('#chk-haptico').onchange = function (e) {
            config.pulsosHapticos = e.target.checked;
            window.SafeTeenData.save();
        };

        container.querySelector('#chk-sirenas').onchange = function (e) {
            config.detectorSirenas = e.target.checked;
            window.SafeTeenData.save();
        };

        container.querySelector('#btn-probar-haptico').onclick = function () {
            window.CanBusSimulator.probarHaptico();
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.triggerHaptic([180, 50, 180]);
                window.SafeTeenUtils.showToast(
                    'Pulso Háptico Ejecutado',
                    '2 pulsos suaves transmitidos al sector izquierdo del volante (Ford Territory).',
                    '📳',
                    'info'
                );
            }
        };

        container.querySelector('#btn-guardar-perfil').onclick = function () {
            window.SafeTeenData.save();
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showToast(
                    'Perfil Inclusivo Guardado',
                    'Sincronizado con clúster y pantalla SYNC 4 de 12.3".',
                    '💾',
                    'success'
                );
            }
        };

        container.querySelector('#btn-ver-certificado').onclick = function () {
            mostrarModalCertificado(perfil);
        };
    }

    // Modal de Certificación de Conducción Inclusiva (RF-14)
    function mostrarModalCertificado(perfil) {
        let modal = document.getElementById('modal-certificado');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-certificado';
            document.body.appendChild(modal);
        }

        modal.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-slate-900 border-2 border-purple-500 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
                <button id="btn-cerrar-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
                
                <div class="text-center border-b border-purple-500/30 pb-4 mb-4">
                    <div class="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">Ford Motor Company • Telematics Inclusion Lab</div>
                    <h3 class="text-lg font-black mt-1 text-white uppercase">Certificado Telemático de Aptitud y Seguridad Vial Inclusiva</h3>
                    <p class="text-[11px] text-gray-400">Emisión bajo estándar IEEE 830 y directrices de accesibilidad ISO 9241-171</p>
                </div>

                <div class="space-y-3 text-xs">
                    <div class="p-3 bg-purple-950/40 rounded-xl border border-purple-800/40">
                        <div class="text-gray-400 text-[10px]">Titular Conductor:</div>
                        <div class="font-bold text-sm text-white">${perfil.nombre} (DNI 74829103)</div>
                        <div class="text-[11px] text-purple-300 mt-0.5">Diagnóstico: Hipoacusia Neurosensorial Bilateral Moderada a Severa</div>
                    </div>

                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="p-2 bg-slate-800 rounded-lg border border-slate-700">
                            <div class="text-[9px] text-gray-400">Score 30 Días</div>
                            <div class="text-base font-bold text-emerald-400 font-mono">95 / 100</div>
                        </div>
                        <div class="p-2 bg-slate-800 rounded-lg border border-slate-700">
                            <div class="text-[9px] text-gray-400">Siniestros Viales</div>
                            <div class="text-base font-bold text-cyan-400 font-mono">0 (Cero)</div>
                        </div>
                        <div class="p-2 bg-slate-800 rounded-lg border border-slate-700">
                            <div class="text-[9px] text-gray-400">Compensación Visual</div>
                            <div class="text-base font-bold text-purple-400 font-mono">98% Óptima</div>
                        </div>
                    </div>

                    <p class="text-[11px] text-gray-300 leading-relaxed bg-slate-800/50 p-2.5 rounded-lg border border-slate-700">
                        El presente aval digital certifica formalmente ante <strong>entidades de seguros vehiculares</strong> y el núcleo familiar que el conductor opera con tiempos de respuesta neuromotriz y suavidad de pedal superlativos, superando cualquier prejuicio de incapacidad sensorial.
                    </p>
                </div>

                <div class="mt-5 flex gap-2">
                    <button id="btn-imprimir-cert" class="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold transition-all">
                        📄 Descargar Certificado PDF
                    </button>
                    <button id="btn-entendido-cert" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-gray-300">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        modal.querySelector('#btn-cerrar-modal').onclick = () => modal.remove();
        modal.querySelector('#btn-entendido-cert').onclick = () => modal.remove();
        modal.querySelector('#btn-imprimir-cert').onclick = () => {
            modal.remove();
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showToast(
                    'Certificado Generado',
                    'Documento oficial verificado con firma criptográfica de FordPass.',
                    '📄',
                    'success'
                );
            }
        };
    }

    return { render: render };
})();

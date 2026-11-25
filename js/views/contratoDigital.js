/**
 * W-04: Contrato Digital Familiar y Gestión de Geocercas Pactadas
 * Negociación Objetiva entre Tomás y Ricardo (Figura 10 del APF3, RF-10)
 */

window.ViewContratoDigital = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const contrato = state.contratoDigital;
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-4 max-w-md mx-auto">
                <!-- Barra Superior -->
                <div class="flex justify-between items-center mb-4 border-b pb-2 ${esBalsamiq ? 'border-dashed border-gray-400' : 'border-slate-800'}">
                    <button type="button" id="btn-back-contrato" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
                        &lt; Atrás
                    </button>
                    <div class="text-center">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-blue-400">Contrato Digital Familiar</h2>
                        <span class="text-[10px] text-gray-400">Autonomía y Confianza Pactada</span>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        [Acuerdo]
                    </span>
                </div>

                <!-- Cabecera del Acuerdo -->
                <div class="text-center mb-4">
                    <div class="text-xs font-bold uppercase tracking-wide text-white">
                        ACUERDO DE CONFIANZA FAMILIAR
                    </div>
                    <div class="text-[10px] text-gray-400 mt-0.5">
                        Tomás Morales (Hijo) ⇄ Ing. Ricardo Morales (Padre)
                    </div>
                </div>

                <!-- Condición 1: Meta de Score Semanal (Slider interactivo) -->
                <div class="card-section p-3 rounded-xl mb-3 border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-xs text-white">Condición 1: Meta de Score Semanal</span>
                        <span id="score-val" class="font-mono font-extrabold text-sm text-cyan-400">${contrato.scoreMeta} Puntos</span>
                    </div>
                    <div class="text-[10px] text-gray-400 mb-3">
                        Puntaje mínimo de telemetría CAN pactado para desbloquear el préstamo de fin de semana.
                    </div>

                    <div class="px-2">
                        <input type="range" id="slider-score" min="80" max="95" value="${contrato.scoreMeta}" step="1" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400">
                        <div class="flex justify-between text-[9px] text-gray-500 font-mono mt-1">
                            <span>80 pts (Básico)</span>
                            <span>88 pts (Recomendado)</span>
                            <span>95 pts (Máxima Exigencia)</span>
                        </div>
                    </div>
                </div>

                <!-- Condición 2: Geocercas de Arribo Autorizadas -->
                <div class="card-section p-3 rounded-xl mb-3 border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-xs text-white">Condición 2: Geocercas de Arribo Autorizadas</span>
                        <span id="geocercas-activas-count" class="text-[10px] text-emerald-400 font-bold">${contrato.geocercas.filter(g => g.activa).length} Activas</span>
                    </div>
                    <div class="text-[10px] text-gray-400 mb-3">
                        Zonas donde se valida automáticamente la llegada segura sin vigilar rutas.
                    </div>

                    <div class="space-y-2" id="geocercas-lista">
                        ${contrato.geocercas.map((geo, idx) => `
                            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="geo-${idx}" data-idx="${idx}" class="chk-geocerca rounded text-cyan-500 focus:ring-0 cursor-pointer" ${geo.activa ? 'checked' : ''}>
                                    <div>
                                        <label for="geo-${idx}" class="font-bold text-gray-200 cursor-pointer text-[11px]">${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(geo.nombre) : geo.nombre}</label>
                                        <div class="text-[9px] text-gray-400">${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(geo.radio) : geo.radio}</div>
                                    </div>
                                </div>
                                <span class="text-[10px] text-cyan-400 font-mono">📍 Geocerca</span>
                            </div>
                        `).join('')}
                    </div>

                    <button id="btn-agregar-geocerca" class="w-full mt-2 py-1.5 px-3 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 text-[10px] font-bold flex items-center justify-center gap-1">
                        <span>+ Agregar Nueva Geocerca Pactada</span>
                    </button>
                </div>

                <!-- Cláusula de Compromiso Mutuo -->
                <div class="card-section p-3 rounded-xl mb-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-200">
                    <div class="font-bold text-xs mb-1 flex items-center gap-1.5 text-emerald-400">
                        <span>📜 Compromiso de Autonomía Mutua:</span>
                    </div>
                    <p id="contrato-clausula-text" class="text-[11px] leading-relaxed text-gray-300">
                        "${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(contrato.clausula) : contrato.clausula}"
                    </p>
                    <div class="mt-2 text-[10px] text-emerald-300/80 font-mono">
                        Estado actual: <strong>${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(contrato.estadoPermiso) : contrato.estadoPermiso}</strong>
                    </div>
                </div>

                <!-- Botón de Confirmación y Firma -->
                <button id="btn-firmar-contrato" class="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${esBalsamiq ? 'bg-black text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    <span>CONFIRMAR Y FIRMAR CONTRATO DIGITAL</span>
                </button>
            </div>
        `;

        // Eventos
        const btnBack = container.querySelector('#btn-back-contrato');
        if (btnBack) {
            btnBack.onclick = () => window.SafeTeenApp && window.SafeTeenApp.goBackHome();
        }

        const slider = container.querySelector('#slider-score');
        const scoreVal = container.querySelector('#score-val');
        const clausulaText = container.querySelector('#contrato-clausula-text');
        const geocercasCount = container.querySelector('#geocercas-activas-count');

        slider.oninput = function () {
            scoreVal.textContent = slider.value + ' Puntos';
            contrato.scoreMeta = parseInt(slider.value, 10);
            contrato.clausula = `Si Tomás mantiene un Score semanal igual o superior a ${contrato.scoreMeta} puntos, el sistema autoriza automáticamente la llave de la Ford Territory para el fin de semana sin discusiones.`;
            if (clausulaText) {
                clausulaText.textContent = `"${contrato.clausula}"`;
            }
            window.SafeTeenData.save();
        };

        container.querySelectorAll('.chk-geocerca').forEach(chk => {
            chk.onchange = function () {
                const idx = parseInt(this.dataset.idx, 10);
                contrato.geocercas[idx].activa = this.checked;
                if (geocercasCount) {
                    geocercasCount.textContent = `${contrato.geocercas.filter(g => g.activa).length} Activas`;
                }
                window.SafeTeenData.save();
            };
        });

        container.querySelector('#btn-agregar-geocerca').onclick = function () {
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: 'Añadir Geocerca de Arribo',
                    message: 'Ingresa el nombre del destino pactado en Arequipa:',
                    isPrompt: true,
                    placeholder: 'Ej. Mall Aventura Porongoche',
                    icon: '📍',
                    confirmText: 'Añadir Geocerca',
                    cancelText: 'Cancelar',
                    onConfirm: function (nueva) {
                        if (nueva && nueva.trim()) {
                            contrato.geocercas.push({
                                id: 'custom_' + Date.now(),
                                nombre: nueva.trim(),
                                radio: 'Radio 200m • Check-in Automático al engranar Park',
                                activa: true
                            });
                            window.SafeTeenData.save();
                            render(container);
                            window.SafeTeenUtils.showToast('Geocerca Añadida', `Se agregó "${nueva.trim()}" al pacto familiar.`, '📍', 'success');
                        }
                    }
                });
            }
        };

        container.querySelector('#btn-firmar-contrato').onclick = function () {
            contrato.firmado = true;
            window.SafeTeenData.save();
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: 'Contrato Digital Familiar Firmado',
                    message: `Meta fijada: ${contrato.scoreMeta} puntos de telemetría CAN.\n\nCláusulas aceptadas:\n✔ Cero llamadas ni distracciones al volante.\n✔ Cero espionaje de rutas en mapa (respeto a la privacidad).\n✔ Autorización automática de la Ford Territory el fin de semana.`,
                    icon: '📜',
                    confirmText: 'Aceptar Acuerdo'
                });
                window.SafeTeenUtils.showToast('Pacto Familiar Firmado', `Meta fijada en ${contrato.scoreMeta} pts.`, '📜', 'success');
            }
        };
    }

    return { render: render };
})();

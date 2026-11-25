/**
 * W-02: Modo Tutor Familiar - Peace of Mind Dashboard
 * Diseñado para Ricardo Morales (Figura 8 del APF3, RF-04, RF-05, RF-07, RF-09)
 * Telemetría Avanzada inspirada en LiteDash:
 * - Paz Mental por Geocerca y Chequeo en Park (P) (Sin espionaje en mapa)
 * - Salud Mecánica del Vehículo (TPMS 4 Ruedas + Batería 12V + Escáner OBD-II FordPass)
 * - Resumen Semanal de Manejo Agregado
 */

window.ViewTutorFamiliar = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const perfilTutor = state.perfiles.ricardo;
        const perfilJoven = state.perfiles.tomas;
        const arribo = state.ultimoArribo;
        const vehiculo = state.vehiculo;
        const resumen = state.resumenSemanal;
        const tpms = state.tpms || {
            fl: { psi: 35.2 }, fr: { psi: 35.0 }, rl: { psi: 35.1 }, rr: { psi: 35.3 },
            fugaDetectada: false
        };
        const obd = state.obdDiagnostic || {
            estadoGeneral: 'SALUDABLE',
            pidsEnVivo: { voltajeBateria: 12.4 }
        };

        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-2 max-w-md mx-auto space-y-4 pb-8">
                
                <!-- 1. Encabezado de Identidad del Tutor -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                Modo Tutor Familiar
                            </span>
                            <span class="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                                Paz Mental
                            </span>
                        </div>
                        <h2 class="text-sm font-extrabold text-white mt-0.5">
                            ${perfilTutor.nombre}
                        </h2>
                        <div class="text-[10px] text-gray-400 font-mono mt-0.5">
                            Monitoreando: <span class="text-gray-300">${vehiculo.modelo}</span>
                        </div>
                    </div>
                    <div class="w-10 h-10 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                        👨‍💼
                    </div>
                </div>

                <!-- Banner Informativo Anti-Life360 -->
                <div class="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-[11px] text-cyan-200 flex items-center gap-2.5">
                    <span class="text-lg shrink-0">🛡️</span>
                    <span class="leading-tight">
                        <strong>Arquitectura Anti-Life360:</strong> Paz mental por Geocercas de arribo pactadas. Cero espionaje de mapa de calles para proteger la intimidad de tu hijo.
                    </span>
                </div>

                <!-- 2. Peace of Mind Card: Llegada Segura Confirmada -->
                <div class="p-4 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/30 text-xs space-y-3">
                    <div class="flex items-start gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-emerald-950">
                            ✓
                        </div>
                        <div class="flex-1">
                            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                                Notificación de Llegada
                            </span>
                            <h3 class="text-sm font-black text-white mt-0.5">
                                ${arribo.destino}
                            </h3>
                            <div class="text-[11px] text-gray-300 font-mono mt-0.5">
                                Hora de Arribo: <strong class="text-emerald-300">${arribo.hora}</strong>
                            </div>
                        </div>
                    </div>

                    <div class="pt-2.5 border-t border-slate-800 space-y-1.5 text-[11px] text-gray-300">
                        <div class="flex items-center gap-2">
                            <span class="text-emerald-400 font-bold">✔</span>
                            <span>Palanca de Cambios: <strong>${arribo.palancaEstado}</strong></span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-emerald-400 font-bold">✔</span>
                            <span>Seguro de Puertas: <strong>${arribo.bloqueoPuertas}</strong></span>
                        </div>
                    </div>
                </div>

                <!-- 3. Dispositivo Móvil del Joven (RF-05) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-blue-400">Dispositivo Móvil de Tomás</span>
                        <span class="text-[10px] font-mono text-gray-400">Enlace SYNC 4</span>
                    </div>

                    <div>
                        <div class="flex justify-between text-[11px] mb-1">
                            <span class="text-gray-300">Nivel de Batería del Smartphone:</span>
                            <span class="font-bold text-emerald-400 font-mono">${arribo.bateriaJoven}%</span>
                        </div>
                        <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                            <div class="bg-emerald-500 h-2.5 rounded-full" style="width: ${arribo.bateriaJoven}%"></div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 text-[11px] text-gray-300 pt-1">
                        <span class="text-emerald-400 font-bold">●</span>
                        <span>Interacciones con el celular en marcha: <strong class="text-white">${arribo.llamadasEnMarcha} (Cero distracciones)</strong></span>
                    </div>
                    <div class="text-[10px] text-gray-400 italic">
                        * El Modo Conducción bloqueó redes sociales y desvió llamadas no autorizadas al SMS automático.
                    </div>
                </div>

                <!-- 4. Salud Mecánica y Monitoreo TPMS / OBD-II (Inspirado en LiteDash) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div class="flex items-center gap-1.5">
                            <span class="text-base">🛠️</span>
                            <span class="font-extrabold text-cyan-400">Salud Mecánica del Vehículo (FordPass)</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full ${tpms.fugaDetectada ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'} text-[9px] font-mono font-bold">
                            ${tpms.fugaDetectada ? 'Alerta TPMS' : 'Semáforo Verde'}
                        </span>
                    </div>

                    <!-- Estado de Neumáticos TPMS -->
                    <div class="p-3 rounded-xl ${tpms.fugaDetectada ? 'bg-amber-950/30 border border-amber-500/40 text-amber-200' : 'bg-slate-950/80 border border-slate-800'} space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-200 flex items-center gap-1.5">
                                <span>🛞 Presión de Neumáticos (4 Ruedas):</span>
                            </span>
                            <span class="text-[10px] font-mono ${tpms.fugaDetectada ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}">
                                ${tpms.fugaDetectada ? 'FR: 24.2 PSI (Fuga)' : '4x 35 PSI (Óptimo)'}
                            </span>
                        </div>
                        <div class="text-[10px] text-gray-400">
                            ${tpms.fugaDetectada ? 
                                '⚠️ Se detectó caída de presión en rueda delantera derecha. Se le recomendó a Tomás calibrar en el grifo más cercano.' : 
                                'Calibración con compensación térmica a 20°C activa. Cero fugas lentas o súbitas.'
                            }
                        </div>
                    </div>

                    <!-- Estado de Motor y Batería -->
                    <div class="grid grid-cols-2 gap-2 text-[11px]">
                        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                            <div class="text-gray-400 text-[10px]">Batería del Auto (12V)</div>
                            <div class="font-bold text-emerald-400 font-mono mt-0.5">${obd.pidsEnVivo.voltajeBateria} V</div>
                            <div class="text-[9px] text-gray-400 mt-0.5">Alternador & Carga OK</div>
                        </div>
                        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                            <div class="text-gray-400 text-[10px]">Diagnóstico Motor OBD</div>
                            <div class="font-bold text-emerald-400 font-mono mt-0.5">0 Códigos DTC</div>
                            <div class="text-[9px] text-gray-400 mt-0.5">EcoBoost 100% Sano</div>
                        </div>
                    </div>

                    <div class="text-[10px] text-gray-400 flex items-center justify-between border-t pt-2 border-slate-800/80">
                        <span>Próximo Service Oficial Ford:</span>
                        <span class="font-mono font-bold text-white">En ${vehiculo.proximoServiceKm.toLocaleString()} km</span>
                    </div>
                </div>

                <!-- 5. Resumen Semanal Agregado (RF-07) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex justify-between items-center border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-purple-400">Resumen Semanal de Manejo de Tomás:</span>
                        <span class="text-xs font-bold text-emerald-400 font-mono">Promedio ${resumen.promedioScore}/100</span>
                    </div>

                    <!-- Gráfico de Barras Semanal -->
                    <div class="flex items-end justify-between h-16 pt-2 px-1 border-b border-slate-800">
                        ${resumen.diasEvaluados.map(d => `
                            <div class="flex flex-col items-center gap-1 flex-1">
                                <div class="w-5 bg-gradient-to-t from-purple-700 to-cyan-400 rounded-t transition-all hover:scale-105" style="height: ${(d.score - 70) * 1.8}px"></div>
                                <span class="text-[8px] font-mono text-gray-400">${d.dia}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-300 pt-1">
                        <div>Kilometraje: <strong>${resumen.kmRecorridos} km</strong></div>
                        <div>Tiempo al Volante: <strong>${resumen.horasConduccion}</strong></div>
                    </div>
                </div>

                <!-- 6. Botón de Aprobación de Préstamo (RF-10) -->
                <button id="btn-aprobar-prestamo" class="w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>APROBAR PRÉSTAMO FIN DE SEMANA</span>
                </button>

            </div>
        `;

        const btnAprobar = container.querySelector('#btn-aprobar-prestamo');
        if (btnAprobar) {
            btnAprobar.onclick = function () {
                state.contratoDigital.estadoPermiso = 'Aprobado Manualmente por Ricardo Morales';
                window.SafeTeenData.save();
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.showModal({
                        title: 'Préstamo de Vehículo Aprobado',
                        message: '¡Pase digital de la Ford Territory aprobado para el fin de semana! Se ha notificado al celular de Tomás Morales. El modelo de confianza familiar y telemetría objetiva está activo.',
                        icon: '🔑',
                        confirmText: 'Entendido'
                    });
                    window.SafeTeenUtils.showToast('Llave Digital Otorgada', 'Tomás cuenta con autorización vehicular para el fin de semana.', '🔑', 'success');
                }
            };
        }
    }

    return { render: render };
})();

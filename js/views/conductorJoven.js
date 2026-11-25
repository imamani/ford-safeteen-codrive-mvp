/**
 * W-01: Modo Conductor Joven - Dashboard Telemático Integral Post-Viaje y Gamificación
 * Diseñado para Tomás Morales (Figura 7 del APF3, RF-01, RF-02, RF-06)
 * Telemetría Avanzada inspirada en LiteDash:
 * - Computadora de Viaje EcoBoost (Trip Computer: Consumo km/L, Dinámica G-Force)
 * - Monitor TPMS de 4 Ruedas con Compensación Térmica (Ley de Gases Ideales)
 * - Escáner Mecánico Preventivo OBD-II / CAN (SAE J1979 Monitores y DTCs)
 */

window.ViewConductorJoven = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const perfil = state.perfiles.tomas;
        const vehiculo = state.vehiculo;
        const tpms = state.tpms || {
            fl: { psi: 35.2, tempC: 28, status: 'ok', coldPsi: 34.3 },
            fr: { psi: 35.0, tempC: 29, status: 'ok', coldPsi: 34.0 },
            rl: { psi: 35.1, tempC: 27, status: 'ok', coldPsi: 34.4 },
            rr: { psi: 35.3, tempC: 27, status: 'ok', coldPsi: 34.6 },
            fugaDetectada: false,
            alertaFugaTipo: null
        };
        const trip = state.tripStats || {
            distanciaKm: 14.2,
            duracionMin: 22,
            consumoInstantaneoKmL: 14.8,
            consumoPromedioKmGal: 41.8,
            gForceActual: 0.08,
            gForcePico: 0.68,
            frenadoSuaveRatio: 96
        };
        const obd = state.obdDiagnostic || {
            estadoGeneral: 'SALUDABLE',
            dtcActivos: [],
            monitoresEmisiones: [],
            pidsEnVivo: { voltajeBateria: 12.4, presionTurboBoost: 14.2 }
        };
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        // Renderizado del chasis y estado de cada neumático
        const renderRueda = (ruedaKey, label, posClasses) => {
            const r = tpms[ruedaKey] || { psi: 35.0, tempC: 28, status: 'ok', coldPsi: 34.0 };
            const esAlerta = r.status === 'alerta' || r.psi < 28;
            return `
                <div class="p-2.5 rounded-2xl border transition-all ${esAlerta ? 'border-amber-500 bg-amber-950/40 text-amber-300 animate-pulse' : 'border-slate-800 bg-slate-950/80 text-gray-200'}">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-mono font-bold text-gray-400">${label}</span>
                        <span class="text-[9px] font-mono px-1.5 py-0.2 rounded ${esAlerta ? 'bg-amber-500 text-slate-950 font-black' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}">
                            ${esAlerta ? '¡FUGA!' : 'OK'}
                        </span>
                    </div>
                    <div class="mt-1 flex items-baseline gap-1">
                        <span class="text-base font-black font-mono ${esAlerta ? 'text-amber-400' : 'text-white'}">${r.psi.toFixed(1)}</span>
                        <span class="text-[10px] font-mono text-gray-400">PSI</span>
                    </div>
                    <div class="text-[9px] text-gray-400 font-mono flex items-center justify-between mt-0.5">
                        <span>🌡️ ${r.tempC}°C</span>
                        <span title="Compensado a 20°C">❄️ ${r.coldPsi} PSI</span>
                    </div>
                </div>
            `;
        };

        container.innerHTML = `
            <div class="wireframe-screen p-2 max-w-md mx-auto space-y-4 pb-8">
                
                <!-- 1. Cabecera de Identidad del Conductor y Vehículo -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/30 flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                                Modo Conductor Joven
                            </span>
                            <span class="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                                Post-Viaje
                            </span>
                        </div>
                        <h2 class="text-sm font-extrabold text-white mt-0.5">
                            ${perfil.nombre}
                        </h2>
                        <div class="text-[10px] text-gray-400 font-mono mt-0.5 flex items-center gap-1.5">
                            <span>🚙 ${vehiculo.modelo}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-end gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Bus CAN 500k</span>
                        </div>
                        <div class="text-[9px] text-gray-400 font-mono mt-0.5">
                            📱 Batería: ${perfil.bateriaMovil}%
                        </div>
                    </div>
                </div>

                <!-- 2. Dial Circular de Score Global (94/100) y Coaching -->
                <div class="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-xl">
                    <div class="flex flex-col items-center justify-center my-1">
                        <div class="relative w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 score-dial-glow bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 border-4 border-emerald-500">
                            <div class="text-4xl font-black tracking-tight text-emerald-400 font-mono leading-none">
                                ${perfil.scoreActual}
                            </div>
                            <div class="text-[11px] font-mono text-gray-400 mt-0.5">
                                / 100
                            </div>
                            <div class="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ${perfil.nivelTexto}
                            </div>
                        </div>
                        <div class="text-[10px] text-gray-400 mt-2 font-mono">
                            ⚡ Ponderación Objetiva por Sensores CAN Vehiculares
                        </div>
                    </div>

                    <!-- Cuadro de Coaching Constructivo (Inspirado en MOTOsafety / Sin Regaños) -->
                    <div class="mt-3 p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 text-left">
                        <div class="flex items-center gap-1.5 font-bold text-cyan-300 mb-1">
                            <span>💡 Coaching Pedagógico (Sin Regaños):</span>
                        </div>
                        <p class="text-[10px] text-gray-300 leading-relaxed">
                            Excelente modulación de pedal en Av. Ejército. Tu frenado anticipado (<strong>96%</strong>) mantuvo tu Score por encima de la meta del Contrato Familiar (<strong>88 pts</strong>), asegurando tu autonomía para el fin de semana.
                        </p>
                    </div>
                </div>

                <!-- 3. Computadora de Viaje EcoBoost (Inspirada en LiteDash) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-cyan-400 flex items-center gap-1.5">
                            <span>📊 Computadora de Viaje EcoBoost</span>
                        </span>
                        <span class="text-[10px] font-mono text-gray-400">Último Tramo: Av. Ejército</span>
                    </div>

                    <!-- Grilla de 4 Métricas de Viaje -->
                    <div class="grid grid-cols-2 gap-2.5">
                        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                            <div class="text-[9px] font-mono uppercase text-gray-400">Distancia y Tiempo</div>
                            <div class="text-sm font-black text-white font-mono mt-0.5">${trip.distanciaKm} km</div>
                            <div class="text-[9px] text-cyan-300 font-mono mt-0.5">⏱️ ${trip.duracionMin} min en ruta</div>
                        </div>

                        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                            <div class="text-[9px] font-mono uppercase text-gray-400">Consumo de Combustible</div>
                            <div class="text-sm font-black text-emerald-400 font-mono mt-0.5">${trip.consumoInstantaneoKmL} km/L</div>
                            <div class="text-[9px] text-gray-400 font-mono mt-0.5">~${trip.consumoPromedioKmGal} km/galón</div>
                        </div>

                        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                            <div class="text-[9px] font-mono uppercase text-gray-400">Dinámica G-Force</div>
                            <div class="text-sm font-black text-white font-mono mt-0.5">${trip.gForceActual}G</div>
                            <div class="text-[9px] text-blue-300 font-mono mt-0.5">Pico Defensivo: ${trip.gForcePico}G</div>
                        </div>

                        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                            <div class="text-[9px] font-mono uppercase text-gray-400">Eficiencia de Manejo</div>
                            <div class="text-sm font-black text-emerald-400 font-mono mt-0.5">${trip.frenadoSuaveRatio}%</div>
                            <div class="text-[9px] text-emerald-300 font-mono mt-0.5">Suavidad de Frenado</div>
                        </div>
                    </div>
                </div>

                <!-- 4. Monitor de Presión de Neumáticos TPMS (4 Ruedas + Ley de Gases Ideales) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div class="flex items-center gap-1.5">
                            <span class="text-base">🛞</span>
                            <span class="font-extrabold text-white">Monitor TPMS de 4 Ruedas</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full bg-blue-950 text-cyan-300 border border-blue-800 text-[9px] font-mono">
                            Física P₁/T₁ = P₂/T₂
                        </span>
                    </div>

                    <!-- Visualizador 2x2 del Chasis Ford Territory -->
                    <div class="relative bg-slate-950/90 p-3 rounded-2xl border border-slate-800">
                        <div class="text-[9px] text-center font-mono text-gray-400 uppercase tracking-widest mb-2">
                            ▲ Frente del Vehículo (Dirección de Marcha) ▲
                        </div>

                        <div class="grid grid-cols-2 gap-2.5">
                            <!-- Eje Delantero -->
                            ${renderRueda('fl', 'DEL. IZQ. (FL)', '')}
                            ${renderRueda('fr', 'DEL. DER. (FR)', '')}

                            <!-- Eje Trasero -->
                            ${renderRueda('rl', 'TRAS. IZQ. (RL)', '')}
                            ${renderRueda('rr', 'TRAS. DER. (RR)', '')}
                        </div>

                        <div class="text-[9px] text-center font-mono text-gray-400 mt-2.5">
                            ▼ Eje Posterior • Maletero ▼
                        </div>
                    </div>

                    <!-- Explicación de Compensación Térmica / Alerta -->
                    <div class="p-2.5 rounded-xl ${tpms.fugaDetectada ? 'bg-amber-950/40 border border-amber-500/50 text-amber-200' : 'bg-slate-950 border border-slate-800/80 text-gray-400'} text-[10px] leading-relaxed">
                        ${tpms.fugaDetectada ? `
                            <div class="font-bold text-amber-400 flex items-center justify-between mb-1">
                                <span>⚠️ ALERTA TPMS: Fuga Rápida en Rueda Delantera Derecha (FR)</span>
                                <button id="btn-reparar-tpms" class="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[9px] active:scale-95">
                                    Calibrar
                                </button>
                            </div>
                            <div class="text-[9px] text-amber-300">
                                La presión cayó a 24.2 PSI. El algoritmo físico detectó fuga súbita descartando enfriamiento ambiental.
                            </div>
                        ` : `
                            <div class="flex items-center gap-1.5 text-gray-300">
                                <span>⚖️</span>
                                <span><strong>Compensación Térmica Activa:</strong> La presión en frío (20°C estándar) se calcula en vivo para evitar falsas alarmas por el calor del asfalto en Arequipa.</span>
                            </div>
                        `}
                    </div>
                </div>

                <!-- 5. Taller FordPass & Escáner OBD-II / CAN -->
                <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div class="flex items-center gap-1.5">
                            <span class="text-base">🔧</span>
                            <span class="font-extrabold text-white">Taller FordPass & Diagnóstico OBD-II</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-mono font-bold">
                            0 Códigos DTC
                        </span>
                    </div>

                    <p class="text-[10px] text-gray-300 leading-relaxed">
                        Monitoreo continuo de salud mecánica del motor 1.5L EcoBoost. El vehículo no presenta fallas activas ni anomalías en el sistema de inyección o emisiones.
                    </p>

                    <!-- PIDs Clave -->
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Batería 12V</div>
                            <div class="text-xs font-bold text-emerald-400 font-mono mt-0.5">${obd.pidsEnVivo.voltajeBateria} V</div>
                            <div class="text-[8px] text-gray-400 font-mono">Saludable</div>
                        </div>
                        <div class="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Refrigerante</div>
                            <div class="text-xs font-bold text-cyan-300 font-mono mt-0.5">${obd.pidsEnVivo.temperaturaRefrigerante ?? 90}°C</div>
                            <div class="text-[8px] text-gray-400 font-mono">Normal</div>
                        </div>
                        <div class="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Turbo Boost</div>
                            <div class="text-xs font-bold text-blue-400 font-mono mt-0.5">${obd.pidsEnVivo.presionTurboBoost} PSI</div>
                            <div class="text-[8px] text-gray-400 font-mono">Presión GDI</div>
                        </div>
                    </div>

                    <!-- Botón para Iniciar Escáner OBD-II -->
                    <button id="btn-ejecutar-scan-obd" class="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-950/40">
                        <span>🔍</span>
                        <span>Escanear Monitores de Emisiones y Motor (SAE J1979)</span>
                    </button>
                </div>

                <!-- 6. Desglose Telemático Post-Viaje -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-cyan-400">Desglose Telemático de Ponderación CAN</span>
                        <span class="text-[10px] text-gray-400 font-mono">Fórmula APF3</span>
                    </div>

                    <!-- Métrica 1: Frenado Suave -->
                    <div>
                        <div class="flex justify-between text-[11px] mb-1">
                            <span class="font-medium flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                                <span>Frenado Suave y Anticipado (40%)</span>
                            </span>
                            <span class="font-bold text-emerald-400 font-mono">${perfil.desgloseScore.frenadoSuave}%</span>
                        </div>
                        <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                            <div class="bg-emerald-500 h-2.5 rounded-full transition-all duration-700" style="width: ${perfil.desgloseScore.frenadoSuave}%"></div>
                        </div>
                        <span class="text-[9px] text-gray-400 mt-0.5 block">Co-Pilot360 validó frenadas preventivas sin penalizar</span>
                    </div>

                    <!-- Métrica 2: Mantenimiento de Carril -->
                    <div>
                        <div class="flex justify-between text-[11px] mb-1">
                            <span class="font-medium flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                                <span>Mantenimiento de Carril (30%)</span>
                            </span>
                            <span class="font-bold text-cyan-400 font-mono">${perfil.desgloseScore.controlCarril}%</span>
                        </div>
                        <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                            <div class="bg-cyan-500 h-2.5 rounded-full transition-all duration-700" style="width: ${perfil.desgloseScore.controlCarril}%"></div>
                        </div>
                        <span class="text-[9px] text-gray-400 mt-0.5 block">Cero desvíos bruscos en Av. Ejército</span>
                    </div>

                    <!-- Métrica 3: Velocidad Controlada -->
                    <div>
                        <div class="flex justify-between text-[11px] mb-1">
                            <span class="font-medium flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                                <span>Velocidad Urbana Controlada (30%)</span>
                            </span>
                            <span class="font-bold text-blue-400 font-mono">${perfil.desgloseScore.velocidadRuta}%</span>
                        </div>
                        <div class="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                            <div class="bg-blue-500 h-2.5 rounded-full transition-all duration-700" style="width: ${perfil.desgloseScore.velocidadRuta}%"></div>
                        </div>
                        <span class="text-[9px] text-gray-400 mt-0.5 block">Cumplimiento del límite urbano de 50 km/h</span>
                    </div>
                </div>

                <!-- 7. Racha e Insignias de Gamificación -->
                <div class="p-4 rounded-2xl bg-amber-950/20 border-2 border-dashed border-amber-500/40 text-xs space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wide text-amber-400">
                            <span>🔥 Racha de Manejo Seguro: ${perfil.rachaDias} DÍAS</span>
                        </div>
                        <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                            +150 pts XP
                        </span>
                    </div>

                    <div class="grid grid-cols-4 gap-2 text-center">
                        ${perfil.insignias.map(badge => `
                            <div class="p-2 rounded-xl border border-amber-500/30 bg-slate-950/80 flex flex-col items-center justify-center transition-all hover:scale-105">
                                <div class="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1 text-xs">
                                    ★
                                </div>
                                <div class="text-[9px] font-bold leading-tight text-white line-clamp-1">${badge.nombre}</div>
                                <div class="text-[8px] text-amber-300 font-mono mt-0.5">${badge.nivel}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 8. Botón Principal: Compartir Score con Tutor -->
                <button id="btn-compartir-score" class="w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-cyan-950">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    <span>COMPARTIR SCORE CON TUTOR RICARDO</span>
                </button>

                <!-- 9. Modo Parada Rápida (RF-11) -->
                <div class="p-3 rounded-2xl border flex items-center justify-between text-xs ${state.privacidad.modoParadaRapida ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-slate-800 bg-slate-900/60 text-gray-400'}">
                    <div class="flex items-center gap-2">
                        <span class="text-base">⏱️</span>
                        <div>
                            <div class="font-bold text-white text-[11px]">Parada Rápida (RF-11)</div>
                            <div class="text-[9px] text-gray-400">Pausa privada de 15 min en farmacia/tienda</div>
                        </div>
                    </div>
                    <button id="btn-toggle-parada" class="px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${state.privacidad.modoParadaRapida ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-white border border-slate-700'}">
                        ${state.privacidad.modoParadaRapida ? 'Activa (15 min)' : 'Activar'}
                    </button>
                </div>

            </div>
        `;

        // =====================================================================
        // EVENTOS INTERACTIVOS
        // =====================================================================

        // Botón Compartir Score
        const btnCompartir = container.querySelector('#btn-compartir-score');
        if (btnCompartir) {
            btnCompartir.onclick = function () {
                if (window.SafeTeenUtils) {
                    const meta = state.contratoDigital ? state.contratoDigital.scoreMeta : 88;
                    const aprobado = perfil.scoreActual >= meta;
                    window.SafeTeenUtils.showModal({
                        title: 'Score Semanal Transmitido',
                        message: `¡Score telemático de ${perfil.scoreActual} puntos transmitido al tutor Ricardo Morales! ${aprobado ? `El Contrato Digital (>= ${meta} pts) validó tu récord semanal y el préstamo del fin de semana queda aprobado automáticamente.` : `Meta pactada: ${meta} pts.`}`,
                        icon: '🏆',
                        confirmText: 'Genial, Entendido'
                    });
                }
            };
        }

        // Botón Parada Rápida
        const btnParada = container.querySelector('#btn-toggle-parada');
        if (btnParada) {
            btnParada.onclick = function () {
                window.CanBusSimulator.toggleModoParadaRapida();
                render(container);
            };
        }

        // Botón Reparar / Calibrar TPMS
        const btnRepararTpms = container.querySelector('#btn-reparar-tpms');
        if (btnRepararTpms) {
            btnRepararTpms.onclick = function () {
                window.CanBusSimulator.simularRestaurarTPMS();
                render(container);
            };
        }

        // Botón Ejecutar Escáner OBD-II
        const btnScanObd = container.querySelector('#btn-ejecutar-scan-obd');
        if (btnScanObd) {
            btnScanObd.onclick = function () {
                if (!window.SafeTeenUtils) return;

                // Diálogo inicial con barra de progreso de escaneo
                window.SafeTeenUtils.showModal({
                    title: 'Escáner OBD-II en Curso...',
                    customHtml: `
                        <div class="py-2 text-left space-y-3">
                            <div class="text-[11px] text-gray-300">
                                Conectando al puerto OBD-II / CAN de la Ford Territory Titanium...
                            </div>
                            <div class="w-full bg-slate-950 rounded-full h-3 border border-slate-700 overflow-hidden">
                                <div id="obd-progress-bar" class="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-1/5 transition-all duration-300"></div>
                            </div>
                            <div id="obd-current-check" class="text-[10px] font-mono text-cyan-300">
                                Verificando monitor de encendido (Misfire)...
                            </div>
                        </div>
                    `,
                    icon: '🔬',
                    confirmText: 'Ocultar Progreso',
                    cancelText: null
                });

                const progressBar = document.getElementById('obd-progress-bar');
                const checkText = document.getElementById('obd-current-check');

                window.CanBusSimulator.ejecutarEscaneoOBD(
                    (monitor, current, total) => {
                        const pct = Math.round((current / total) * 100);
                        if (progressBar) progressBar.style.width = pct + '%';
                        if (checkText) checkText.textContent = `[${current}/${total}] Verificando: ${monitor.nombre}...`;
                    },
                    (resultado) => {
                        const pids = (resultado && resultado.pidsEnVivo) || {};
                        render(container);
                        window.SafeTeenUtils.showModal({
                            title: 'Diagnóstico OBD-II Completado',
                            customHtml: `
                                <div class="py-2 text-left space-y-2.5 text-xs">
                                    <div class="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                                        <span class="font-bold text-emerald-300">Estado General: ${resultado.estadoGeneral || 'SALUDABLE'}</span>
                                        <span class="text-[10px] font-mono bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded">${(resultado.dtcActivos || []).length} DTCs</span>
                                    </div>
                                    <div class="space-y-1 text-[11px] text-gray-300">
                                        <div>✔ Misfire & Encendido: <strong>100% OK</strong></div>
                                        <div>✔ Inyección Directa GDI: <strong>${pids.presionRielCombustible ?? 150} bar (Óptimo)</strong></div>
                                        <div>✔ Catalizador Euro 6: <strong>Sin obstrucción</strong></div>
                                        <div>✔ Batería 12V: <strong>${pids.voltajeBateria ?? 12.4}V (Saludable)</strong></div>
                                        <div>✔ Presión Turbo Boost: <strong>${pids.presionTurboBoost ?? 14.2} PSI nominal</strong></div>
                                    </div>
                                    <div class="text-[10px] text-gray-400 italic">
                                        Informe transmitido a la bitácora FordPass del vehículo.
                                    </div>
                                </div>
                            `,
                            icon: '✅',
                            confirmText: 'Cerrar Informe'
                        });
                    }
                );
            };
        }
    }

    return { render: render };
})();

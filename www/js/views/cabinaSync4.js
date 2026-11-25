/**
 * W-08: Enlace Vehicular, Modo Conducción y Manos Libres SYNC 4
 * Diseñado como pantalla móvil nativa con simulador panorámico opcional para la sustentación.
 * 
 * Resuelve las dos necesidades:
 * 1. En el teléfono: Muestra la configuración real de manos libres, bloqueo al rodar y contactos VIP.
 * 2. Para el profesor/jurado: Incluye un botón para simular la consola de 12.3'' de la Ford Territory.
 */

window.ViewCabinaSync4 = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const tele = state.telemetriaEnVivo;
        const vehiculo = state.vehiculo;
        const manosLibres = state.manosLibres || {
            bloqueoPantallaCelular: true,
            manosLibresBluetooth: true,
            silenciarNotificacionesSociales: true,
            respuestaAutomaticaSMS: true,
            mensajeSMS: 'Estoy conduciendo la Ford Territory con SafeTeen Co-Drive. Responderé al llegar seguro a mi destino.',
            contactosVIP: [
                { id: 'ricardo', nombre: 'Papá (Ricardo Morales)', tel: '+51 958 123 456', rol: 'Tutor Primario', estado: 'Permitido en Volante 📞' },
                { id: 'mama', nombre: 'Mamá (Elena de Morales)', tel: '+51 954 654 321', rol: 'Tutora Secundaria', estado: 'Permitido en Volante 📞' },
                { id: 'sos', nombre: 'Central de Emergencias (105)', tel: '105', rol: 'Seguridad Nacional', estado: 'Prioridad Crítica SOS 🚨' }
            ]
        };

        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-2 max-w-md mx-auto space-y-3.5 pb-6">
                
                <!-- Encabezado Móvil de Sección -->
                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/30 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                            Conectividad Vehicular
                        </span>
                        <h2 class="text-sm font-extrabold text-white mt-0.5">
                            Enlace y Manos Libres SYNC 4
                        </h2>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/40 flex items-center justify-center text-xl">
                        🚙
                    </div>
                </div>

                <!-- Tarjeta 1: Estado de Vinculación con la Ford Territory -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-extrabold text-white flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>${vehiculo.modelo}</span>
                        </span>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                            SYNC 4 Conectado
                        </span>
                    </div>
                    <div class="text-[11px] text-gray-400 font-mono space-y-0.5">
                        <div>VIN: <span class="text-gray-300">${vehiculo.vin}</span></div>
                        <div>Enlace: <span class="text-cyan-300">Bluetooth 5.2 + Bus CAN 500 kbps</span></div>
                        <div>Consola de Tablero: <span class="text-gray-300">Pantalla Panorámica 12.3"</span></div>
                    </div>
                </div>

                <!-- Tarjeta 1.5: Telemetría del Tren Motriz EcoBoost (Inspirada en LiteDash) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-cyan-400 flex items-center gap-1.5">
                            <span>⚡ Telemetría del Tren Motriz EcoBoost</span>
                        </span>
                        <span class="text-[10px] font-mono text-gray-400">PIDs SAE J1979</span>
                    </div>

                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Turbo Boost</div>
                            <div class="text-xs font-bold text-cyan-300 font-mono mt-0.5">${state.obdDiagnostic?.pidsEnVivo?.presionTurboBoost || 14.2} PSI</div>
                            <div class="text-[8px] text-gray-400 font-mono">Presión GDI</div>
                        </div>

                        <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Refrigerante</div>
                            <div class="text-xs font-bold text-emerald-400 font-mono mt-0.5">${state.obdDiagnostic?.pidsEnVivo?.temperaturaRefrigerante || 90}°C</div>
                            <div class="text-[8px] text-gray-400 font-mono">ECT Óptimo</div>
                        </div>

                        <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <div class="text-[8px] font-mono uppercase text-gray-400">Batería 12V</div>
                            <div class="text-xs font-bold text-emerald-400 font-mono mt-0.5">${state.obdDiagnostic?.pidsEnVivo?.voltajeBateria || 12.4} V</div>
                            <div class="text-[8px] text-gray-400 font-mono">Alternador OK</div>
                        </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                        <span class="text-gray-300 flex items-center gap-1.5">
                            <span>🛞 TPMS 4 Ruedas:</span>
                        </span>
                        <span class="font-mono ${state.tpms?.fugaDetectada ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}">
                            ${state.tpms?.fugaDetectada ? 'Alerta: FR 24.2 PSI' : '4x 35.0 PSI (Compensado 20°C)'}
                        </span>
                    </div>
                </div>

                <!-- Tarjeta 2: Política de Cero Distracciones (Bloqueo al Rodar) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-cyan-300 flex items-center gap-1.5">
                            <span>🛡️ Modo Conducción Inteligente</span>
                        </span>
                        <span class="text-[10px] text-gray-400 font-mono">Activo &gt;15 km/h</span>
                    </div>

                    <!-- Switch 1: Bloquear pantalla del celular -->
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <div class="font-bold text-white text-[11px]">Bloqueo de Pantalla Táctil</div>
                            <div class="text-[10px] text-gray-400">Apaga y bloquea el celular en marcha para evitar que el joven lo mire.</div>
                        </div>
                        <span class="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold shrink-0">
                            ON
                        </span>
                    </div>

                    <!-- Switch 2: Silenciar redes sociales -->
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <div class="font-bold text-white text-[11px]">Silenciar WhatsApp / Redes</div>
                            <div class="text-[10px] text-gray-400">Cero notificaciones de TikTok, Instagram ni chats grupales mientras el auto rueda.</div>
                        </div>
                        <span class="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold shrink-0">
                            ON
                        </span>
                    </div>

                    <!-- Switch 3: Respuesta SMS automática -->
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <div class="font-bold text-white text-[11px]">Respuesta SMS Automática</div>
                            <div class="text-[10px] text-gray-400">Responde automáticamente a quien llame o escriba.</div>
                        </div>
                        <span class="px-2 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono font-bold shrink-0">
                            ON
                        </span>
                    </div>

                    <!-- Mensaje predeterminado de respuesta -->
                    <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[10px] text-gray-300 italic">
                        "${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(manosLibres.mensajeSMS) : manosLibres.mensajeSMS}"
                    </div>
                </div>

                <!-- Tarjeta 3: Contactos VIP Permitidos con Manos Libres (Botones del Volante) -->
                <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span class="font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <span>📞 Lista Blanca de Manos Libres (VIP)</span>
                        </span>
                        <span class="text-[10px] text-gray-400 font-mono">Volante Ford</span>
                    </div>

                    <p class="text-[10px] text-gray-300 leading-relaxed">
                        Solo estos contactos hacen sonar los altavoces de la cabina. Tomás puede <strong>responder presionando el botón 📞 en el volante</strong> de la Territory sin tocar el teléfono:
                    </p>

                    <!-- Lista de contactos autorizados -->
                    <div class="space-y-2">
                        ${manosLibres.contactosVIP.map(c => `
                            <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                                        👤
                                    </div>
                                    <div>
                                        <div class="font-bold text-white text-[11px]">${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(c.nombre) : c.nombre}</div>
                                        <div class="text-[9px] text-gray-400 font-mono">${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(c.tel) : c.tel} • ${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(c.rol) : c.rol}</div>
                                    </div>
                                </div>
                                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold font-mono shrink-0">
                                    ${window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml(c.estado) : c.estado}
                                </span>
                            </div>
                        `).join('')}
                    </div>

                    <button id="btn-agregar-vip" class="w-full mt-2 py-1.5 px-3 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 text-[10px] font-bold flex items-center justify-center gap-1">
                        <span>+ Añadir Contacto a Lista Blanca VIP</span>
                    </button>

                    <!-- Simuladores Interactivos de Llamadas -->
                    <div class="pt-2 border-t border-slate-800/80 space-y-2">
                        <div class="text-[10px] font-bold uppercase text-gray-400 font-mono">
                            🎮 Prueba en Vivo del Filtro de Llamadas:
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <button id="btn-simular-llamada-papa" class="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-left transition-all active:scale-95">
                                <div class="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                                    <span>📞 Llamada Papá</span>
                                </div>
                                <div class="text-[9px] text-gray-400 mt-0.5">Suena en volante SYNC 4</div>
                            </button>
                            <button id="btn-simular-llamada-amigo" class="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-left transition-all active:scale-95">
                                <div class="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                                    <span>🚫 Desconocido</span>
                                </div>
                                <div class="text-[9px] text-gray-400 mt-0.5">Silenciada + SMS auto</div>
                            </button>
                        </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[10px] text-amber-200 flex items-start gap-2">
                        <span class="text-sm">⛔</span>
                        <div>
                            <strong>Llamadas de amigos y no registrados:</strong> Silenciadas automáticamente para evitar distracciones en el tráfico de Arequipa.
                        </div>
                    </div>
                </div>

                <!-- Tarjeta 4: Herramienta de Demostración para el Docente (Simular Consola 12.3'') -->
                <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border-2 border-cyan-500/50 text-xs shadow-xl">
                    <div class="flex items-start gap-3 mb-3">
                        <span class="text-2xl">🖥️</span>
                        <div>
                            <div class="font-extrabold text-white text-xs">Simulador de Consola Ford SYNC 4 de 12.3''</div>
                            <div class="text-[10px] text-cyan-200/80 mt-0.5">
                                ¿Deseas sustentar ante el docente cómo se proyecta en el tablero del auto (70% Waze / 30% SafeTeen)?
                            </div>
                        </div>
                    </div>

                    <button id="btn-abrir-simulador-tablero" class="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2">
                        <span>Ver Consola Panorámica del Auto (12.3")</span>
                        <span>›</span>
                    </button>
                </div>

            </div>

            <!-- MODAL PANORÁMICO DE PANTALLA COMPLETA PARA DEMOSTRACIÓN AL DOCENTE -->
            <div id="modal-consola-sync4" class="fixed inset-0 bg-black/95 backdrop-blur-md z-50 hidden flex flex-col p-2 md:p-6 overflow-y-auto">
                <div class="max-w-5xl mx-auto w-full">
                    
                    <!-- Barra de Control del Modal -->
                    <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                            <strong class="text-white text-xs md:text-sm font-mono">
                                VISTA PREVIA: PANTALLA DE TABLERO FORD SYNC 4 (12.3'')
                            </strong>
                        </div>
                        <button id="btn-cerrar-simulador-tablero" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold text-xs transition-all border border-slate-700 flex items-center gap-1.5">
                            <span>✕ Volver al Teléfono</span>
                        </button>
                    </div>

                    <!-- El Contenido Real de la Consola Panorámica 12.3'' -->
                    <div id="contenedor-consola-panoramica">
                        <!-- Se inserta la consola interactiva -->
                    </div>

                </div>
            </div>
        `;

        // Lógica de apertura/cierre del Modal Panorámico para el docente
        const btnAbrir = document.getElementById('btn-abrir-simulador-tablero');
        const modal = document.getElementById('modal-consola-sync4');
        const btnCerrar = document.getElementById('btn-cerrar-simulador-tablero');
        const contenedorPanoramico = document.getElementById('contenedor-consola-panoramica');

        // Botón Añadir Contacto VIP
        const btnAddVip = container.querySelector('#btn-agregar-vip');
        if (btnAddVip) {
            btnAddVip.onclick = () => {
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.showModal({
                        title: 'Añadir Contacto VIP',
                        message: 'Ingresa el nombre del familiar o tutor autorizado para sonar en el volante:',
                        isPrompt: true,
                        placeholder: 'Ej. Tío Carlos / +51 987 654 321',
                        icon: '👤',
                        confirmText: 'Registrar Contacto',
                        cancelText: 'Cancelar',
                        onConfirm: (nombre) => {
                            if (nombre && nombre.trim()) {
                                manosLibres.contactosVIP.push({
                                    id: 'vip_' + Date.now(),
                                    nombre: nombre.trim(),
                                    tel: '+51 9' + Math.floor(10000000 + Math.random() * 90000000),
                                    rol: 'Contacto Autorizado',
                                    estado: 'Permitido en Volante 📞'
                                });
                                window.SafeTeenData.save();
                                render(container);
                                window.SafeTeenUtils.showToast('Contacto Registrado', `"${nombre.trim()}" añadido a la lista blanca.`, '📞', 'success');
                            }
                        }
                    });
                }
            };
        }

        // Simulador de Llamada de Papá (Permitida)
        const btnLlamadaPapa = container.querySelector('#btn-simular-llamada-papa');
        if (btnLlamadaPapa) {
            btnLlamadaPapa.onclick = () => {
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.triggerHaptic([100, 50, 100, 50, 100]);
                    window.SafeTeenUtils.showModal({
                        title: '📞 Llamada Entrante: Papá (Ricardo)',
                        message: 'El sistema SYNC 4 detectó contacto VIP en lista blanca.\n\n🔊 Timbrando en altavoces de la Ford Territory.\n🚗 Puedes responder presionando el botón [📞] en el volante sin tocar tu teléfono.',
                        icon: '📞',
                        confirmText: 'Contestar en Volante',
                        cancelText: 'Rechazar',
                        onConfirm: () => {
                            window.SafeTeenUtils.showToast('Llamada en Curso', 'Audio conectado al micrófono ambiental de la Territory.', '🔊', 'success');
                        }
                    });
                }
            };
        }

        // Simulador de Llamada Desconocida (Bloqueada)
        const btnLlamadaAmigo = container.querySelector('#btn-simular-llamada-amigo');
        if (btnLlamadaAmigo) {
            btnLlamadaAmigo.onclick = () => {
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.showToast(
                        '🚫 Llamada Desconocida Silenciada',
                        'Cero distracciones en marcha. Se envió respuesta automática por SMS.',
                        '🛡️',
                        'warning'
                    );
                }
            };
        }

        if (btnAbrir && modal && contenedorPanoramico) {
            btnAbrir.onclick = () => {
                modal.classList.remove('hidden');
                renderConsolaPanoramica(contenedorPanoramico);
            };
        }

        if (btnCerrar && modal) {
            btnCerrar.onclick = () => {
                modal.classList.add('hidden');
            };
        }
    }

    /**
     * Renderiza la consola apaisada de 12.3'' cuando el usuario o docente quiere verla
     */
    function renderConsolaPanoramica(target) {
        const state = window.SafeTeenData.getState();
        const tele = state.telemetriaEnVivo;
        const vehiculo = state.vehiculo;
        const esPark = tele.marcha === 'P';
        const resplandorColor = tele.resplandorCabina || 'cian';

        let borderColor = 'border-cyan-500/50 shadow-cyan-950/50';
        let glowColor = 'border-cyan-400';
        if (resplandorColor === 'ambar') {
            borderColor = 'border-amber-500/60 shadow-amber-950/50';
            glowColor = 'border-amber-400';
        } else if (resplandorColor === 'rojo' || tele.alertaVisualSirena) {
            borderColor = 'border-red-600/70 shadow-red-950/60';
            glowColor = 'border-red-500';
        }

        target.innerHTML = `
            <div class="mb-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/40 text-xs text-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
                <div class="flex items-start gap-2.5">
                    <span class="text-xl shrink-0">🏛️</span>
                    <div>
                        <div class="flex items-center gap-2">
                            <strong class="text-white text-xs md:text-sm">Arquitectura HMI SYNC 4 Validada por Benchmarking:</strong>
                            <span class="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 font-mono font-bold">
                                GM Teen Driver • Bouncie • Ford OpenXC
                            </span>
                        </div>
                        <p class="text-[11px] text-gray-300 mt-0.5 leading-relaxed">
                            <strong>Cero Distracción:</strong> SafeTeen no compite con Waze o Google Maps. El <strong>70%</strong> de la pantalla es navegación nativa y el <strong>30%</strong> es el widget de coaching CAN. Al pasar a <strong>Park (P)</strong> se despliega el <em>In-Vehicle Report Card</em> automático.
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button id="btn-modal-toggle-marcha" class="px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 ${esPark ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40'}">
                        <span>${esPark ? '🟢 Poner Marcha (D)' : '🅿️ Estacionar en Park (P)'}</span>
                    </button>
                </div>
            </div>

            <!-- Marco de la Consola Ford SYNC 4 de 12.3'' -->
            <div class="sync4-console rounded-3xl border-4 ${borderColor} bg-slate-950 text-white overflow-hidden shadow-2xl relative">
                
                <div class="absolute inset-0 pointer-events-none rounded-3xl border-2 ${glowColor} opacity-70 animate-pulse"></div>

                <!-- Barra de Estado Superior Ford SYNC 4 -->
                <div class="bg-slate-900/90 border-b border-slate-800 px-5 py-2.5 flex items-center justify-between text-xs backdrop-blur-md relative z-10">
                    <div class="flex items-center gap-3">
                        <span class="font-extrabold text-blue-400 font-mono tracking-tight flex items-center gap-1.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                            FORD SYNC 4 • 12.3"
                        </span>
                        <span class="text-gray-600">|</span>
                        <span class="text-xs text-gray-300 font-medium">
                            Conductor: <strong class="text-white">Tomás Morales</strong> (Llave SafeTeen #1)
                        </span>
                    </div>

                    <div class="flex items-center gap-4 font-mono text-[11px]">
                        <span class="flex items-center gap-1.5 text-gray-300">
                            <span>🔒 Buckle-to-Drive:</span>
                            <strong class="text-emerald-400">ABROCHADO</strong>
                        </span>
                        <span class="text-gray-600">|</span>
                        <span class="text-emerald-400 font-bold flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            CAN 500k: ACTIVO
                        </span>
                        <span class="text-gray-400 font-bold">19:32 hrs • 21°C</span>
                    </div>
                </div>

                <!-- Contenido Central: 70/30 en Marcha o Report Card en Park -->
                <div class="p-5 relative z-10">
                    ${esPark ? `
                        <!-- IN-VEHICLE REPORT CARD (GM Teen Driver) -->
                        <div class="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 border-2 border-emerald-500/60 shadow-xl">
                            <div class="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-slate-800 gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-950">
                                        🅿️
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h3 class="text-lg font-black text-white uppercase tracking-wider">
                                                Boletín de Viaje en Pantalla (In-Vehicle Report Card)
                                            </h3>
                                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                                                Viaje Finalizado
                                            </span>
                                        </div>
                                        <p class="text-xs text-gray-300 mt-0.5">
                                            Generado automáticamente al cambiar la palanca a <strong>Park (P)</strong> en Campus UTP.
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-3xl font-black text-emerald-400 font-mono">${state.perfiles?.tomas?.scoreActual ?? 94} / 100</div>
                                    <div class="text-[10px] text-gray-400 font-mono">Score Global del Viaje</div>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div class="text-[10px] text-gray-400 uppercase font-mono">Distancia</div>
                                    <div class="text-lg font-extrabold text-white font-mono mt-0.5">14.2 km</div>
                                    <div class="text-[9px] text-emerald-400 font-mono">Av. Ejército &gt; UTP</div>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div class="text-[10px] text-gray-400 uppercase font-mono">Velocidad Máx.</div>
                                    <div class="text-lg font-extrabold text-white font-mono mt-0.5">52 km/h</div>
                                    <div class="text-[9px] text-gray-400 font-mono">Límite: 50 km/h</div>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div class="text-[10px] text-gray-400 uppercase font-mono">Frenado Suave</div>
                                    <div class="text-lg font-extrabold text-emerald-400 font-mono mt-0.5">96%</div>
                                    <div class="text-[9px] text-gray-400 font-mono">1 evento defensivo</div>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                                    <div class="text-[10px] text-gray-400 uppercase font-mono">Manos Libres</div>
                                    <div class="text-lg font-extrabold text-cyan-400 font-mono mt-0.5">100%</div>
                                    <div class="text-[9px] text-gray-400 font-mono">0 llamadas manuales</div>
                                </div>
                            </div>
                        </div>
                    ` : `
                        <!-- MODO 70/30 EN MARCHA (DRIVE) -->
                        <div class="grid grid-cols-1 lg:grid-cols-10 gap-4">
                            <!-- 70%: Navegación Nativa Waze / Google Maps -->
                            <div class="lg:col-span-7 rounded-2xl bg-slate-900 border-2 border-slate-800 overflow-hidden relative min-h-[300px] flex flex-col justify-between p-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                                <div class="flex items-center justify-between">
                                    <div class="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-bold text-white flex items-center gap-2 shadow-lg">
                                        <span class="text-cyan-400">↗️ 250m</span>
                                        <span>Girar a la derecha hacia Av. Ejército</span>
                                    </div>
                                    <div class="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-500/50 text-[11px] font-mono font-bold text-blue-200">
                                        Waze / Google Maps (Navegación Nativa)
                                    </div>
                                </div>
                                <div class="text-center py-12">
                                    <div class="text-5xl font-black text-cyan-400 font-mono tracking-tight">${tele.velocidadKmH || 48} km/h</div>
                                    <div class="text-xs text-gray-400 font-mono mt-1">Velocidad Actual • Límite de Vía: 50 km/h</div>
                                </div>
                                <div class="flex items-center justify-between text-xs text-gray-400 font-mono">
                                    <span>Destino: Campus UTP Arequipa</span>
                                    <span>Llegada estimada: 19:45 hrs (12 min)</span>
                                </div>
                            </div>

                            <!-- 30%: Widget SafeTeen Co-Drive -->
                            <div class="lg:col-span-3 rounded-2xl bg-slate-900/90 border-2 border-cyan-500/40 p-4 flex flex-col justify-between">
                                <div>
                                    <div class="text-[10px] font-mono font-bold uppercase text-cyan-400 mb-1">Widget Telemático SafeTeen</div>
                                    <div class="text-2xl font-black text-emerald-400 font-mono">${state.perfiles?.tomas?.scoreActual ?? 94} pts</div>
                                    <div class="text-[10px] text-gray-400">Score en vivo (Meta: ${state.contratoDigital?.scoreMeta ?? 88})</div>
                                    
                                    <div class="mt-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-gray-300">
                                        <strong>📞 Manos Libres Activo:</strong> Pantalla del teléfono bloqueada. Responder solo con botón del volante.
                                    </div>
                                </div>
                                <div class="text-[10px] text-emerald-400 font-mono text-center pt-3 border-t border-slate-800">
                                    🟢 Conexión CAN 500k Estable
                                </div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;

        const btnToggleModal = document.getElementById('btn-modal-toggle-marcha');
        if (btnToggleModal) {
            btnToggleModal.onclick = () => {
                if (esPark) {
                    window.CanBusSimulator.iniciarMarcha();
                } else {
                    window.CanBusSimulator.simularLlegadaSeguraPark();
                }
                renderConsolaPanoramica(target);
            };
        }
    }

    return {
        render: render,
        renderConsolaPanoramica: renderConsolaPanoramica
    };
})();

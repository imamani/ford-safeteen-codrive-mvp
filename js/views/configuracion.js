/**
 * W-07: Configuración General del Ecosistema y Privacidad Familiar
 * Gestión de VIN, perfiles familiares y políticas telemáticas (Figura 13 del APF3)
 */

window.ViewConfiguracion = (function () {
    function render(container) {
        const state = window.SafeTeenData.getState();
        const vehiculo = state.vehiculo;
        const priv = state.privacidad;
        if (!Array.isArray(state.miembrosFamilia)) {
            state.miembrosFamilia = [
                { id: 'tomas', nombre: 'Tomás Morales', rol: 'Conductor Joven Principal', badge: 'Activo', badgeClass: 'bg-blue-500/20 text-blue-300' },
                { id: 'ricardo', nombre: 'Ing. Ricardo Morales', rol: 'Tutor Administrador', badge: 'Propietario', badgeClass: 'bg-emerald-500/20 text-emerald-300' },
                { id: 'mateo', nombre: 'Mateo Huarca', rol: 'Perfil Inclusivo (Hipoacusia)', badge: 'Accesible', badgeClass: 'bg-cyan-500/20 text-cyan-300' }
            ];
        }
        const miembros = state.miembrosFamilia;
        const esc = window.SafeTeenUtils ? window.SafeTeenUtils.escapeHtml : (s => s);
        const esBalsamiq = document.body.classList.contains('mode-balsamiq');

        container.innerHTML = `
            <div class="wireframe-screen p-4 max-w-md mx-auto">
                <!-- Barra Superior -->
                <div class="flex justify-between items-center mb-4 border-b pb-2 ${esBalsamiq ? 'border-dashed border-gray-400' : 'border-slate-800'}">
                    <button type="button" id="btn-back-config" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/60 transition-all">
                        &lt; Atrás
                    </button>
                    <div class="text-center">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-blue-400">Configuración General</h2>
                        <span class="text-[10px] text-gray-400">Administración del Ecosistema</span>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        [*] Ajustes
                    </span>
                </div>

                <!-- Bloque 1: Vehículo Vinculado (FordPass) -->
                <div class="card-section p-3 rounded-xl mb-3 border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="text-xs font-bold uppercase text-blue-400 mb-2 flex justify-between items-center">
                        <span>Vehículo Vinculado (FordPass)</span>
                        <span class="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            MQTT Activo
                        </span>
                    </div>
                    <div class="font-bold text-xs text-white">${esc(vehiculo.modelo)}</div>
                    <div class="text-[10px] text-gray-400 font-mono mt-0.5">
                        VIN: <span class="text-gray-300">${esc(vehiculo.vin)}</span>
                    </div>
                    <div class="text-[9px] text-cyan-400/90 font-mono mt-1">
                        Módem 4G LTE Embarcado • Protocolo CAN-C 500 kbps
                    </div>
                </div>

                <!-- Bloque 2: Gestión de Perfiles Familiares -->
                <div class="card-section p-3 rounded-xl mb-3 border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="text-xs font-bold uppercase text-indigo-400 mb-2 flex justify-between items-center">
                        <span>Gestión de Perfiles Familiares</span>
                        <span class="text-[9px] text-gray-400">${miembros.length} Registrados</span>
                    </div>

                    <div class="space-y-1.5 text-xs">
                        ${miembros.map(m => `
                            <div class="p-2 rounded bg-slate-800/40 border border-slate-700/40 flex justify-between items-center">
                                <div>
                                    <span class="font-bold text-white text-[11px]">${esc(m.nombre)}</span>
                                    <div class="text-[9px] text-gray-400">${esc(m.rol)}</div>
                                </div>
                                <span class="text-[9px] px-2 py-0.5 rounded font-mono ${m.badgeClass || 'bg-indigo-500/20 text-indigo-300'}">${esc(m.badge || 'Familiar')}</span>
                            </div>
                        `).join('')}
                    </div>

                    <button id="btn-add-member" class="w-full mt-2 py-1.5 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white text-[10px] font-bold text-center">
                        + Añadir Miembro Familiar (ej. Camila Salazar)
                    </button>
                </div>

                <!-- Bloque 3: Ajustes de Privacidad y Notificaciones -->
                <div class="card-section p-3 rounded-xl mb-4 border ${esBalsamiq ? 'border-black bg-white text-black' : 'border-slate-800 bg-slate-900/80 text-gray-200'}">
                    <div class="text-xs font-bold uppercase text-purple-400 mb-2">
                        Ajustes de Privacidad y Notificaciones
                    </div>

                    <div class="space-y-2 text-xs">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="cfg-mapa" class="rounded text-purple-500 focus:ring-0" ${priv.ocultarMapaEnVivo ? 'checked' : ''}>
                            <span class="text-[11px] text-gray-300">Ocultar mapa satelital detallado al tutor (Privacidad)</span>
                        </label>

                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="cfg-park" class="rounded text-purple-500 focus:ring-0" ${priv.notificarLlegadaEnPark ? 'checked' : ''}>
                            <span class="text-[11px] text-gray-300">Enviar notificación automática de llegada en Park (P)</span>
                        </label>

                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="cfg-bateria" class="rounded text-purple-500 focus:ring-0" ${priv.compartirNivelBateria ? 'checked' : ''}>
                            <span class="text-[11px] text-gray-300">Compartir nivel de batería del smartphone del joven</span>
                        </label>

                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="cfg-parada" class="rounded text-purple-500 focus:ring-0" ${priv.modoParadaRapida ? 'checked' : ''}>
                            <span class="text-[11px] text-gray-300">Tolerancia de paradas rápidas (15 min) sin alarmas</span>
                        </label>
                    </div>
                </div>

                <!-- Bloque 4: Acciones del Sistema -->
                <div class="grid grid-cols-2 gap-2">
                    <button id="btn-reset-config" class="py-2.5 px-3 rounded-xl font-bold text-xs border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-800">
                        RESTABLECER
                    </button>
                    <button id="btn-save-config" class="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md">
                        GUARDAR CAMBIOS
                    </button>
                </div>
            </div>
        `;

        // Eventos
        const btnBack = container.querySelector('#btn-back-config');
        if (btnBack) {
            btnBack.onclick = () => window.SafeTeenApp && window.SafeTeenApp.goBackHome();
        }

        container.querySelector('#btn-add-member').onclick = function () {
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: 'Añadir Miembro Familiar',
                    message: 'Ingresa el nombre del familiar a registrar en la cuenta:',
                    isPrompt: true,
                    placeholder: 'Ej. Camila Salazar',
                    icon: '👤',
                    confirmText: 'Registrar',
                    cancelText: 'Cancelar',
                    onConfirm: function (nuevo) {
                        if (nuevo && nuevo.trim()) {
                            miembros.push({
                                id: 'mem_' + Date.now(),
                                nombre: nuevo.trim(),
                                rol: 'Conductor Novel Adicional',
                                badge: 'Vinculado',
                                badgeClass: 'bg-indigo-500/20 text-indigo-300'
                            });
                            window.SafeTeenData.save();
                            render(container);
                            window.SafeTeenUtils.showToast(
                                'Familiar Registrado',
                                `Perfil de "${nuevo.trim()}" añadido con éxito.`,
                                '👤',
                                'success'
                            );
                        }
                    }
                });
            }
        };

        container.querySelector('#btn-save-config').onclick = function () {
            priv.ocultarMapaEnVivo = container.querySelector('#cfg-mapa').checked;
            priv.notificarLlegadaEnPark = container.querySelector('#cfg-park').checked;
            priv.compartirNivelBateria = container.querySelector('#cfg-bateria').checked;
            priv.modoParadaRapida = container.querySelector('#cfg-parada').checked;
            window.SafeTeenData.save();
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showToast(
                    'Configuración Guardada',
                    'Ajustes sincronizados con FordPass Cloud y Bus CAN vehicular.',
                    '☁️',
                    'success'
                );
            }
        };

        container.querySelector('#btn-reset-config').onclick = function () {
            if (window.SafeTeenUtils) {
                window.SafeTeenUtils.showModal({
                    title: '¿Restablecer Ajustes?',
                    message: 'Se restablecerán todas las opciones de privacidad y perfiles a sus valores de fábrica.',
                    icon: '⚠️',
                    confirmText: 'Restablecer',
                    cancelText: 'Cancelar',
                    onConfirm: function () {
                        window.SafeTeenData.reset();
                        render(container);
                        window.SafeTeenUtils.showToast('Valores Restablecidos', 'Configuración de fábrica aplicada.', '🔄', 'info');
                    }
                });
            } else {
                window.SafeTeenData.reset();
                render(container);
            }
        };
    }

    return { render: render };
})();

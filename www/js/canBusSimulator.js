/**
 * Ford SafeTeen Co-Drive - Simulador de Telemetría de Bus CAN y Co-Pilot360
 * Implementa los requerimientos funcionales RF-01 al RF-14
 * Telemetría Avanzada inspirada en LiteDash:
 * - Diagnóstico OBD-II / CAN en tiempo real (PIDs EcoBoost, Monitores de Emisiones y DTCs)
 * - Monitor TPMS de 4 Ruedas con física de gases ideales (P1/T1 = P2/T2) y alerta de fuga rápida
 */

window.CanBusSimulator = (function () {
    let listeners = [];

    function notify(eventType, data) {
        listeners.forEach(fn => {
            try {
                fn(eventType, data);
            } catch (e) {
                console.error('Error en listener de CanBusSimulator:', e);
            }
        });
    }

    // Iniciar simulación de conducción activa
    function iniciarMarcha() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.enMarcha = true;
        state.telemetriaEnVivo.marcha = 'D';
        state.telemetriaEnVivo.velocidadKmH = 48;
        state.telemetriaEnVivo.rpm = 2100;
        state.telemetriaEnVivo.posicionAcelerador = 28;
        state.telemetriaEnVivo.presionFrenosKpa = 12;
        state.telemetriaEnVivo.desvioCarrilMetros = 0.05;
        state.telemetriaEnVivo.resplandorCabina = 'cian';
        state.telemetriaEnVivo.alertaVisualSirena = false;
        state.telemetriaEnVivo.alertaTexto = 'Conducción estable en Av. Ejército (Arequipa) • Modo Silencioso Activo';
        
        // Actualizar estadísticas de viaje
        state.tripStats.velocidadPromedioKmH = 42.0;
        state.tripStats.consumoInstantaneoKmL = 15.2;
        state.tripStats.gForceActual = 0.06;

        window.SafeTeenData.save();
        notify('telemetria_actualizada', state.telemetriaEnVivo);
        dispararVibracionHaptica(50); // pulso suave de confirmación
    }

    // Frenada defensiva contextualizada por Co-Pilot360 (RF-03, Viñeta 3)
    function simularFrenadaDefensiva() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.enMarcha = true;
        state.telemetriaEnVivo.marcha = 'D';
        state.telemetriaEnVivo.velocidadKmH = 12;
        state.telemetriaEnVivo.presionFrenosKpa = 85;
        state.telemetriaEnVivo.aceleracionLongitudinalG = -0.68;
        state.telemetriaEnVivo.resplandorCabina = 'cian'; // Sigue cian porque Co-Pilot360 lo validó
        state.telemetriaEnVivo.alertaTexto = 'Co-Pilot360: Obstáculo detectado en Variante de Uchumayo. Frenada Defensiva Legítima VALIDADA (Score protegido a 94 pts, sin penalización).';
        
        state.tripStats.gForcePico = 0.68;
        state.tripStats.frenadoSuaveRatio = 96;

        state.eventosRecientes.unshift({
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: 'defensiva',
            titulo: 'Co-Pilot360: Frenada defensiva validada (0 pts descontados)'
        });

        window.SafeTeenData.save();
        notify('evento_frenada_defensiva', {
            mensaje: 'Frenada Defensiva Validada por Co-Pilot360',
            detalle: 'Acelerómetro: -0.68G. Cámara detectó animal doméstico en calzada. Algoritmo clasifica como maniobra segura.',
            scoreConservado: state.perfiles.tomas.scoreActual
        });
        dispararVibracionHaptica(200);
    }

    // Desvío involuntario de carril con pulso háptico (RF-08, RF-13, Viñeta 2)
    function simularDesvioCarril() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.desvioCarrilMetros = 0.85;
        state.telemetriaEnVivo.resplandorCabina = 'ambar';
        state.telemetriaEnVivo.alertaTexto = 'Co-Pilot360: Corrección suave de carril requerida. Marco ámbar visual + pulso háptico en volante (Cero pitidos).';

        window.SafeTeenData.save();
        notify('evento_desvio_carril', {
            mensaje: 'Alerta Háptica de Carril Activa',
            detalle: 'Desvío de carril a la izquierda detectado. Volante vibra suavemente en sector izquierdo sin sonidos estridentes.'
        });
        dispararVibracionHaptica([150, 80, 150]);
    }

    // Detección de Sirena Externa por micrófonos de cabina SYNC 4 (RF-13, Figura 14)
    function simularSirenaAmbulancia() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.alertaVisualSirena = true;
        state.telemetriaEnVivo.resplandorCabina = 'rojo';
        state.telemetriaEnVivo.alertaTexto = '⚠️ ALERTA VISUAL INCLUSIVA: SIRENA DETECTADA (Ambulancia aproximándose por retaguardia)';

        window.SafeTeenData.save();
        notify('evento_sirena_emergencia', {
            mensaje: 'Sirena de Emergencia Detectada',
            detalle: 'Frecuencia sonora 850 Hz captada por micrófonos externos de SYNC 4. Notificación visual de alto contraste y pulso háptico activados para conductor con hipoacusia.'
        });
        dispararVibracionHaptica([300, 100, 300, 100, 300]);
    }

    // Llegada segura a Geocerca pactada y palanca en Park (RF-04, RF-05, Viñeta 4)
    function simularLlegadaSeguraPark() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.enMarcha = false;
        state.telemetriaEnVivo.marcha = 'P';
        state.telemetriaEnVivo.velocidadKmH = 0;
        state.telemetriaEnVivo.rpm = 0;
        state.telemetriaEnVivo.presionFrenosKpa = 0;
        state.telemetriaEnVivo.resplandorCabina = 'cian';
        state.telemetriaEnVivo.alertaVisualSirena = false;
        state.telemetriaEnVivo.alertaTexto = 'Vehículo estacionado y apagado en geocerca Campus UTP • Notificación enviada al tutor';

        const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' hrs';
        
        state.ultimoArribo = {
            destino: 'Campus UTP (Arequipa)',
            hora: horaActual + ' (A tiempo)',
            fecha: 'Hoy',
            palancaEstado: 'Park (P) - Motor apagado',
            bloqueoPuertas: 'Bloqueo automático confirmado',
            bateriaJoven: 84,
            llamadasEnMarcha: 0,
            estado: 'OK - Llegada Segura Confirmada'
        };

        state.eventosRecientes.unshift({
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: 'llegada',
            titulo: 'Arribo a Campus UTP: Push enviado al tutor con batería al 84%'
        });

        window.SafeTeenData.save();
        notify('evento_llegada_segura', state.ultimoArribo);
        dispararVibracionHaptica(100);
    }

    // Impacto severo o e-Call SOS (RF-12)
    function simularAlertaImpactoECall() {
        const state = window.SafeTeenData.getState();
        state.telemetriaEnVivo.enMarcha = false;
        state.telemetriaEnVivo.marcha = 'P';
        state.telemetriaEnVivo.velocidadKmH = 0;
        state.telemetriaEnVivo.aceleracionLongitudinalG = -3.4;
        state.telemetriaEnVivo.resplandorCabina = 'rojo';
        state.telemetriaEnVivo.alertaTexto = '🚨 ALERTA CRÍTICA E-CALL: Impacto severo (>3.0G) detectado. Coordenadas GPS transmitidas a Ricardo Morales y Ford Assistance en < 2.1s';

        state.eventosRecientes.unshift({
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: 'ecall',
            titulo: 'e-Call SOS: Impacto >3.0G detectado • Auxilio notificado'
        });

        window.SafeTeenData.save();
        notify('evento_ecall_impacto', {
            mensaje: 'Alerta e-Call Transmitida',
            detalle: 'Desaceleración severa de -3.4G detectada. Ubicación satelital de emergencia transmitida al smartphone del tutor con línea de auxilio abierta.'
        });
        dispararVibracionHaptica([500, 100, 500]);
    }

    // Simular Fuga Rápida en Neumático (TPMS LiteDash Inspired)
    function simularFugaLlantaTPMS() {
        const state = window.SafeTeenData.getState();
        state.tpms.fr.psi = 24.2;
        state.tpms.fr.tempC = 31;
        state.tpms.fr.status = 'alerta';
        state.tpms.fr.coldPsi = window.SafeTeenData.calcularPresionFria(24.2, 31);
        state.tpms.fugaDetectada = true;
        state.tpms.alertaFugaTipo = 'FAST_LEAK';
        state.tpms.ultimaRevision = 'Ahora mismo';

        state.telemetriaEnVivo.resplandorCabina = 'ambar';
        state.telemetriaEnVivo.alertaTexto = '⚠️ ALERTA TPMS: Pérdida Rápida de Presión en Neumático Delantero Derecho (24.2 PSI). Revisar por pinchazo.';

        state.eventosRecientes.unshift({
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: 'tpms',
            titulo: 'TPMS: Fuga rápida detectada en rueda Delantera Der. (24.2 PSI)'
        });

        window.SafeTeenData.save();
        notify('evento_fuga_tpms', {
            rueda: 'Delantera Derecha (FR)',
            psi: 24.2,
            tempC: 31,
            tipo: 'FAST_LEAK',
            mensaje: 'Pérdida súbita de presión de inflado en rueda delantera derecha.'
        });
        dispararVibracionHaptica([250, 100, 250]);
    }

    // Restaurar Presión de Neumáticos (Inflado a 35 PSI)
    function simularRestaurarTPMS() {
        const state = window.SafeTeenData.getState();
        state.tpms.fr.psi = 35.0;
        state.tpms.fr.tempC = 29;
        state.tpms.fr.status = 'ok';
        state.tpms.fr.coldPsi = window.SafeTeenData.calcularPresionFria(35.0, 29);
        state.tpms.fugaDetectada = false;
        state.tpms.alertaFugaTipo = null;
        state.tpms.ultimaRevision = 'Recién calibrado';

        state.telemetriaEnVivo.resplandorCabina = 'cian';
        state.telemetriaEnVivo.alertaTexto = 'Neumáticos calibrados: 4 ruedas en 35.0 PSI con compensación térmica a 20°C activa.';

        state.eventosRecientes.unshift({
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tipo: 'tpms',
            titulo: 'TPMS: 4 neumáticos calibrados y compensados a 35.0 PSI'
        });

        window.SafeTeenData.save();
        notify('tpms_restaurado', { mensaje: 'Presión de 4 neumáticos óptima' });
        dispararVibracionHaptica(80);
    }

    // Simular Escaneo OBD-II / CAN Completo (Diagnóstico SAE J1979)
    function ejecutarEscaneoOBD(onProgress, onComplete) {
        const state = window.SafeTeenData.getState();
        const monitores = state.obdDiagnostic.monitoresEmisiones;

        let index = 0;
        const interval = setInterval(() => {
            if (index < monitores.length) {
                if (onProgress) onProgress(monitores[index], index + 1, monitores.length);
                index++;
            } else {
                clearInterval(interval);
                state.obdDiagnostic.ultimoEscaneo = 'Hoy ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' hrs';
                state.obdDiagnostic.dtcActivos = [];
                state.obdDiagnostic.estadoGeneral = 'SALUDABLE';

                state.eventosRecientes.unshift({
                    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    tipo: 'diagnostico',
                    titulo: 'Escáner OBD-II: Sistema Ford EcoBoost 100% operativo (0 DTCs)'
                });

                window.SafeTeenData.save();
                dispararVibracionHaptica([100, 50, 100]);
                if (onComplete) onComplete(state.obdDiagnostic);
                notify('escaneo_obd_completado', state.obdDiagnostic);
            }
        }, 300);
    }

    // Activar modo de parada rápida / privacidad temporal (RF-11)
    function toggleModoParadaRapida() {
        const state = window.SafeTeenData.getState();
        state.privacidad.modoParadaRapida = !state.privacidad.modoParadaRapida;
        window.SafeTeenData.save();
        notify('parada_rapida_cambiada', state.privacidad.modoParadaRapida);
        return state.privacidad.modoParadaRapida;
    }

    // Vibración física en dispositivos móviles o emulación gráfica
    function dispararVibracionHaptica(patron) {
        if (navigator.vibrate) {
            try {
                navigator.vibrate(patron);
            } catch (e) {
                // silencioso
            }
        }
        notify('pulso_haptico', patron);
    }

    return {
        on: function (callback) {
            listeners.push(callback);
        },
        iniciarMarcha: iniciarMarcha,
        simularFrenadaDefensiva: simularFrenadaDefensiva,
        simularDesvioCarril: simularDesvioCarril,
        simularSirenaAmbulancia: simularSirenaAmbulancia,
        simularLlegadaSeguraPark: simularLlegadaSeguraPark,
        simularAlertaImpactoECall: simularAlertaImpactoECall,
        simularFugaLlantaTPMS: simularFugaLlantaTPMS,
        simularRestaurarTPMS: simularRestaurarTPMS,
        ejecutarEscaneoOBD: ejecutarEscaneoOBD,
        toggleModoParadaRapida: toggleModoParadaRapida,
        probarHaptico: function () {
            dispararVibracionHaptica([180, 80, 180]);
        }
    };
})();

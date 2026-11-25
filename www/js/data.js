/**
 * Ford SafeTeen Co-Drive - Datos Iniciales y Persistencia Local
 * Proyecto APF3 - Diseño de Productos y Servicios (UTP Arequipa)
 * Telemetría Avanzada inspirada en LiteDash (VehicleBus, TPMS Gas Law & OBD-II PIDs)
 * 
 * Este archivo almacena el estado de la aplicación y lo guarda automáticamente
 * en el navegador (localStorage) para que nunca se pierda el progreso de la demo.
 */

window.SafeTeenData = (function () {
    const STORAGE_KEY = 'safeteen_codrive_state_v2';

    // Función física de la Ley de los Gases Ideales (P1/T1 = P2/T2) para calibración de neumáticos
    // Compensación térmica a 20°C estándar para evitar falsas alarmas por calentamiento en Arequipa
    function calcularPresionFria(psiMedido, tempC) {
        const presAtm = 14.696; // PSI absoluta a nivel del mar (ajustable por altitud)
        const tKelvin = tempC + 273.15;
        const tCalibracion = 293.15; // 20°C
        const pAbs = psiMedido + presAtm;
        const pFriaAbs = pAbs * (tCalibracion / tKelvin);
        const pFriaManometrica = pFriaAbs - presAtm;
        return Number(pFriaManometrica.toFixed(1));
    }

    // Estado inicial por defecto según el informe de APF3 y arquitectura LiteDash
    const defaultState = {
        // Vehículo asignado
        vehiculo: {
            modelo: 'Ford Territory Titanium 1.5L EcoBoost',
            anio: 2026,
            vin: '3FADP4BJ9NM82143',
            motor: '1.5L EcoBoost Turbo I4 GDI (143 CV)',
            transmision: 'Automática 7 velocidades con E-Shifter',
            modemEstado: 'Conectado 4G LTE',
            protocolo: 'MQTT Seguro (FordPass API / CAN 500 kbps)',
            presionNeumaticos: '35 PSI (Óptimo)',
            pastillasFrenoVida: 75, // %
            temperaturaMotor: '90°C (Normal)',
            consumoPromedio: '42 km/galón',
            kilometrajeActual: 15420,
            proximoServiceKm: 4200
        },

        // Módulo TPMS Avanzado (Presión y Temperatura por Rueda con Compensación Física)
        tpms: {
            fl: { id: 'fl', nombre: 'Delantera Izq.', psi: 35.2, tempC: 28, status: 'ok', targetPsi: 35.0, coldPsi: 34.3 },
            fr: { id: 'fr', nombre: 'Delantera Der.', psi: 35.0, tempC: 29, status: 'ok', targetPsi: 35.0, coldPsi: 34.0 },
            rl: { id: 'rl', nombre: 'Trasera Izq.', psi: 35.1, tempC: 27, status: 'ok', targetPsi: 35.0, coldPsi: 34.4 },
            rr: { id: 'rr', nombre: 'Trasera Der.', psi: 35.3, tempC: 27, status: 'ok', targetPsi: 35.0, coldPsi: 34.6 },
            fugaDetectada: false,
            alertaFugaTipo: null, // 'FAST_LEAK' | 'SLOW_LEAK' | null
            compensacionTermicaActiva: true,
            ultimaRevision: 'Hoy 19:45 hrs'
        },

        // Diagnóstico Mecánico Preventivo y Escáner OBD-II / CAN (Taller FordPass)
        obdDiagnostic: {
            estadoGeneral: 'SALUDABLE',
            dtcActivos: [], // 0 Códigos de Falla activos
            monitoresEmisiones: [
                { id: 'misfire', nombre: 'Fallo de Encendido (Misfire)', estado: 'LISTO / OK', icono: '⚡', ok: true },
                { id: 'fuel', nombre: 'Sistema de Inyección GDI', estado: 'LISTO / OK', icono: '⛽', ok: true },
                { id: 'catalyst', nombre: 'Catalizador y Emisiones Euro 6', estado: 'LISTO / OK', icono: '🌱', ok: true },
                { id: 'evap', nombre: 'Sistema de Vapores EVAP', estado: 'LISTO / OK', icono: '💨', ok: true },
                { id: 'o2', nombre: 'Sensores de Oxígeno O2 Lambda', estado: 'LISTO / OK', icono: '🔬', ok: true }
            ],
            pidsEnVivo: {
                voltajeBateria: 12.4, // V (12.2V - 14.4V óptimo)
                temperaturaRefrigerante: 90, // °C
                presionTurboBoost: 14.2, // PSI
                cargaMotorTPS: 24, // %
                presionRielCombustible: 150, // bar
                vidaAceite: 88, // %
                desgastePastillas: 25 // % de desgaste
            },
            ultimoEscaneo: 'Hoy 19:46 hrs (Automático vía FordPass)'
        },

        // Computadora de Viaje EcoBoost (Trip Computer)
        tripStats: {
            distanciaKm: 14.2,
            duracionMin: 22,
            velocidadPromedioKmH: 38.5,
            consumoInstantaneoKmL: 14.8, // km/L
            consumoPromedioKmGal: 41.8, // km/galón
            frenadoSuaveRatio: 96, // %
            aceleracionEcoRatio: 92, // %
            gForceActual: 0.08,
            gForcePico: 0.68 // pico frenada defensiva en Variante
        },

        // Perfiles de usuario (Sección 2 del APF3)
        perfilActivo: 'tomas', // 'tomas', 'ricardo', 'mateo', 'camila'
        miembrosFamilia: [
            { id: 'tomas', nombre: 'Tomás Morales', rol: 'Conductor Joven Principal', badge: 'Activo', badgeClass: 'bg-blue-500/20 text-blue-300' },
            { id: 'ricardo', nombre: 'Ing. Ricardo Morales', rol: 'Tutor Administrador', badge: 'Propietario', badgeClass: 'bg-emerald-500/20 text-emerald-300' },
            { id: 'mateo', nombre: 'Mateo Huarca', rol: 'Perfil Inclusivo (Hipoacusia)', badge: 'Accesible', badgeClass: 'bg-cyan-500/20 text-cyan-300' }
        ],
        perfiles: {
            tomas: {
                id: 'tomas',
                nombre: 'Tomás Morales',
                edad: 20,
                rol: 'Conductor Joven Principal',
                ocupacion: 'Estudiante 5to ciclo Ing. Civil - UTP Arequipa',
                residencia: 'Cerro Colorado, Arequipa',
                scoreActual: 94,
                nivelTexto: 'Nivel Excelente',
                desgloseScore: {
                    frenadoSuave: 96, // 40% ponderación
                    controlCarril: 92, // 30% ponderación
                    velocidadRuta: 94  // 30% ponderación
                },
                rachaDias: 14,
                bateriaMovil: 84,
                llamadasEnRuta: 0,
                insignias: [
                    { id: 'freno', nombre: 'Guardián del Freno', nivel: 'Oro', icono: 'shield-check', desc: '14 días con frenado suave CAN sin castigar discos' },
                    { id: 'eco', nombre: 'Eco-Driver', nivel: 'Plata', icono: 'leaf', desc: 'Aceleración progresiva menor al 45% TPS en avenidas' },
                    { id: 'nocturno', nombre: 'Nocturno Responsable', nivel: 'Oro', icono: 'moon', desc: 'Retornos antes de medianoche respetando límites' },
                    { id: 'carril', nombre: 'Carril Pro', nivel: 'Plata', icono: 'git-commit', desc: 'Centrado de carril Co-Pilot360 sin desvíos bruscos' }
                ]
            },
            ricardo: {
                id: 'ricardo',
                nombre: 'Ing. Ricardo Morales',
                edad: 52,
                rol: 'Tutor Primario / Propietario Registrado',
                ocupacion: 'Ingeniero Civil y Gerente de Proyectos',
                residencia: 'Cerro Colorado, Arequipa',
                preferencia: 'Paz mental, arribo seguro por geocerca, 0 espionaje GPS'
            },
            mateo: {
                id: 'mateo',
                nombre: 'Mateo Huarca',
                edad: 21,
                rol: 'Perfil Inclusivo / Conductor con Discapacidad',
                ocupacion: 'Estudiante 6to ciclo Ing. de Sistemas - UTP Arequipa',
                condicion: 'Hipoacusia neurosensorial bilateral moderada a severa (pérdida 65 dB)',
                scoreActual: 95,
                configAccesibilidad: {
                    lucesSync4: true, // Sustituir pitidos por franjas lumínicas en pantalla SYNC 4
                    pulsosHapticos: true, // Pulsos vibratorios en volante de dirección
                    detectorSirenas: true, // Micrófonos de cabina detectan ambulancias/patrulleros
                    sensibilidadHaptica: 'Media', // 'Baja', 'Media', 'Alta'
                    colorAlerta: '#06b6d4' // Cian relajante
                }
            },
            camila: {
                id: 'camila',
                nombre: 'Camila Salazar',
                edad: 18,
                rol: 'Perfil Extremo / Conductora Novel Insegura',
                ocupacion: 'Estudiante 1er ciclo universitario',
                preferencia: 'Coaching silencioso en cabina, cero pitidos intimidantes'
            }
        },

        // Contrato Digital Familiar (RF-10, Wireframe 4)
        contratoDigital: {
            firmado: true,
            scoreMeta: 88,
            fechaAcuerdo: '2026-10-18',
            estadoPermiso: 'Aprobado Automáticamente',
            clausula: 'Si Tomás mantiene un Score semanal igual o superior a 88 puntos, el sistema autoriza automáticamente la llave de la Ford Territory para el fin de semana sin discusiones.',
            geocercas: [
                { id: 'utp', nombre: 'Campus UTP (Arequipa)', radio: 'Radio 200m • Check-in Automático al engranar Park', activa: true },
                { id: 'hogar', nombre: 'Hogar Familiar (Cerro Colorado)', radio: 'Radio 150m • Check-in Automático al engranar Park', activa: true },
                { id: 'gimnasio', nombre: 'Gimnasio / Polideportivo', radio: 'Radio 200m • Check-in Automático al engranar Park', activa: true }
            ]
        },

        // Última notificación de arribo seguro (Peace of Mind Card)
        ultimoArribo: {
            destino: 'Campus UTP (Arequipa)',
            hora: '19:45 hrs (A tiempo)',
            fecha: 'Hoy',
            palancaEstado: 'Park (P) - Motor apagado',
            bloqueoPuertas: 'Bloqueo automático confirmado',
            bateriaJoven: 84,
            llamadasEnMarcha: 0,
            estado: 'OK - Llegada Segura Confirmada'
        },

        // Resumen semanal agregado para el Tutor (RF-07)
        resumenSemanal: {
            promedioScore: 93,
            kmRecorridos: 142,
            horasConduccion: '6h 15m',
            diasEvaluados: [
                { dia: 'Lun', score: 92, km: 28 },
                { dia: 'Mar', score: 95, km: 22 },
                { dia: 'Mié', score: 91, km: 30 },
                { dia: 'Jue', score: 94, km: 18 },
                { dia: 'Vie', score: 96, km: 24 },
                { dia: 'Sáb', score: 92, km: 20 },
                { dia: 'Dom', score: 90, km: 0 }
            ]
        },

        // Configuración de privacidad y telemetría (RF-11, Wireframe 7)
        privacidad: {
            ocultarMapaEnVivo: true, // Cero mapa de calles para proteger intimidad del joven
            notificarLlegadaEnPark: true,
            compartirNivelBateria: true,
            modoParadaRapida: false, // Parada rápida de hasta 15 min en farmacia/conveniencia (RF-11)
            paradaRapidaMinutosRestantes: 15
        },

        // Modo Conducción, Manos Libres y Contactos VIP Permitidos (RF-06, RF-08)
        manosLibres: {
            bloqueoPantallaCelular: true, // Bloqueo automático de pantalla al rodar a más de 15 km/h
            manosLibresBluetooth: true, // Contestar llamadas con el botón del volante de la Ford Territory
            silenciarNotificacionesSociales: true, // WhatsApp, TikTok, Instagram silenciados al 100%
            respuestaAutomaticaSMS: true, // SMS cortés al recibir llamadas bloqueadas
            mensajeSMS: 'Estoy conduciendo la Ford Territory con SafeTeen Co-Drive. Responderé al llegar seguro a mi destino.',
            contactosVIP: [
                { id: 'ricardo', nombre: 'Papá (Ricardo Morales)', tel: '+51 958 123 456', rol: 'Tutor Primario', estado: 'Permitido en Volante 📞' },
                { id: 'mama', nombre: 'Mamá (Elena de Morales)', tel: '+51 954 654 321', rol: 'Tutora Secundaria', estado: 'Permitido en Volante 📞' },
                { id: 'sos', nombre: 'Central de Emergencias (105)', tel: '105', rol: 'Seguridad Nacional', estado: 'Prioridad Crítica SOS 🚨' }
            ],
            contactosBloqueados: [
                { nombre: 'Amigos / Universidad / Desconocidos', accion: 'Silenciado automático sin timbrar en cabina' },
                { nombre: 'Redes Sociales y Mensajería', accion: 'Notificaciones suspendidas hasta engranar Park (P)' }
            ]
        },

        // Telemetría en tiempo real simulada del Bus CAN (RF-01, RF-08, RF-13)
        telemetriaEnVivo: {
            enMarcha: false,
            velocidadKmH: 0,
            presionFrenosKpa: 0, // 0 a 180 bar
            rpm: 800,
            posicionAcelerador: 0, // 0 a 100%
            desvioCarrilMetros: 0, // -1.5m a +1.5m
            aceleracionLongitudinalG: 0, // -1.5G a +1.5G
            marcha: 'P', // P, R, N, D, S
            climaCabina: '21°C',
            modoCopilotoSilencioso: true,
            resplandorCabina: 'cian', // 'cian' (suave), 'ambar' (alerta carril), 'rojo' (sirena/emergencia)
            alertaVisualSirena: false,
            alertaTexto: null,
            vibracionHapticaActiva: false
        },

        // Historial de eventos telemáticos recientes
        eventosRecientes: [
            { hora: '19:46', tipo: 'diagnostico', titulo: 'Escáner OBD-II: Sistema Ford EcoBoost 100% operativo (0 DTCs)' },
            { hora: '19:45', tipo: 'llegada', titulo: 'Arribo a Campus UTP confirmado en Park (P)' },
            { hora: '19:32', tipo: 'defensiva', titulo: 'Co-Pilot360: Frenada defensiva validada (obstáculo en calzada, 0 puntos penalizados)' },
            { hora: '19:15', tipo: 'marcha', titulo: 'Inicio de viaje desde Cerro Colorado - Modo Silencioso Activo' }
        ]
    };

    // Deep merge para garantizar que si hay datos guardados antiguos en localStorage,
    // se mantengan los nuevos nodos (tpms, obdDiagnostic, tripStats)
    function deepMerge(target, source) {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                if (target[key] === undefined) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    // Cargar datos guardados o usar valores por defecto
    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const merged = JSON.parse(JSON.stringify(defaultState));
                deepMerge(parsed, merged);
                return parsed;
            }
        } catch (e) {
            console.warn('No se pudo leer localStorage, usando estado inicial.', e);
        }
        return JSON.parse(JSON.stringify(defaultState));
    }

    let state = loadState();

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage', e);
        }
    }

    function resetToDefault() {
        state = JSON.parse(JSON.stringify(defaultState));
        saveState();
        return state;
    }

    return {
        getState: function () {
            return state;
        },
        save: saveState,
        reset: resetToDefault,
        calcularPresionFria: calcularPresionFria,
        update: function (fn) {
            fn(state);
            saveState();
        }
    };
})();

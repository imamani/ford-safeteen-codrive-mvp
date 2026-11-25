/**
 * Ford SafeTeen Co-Drive - Controlador Principal de la App Móvil Nativa
 * APF3 - Diseño de Productos y Servicios (UTP Arequipa)
 * Auditoría de Seguridad & UX: cloudflare/security-audit-skill
 * 
 * Arquitectura Mobile First con Autenticación Supabase y Roles RBAC:
 * - W-00: Login con validaciones de email, contraseña y detección estricta de dominios.
 * - Control de acceso por roles: el Padre entra a su vista de Tutor y el Hijo a Conducción.
 * - Barra inferior nativa (Bottom Tab Bar) oculta en login y activa en sesión.
 * - Diálogos modales y Toasts nativos (Sin alerts bloqueantes de navegador).
 * - Selector rápido de perfiles para evaluación y sustentación ágil.
 */

window.SafeTeenApp = (function () {
    let currentView = 'w00'; // Inicia en login si no hay sesión
    let currentProfile = 'tomas'; // 'tomas' o 'ricardo'

    const views = {
        w00: { name: 'Login & Acceso', role: 'Autenticación', tab: null, module: window.ViewLogin },
        w01: { name: 'Conductor Joven', role: 'Tomás Morales', tab: 'tab-conducir', module: window.ViewConductorJoven },
        w02: { name: 'Tutor Paz Mental', role: 'Ricardo Morales', tab: 'tab-familia', module: window.ViewTutorFamiliar },
        w03: { name: 'Modo Inclusivo', role: 'Mateo Huarca', tab: 'tab-inclusivo', module: window.ViewModoInclusivo },
        w04: { name: 'Contrato Digital', role: 'Tutor y Joven', tab: 'tab-pacto', module: window.ViewContratoDigital },
        w05: { name: 'Manual de Uso', role: 'Onboarding 1 al 4', tab: 'tab-mas', module: window.ViewOnboarding },
        w06: { name: 'Centro de Ayuda', role: 'FAQ y Soporte 24/7', tab: 'tab-mas', module: window.ViewCentroAyuda },
        w07: { name: 'Configuración', role: 'VIN y Privacidad', tab: 'tab-mas', module: window.ViewConfiguracion },
        w08: { name: 'Cabina SYNC 4', role: 'Consola 12.3" en Marcha', tab: 'tab-mas', module: window.ViewCabinaSync4 }
    };

    function init() {
        setupBottomTabs();
        setupQuickProfileSwitch();
        setupCanDrawer();
        setupMoreMenuDrawer();
        setupSimulationButtons();

        // Verificar si existe sesión previa
        const user = window.SafeTeenAuth ? window.SafeTeenAuth.getUser() : null;
        if (user) {
            onUserLoggedIn(user);
        } else {
            // Mostrar pantalla de Login W-00
            navigateTo('w00');
        }

        // Escuchar eventos telemáticos del Bus CAN
        window.CanBusSimulator.on((eventType, data) => {
            renderActiveView();
            mostrarToastNotificacion(eventType, data);
        });
    }

    /**
     * Callback invocado cuando el usuario inicia sesión exitosamente
     */
    function onUserLoggedIn(user) {
        const appHeader = document.getElementById('mobile-app-header');
        const bottomTabs = document.getElementById('mobile-bottom-tabs');
        const fabCan = document.getElementById('fab-can-container') || document.getElementById('btn-open-can-drawer');
        const profileBtn = document.getElementById('btn-quick-switch-profile');

        if (appHeader) appHeader.classList.remove('hidden');
        if (bottomTabs) bottomTabs.classList.remove('hidden');
        if (fabCan) {
            fabCan.classList.remove('hidden');
            if (fabCan.parentElement) fabCan.parentElement.classList.remove('hidden');
        }
        if (profileBtn) profileBtn.classList.remove('hidden');

        if (user.rol === 'tutor') {
            setProfile('ricardo', false);
            navigateTo('w02');
        } else {
            setProfile('tomas', false);
            navigateTo('w01');
        }

        if (window.SafeTeenUtils) {
            window.SafeTeenUtils.showToast(
                'Sesión Iniciada',
                `Bienvenido, ${user.nombre || user.email}`,
                user.rol === 'tutor' ? '👨‍💼' : '🚗',
                'success'
            );
        }
    }

    /**
     * Configuración de la Barra de Navegación Inferior (Bottom Tab Bar)
     */
    function setupBottomTabs() {
        const bindTab = (id, viewKey) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.onclick = () => {
                    navigateTo(viewKey);
                };
            }
        };

        bindTab('tab-conducir', 'w01');
        bindTab('tab-familia', 'w02');
        bindTab('tab-pacto', 'w04');
        bindTab('tab-inclusivo', 'w03');

        // Pestaña "Más": abre el cajón inferior de opciones secundarias
        const tabMas = document.getElementById('tab-mas');
        if (tabMas) {
            tabMas.onclick = () => {
                openMoreDrawer();
            };
        }
    }

    /**
     * Navegación a una vista específica
     */
    function navigateTo(viewKey) {
        if (!views[viewKey]) return;
        currentView = viewKey;

        const appHeader = document.getElementById('mobile-app-header');
        const bottomTabs = document.getElementById('mobile-bottom-tabs');
        const fabCan = document.getElementById('fab-can-container') || document.getElementById('btn-open-can-drawer');
        const profileBtn = document.getElementById('btn-quick-switch-profile');
        const mainEl = document.querySelector('main');

        // Si es la pantalla de Login (W-00), ocultar elementos de navegación
        if (viewKey === 'w00') {
            if (appHeader) appHeader.classList.add('hidden');
            if (bottomTabs) bottomTabs.classList.add('hidden');
            if (fabCan) {
                fabCan.classList.add('hidden');
                if (fabCan.parentElement && fabCan.parentElement.id === 'fab-can-container') {
                    fabCan.parentElement.classList.add('hidden');
                }
            }
            if (profileBtn) profileBtn.classList.add('hidden');
            if (mainEl) {
                mainEl.className = 'w-full max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-4 py-6 relative';
            }
        } else {
            if (appHeader) appHeader.classList.remove('hidden');
            if (bottomTabs) bottomTabs.classList.remove('hidden');
            if (fabCan) {
                fabCan.classList.remove('hidden');
                if (fabCan.parentElement && fabCan.parentElement.id === 'fab-can-container') {
                    fabCan.parentElement.classList.remove('hidden');
                }
            }
            if (profileBtn) profileBtn.classList.remove('hidden');
            if (mainEl) {
                mainEl.className = 'w-full max-w-md mx-auto min-h-screen pt-16 md:pt-20 pb-28 px-3.5 flex flex-col justify-start relative';
            }

            if (views[viewKey].tab) {
                updateTabStyles(views[viewKey].tab);
            }
        }

        renderActiveView();
        if (typeof window.scrollTo === 'function') {
            try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
        }
    }

    /**
     * Actualiza el resaltado visual de la pestaña inferior activa
     */
    function updateTabStyles(activeTabId) {
        const tabs = ['tab-conducir', 'tab-familia', 'tab-pacto', 'tab-inclusivo', 'tab-mas'];
        tabs.forEach(id => {
            const tabEl = document.getElementById(id);
            if (!tabEl) return;
            const indicator = tabEl.querySelector('.tab-indicator');

            if (id === activeTabId) {
                tabEl.classList.remove('text-gray-400');
                tabEl.classList.add('text-cyan-400');
                if (indicator) {
                    indicator.classList.remove('bg-transparent');
                    indicator.classList.add('bg-cyan-400');
                }
            } else {
                tabEl.classList.remove('text-cyan-400');
                tabEl.classList.add('text-gray-400');
                if (indicator) {
                    indicator.classList.remove('bg-cyan-400');
                    indicator.classList.add('bg-transparent');
                }
            }
        });
    }

    /**
     * Selector Rápido de Perfiles (Móvil First para Evaluación y Demo)
     */
    function setupQuickProfileSwitch() {
        const btn = document.getElementById('btn-quick-switch-profile');
        if (btn) {
            btn.onclick = () => {
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.showModal({
                        title: 'Cambiar Vista de Demostración',
                        message: 'Selecciona qué perspectiva del ecosistema Ford SafeTeen deseas visualizar:',
                        icon: '👥',
                        confirmText: currentProfile === 'tomas' ? 'Ver Tutor (Ricardo)' : 'Ver Joven (Tomás)',
                        cancelText: 'Cerrar',
                        onConfirm: () => {
                            if (currentProfile === 'tomas') {
                                setProfile('ricardo', true);
                            } else {
                                setProfile('tomas', true);
                            }
                        }
                    });
                } else {
                    if (currentProfile === 'tomas') {
                        setProfile('ricardo', true);
                    } else {
                        setProfile('tomas', true);
                    }
                }
            };
        }
    }

    function setProfile(profileKey, triggerNav) {
        currentProfile = profileKey;
        const avatarEl = document.getElementById('quick-profile-avatar');
        const nameEl = document.getElementById('quick-profile-name');

        if (profileKey === 'ricardo') {
            if (avatarEl) avatarEl.textContent = '👨‍💼';
            if (nameEl) nameEl.textContent = 'Ricardo (Tutor)';
            if (triggerNav) navigateTo('w02');
        } else {
            if (avatarEl) avatarEl.textContent = '🚗';
            if (nameEl) nameEl.textContent = 'Tomás (Joven)';
            if (triggerNav) navigateTo('w01');
        }
    }

    /**
     * Cajón Deslizable Inferior (Bottom Sheet) del Simulador CAN
     */
    function setupCanDrawer() {
        const btnOpen = document.getElementById('btn-open-can-drawer');
        const drawer = document.getElementById('drawer-can-simulator');
        const btnClose1 = document.getElementById('btn-close-can-drawer');
        const btnClose2 = document.getElementById('btn-close-can-drawer-bottom');

        if (btnOpen && drawer) {
            btnOpen.onclick = () => drawer.classList.remove('hidden');
        }
        const close = () => { if (drawer) drawer.classList.add('hidden'); };
        if (btnClose1) btnClose1.onclick = close;
        if (btnClose2) btnClose2.onclick = close;
        if (drawer) {
            drawer.onclick = (e) => {
                if (e.target === drawer) close();
            };
        }
    }

    /**
     * Cajón Deslizable Inferior (Bottom Sheet) del Menú "Más"
     */
    function setupMoreMenuDrawer() {
        const drawer = document.getElementById('drawer-more-menu');
        const btnOpenTop = document.getElementById('btn-open-more-top');
        const btnClose1 = document.getElementById('btn-close-more-drawer');
        const btnClose2 = document.getElementById('btn-close-more-drawer-bottom');

        if (btnOpenTop) btnOpenTop.onclick = openMoreDrawer;

        const close = () => { if (drawer) drawer.classList.add('hidden'); };
        if (btnClose1) btnClose1.onclick = close;
        if (btnClose2) btnClose2.onclick = close;
        if (drawer) {
            drawer.onclick = (e) => {
                if (e.target === drawer) close();
            };
        }

        // Acciones internas del Menú "Más"
        const bindMenuAction = (id, viewKey) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.onclick = () => {
                    close();
                    navigateTo(viewKey);
                };
            }
        };

        bindMenuAction('menu-btn-sync4', 'w08');
        bindMenuAction('menu-btn-onboarding', 'w05');
        bindMenuAction('menu-btn-ayuda', 'w06');
        bindMenuAction('menu-btn-configuracion', 'w07');

        // Cerrar Sesión con confirmación modal
        const btnLogout = document.getElementById('menu-btn-logout');
        if (btnLogout) {
            btnLogout.onclick = () => {
                close();
                if (window.SafeTeenUtils) {
                    window.SafeTeenUtils.showModal({
                        title: '¿Cerrar Sesión?',
                        message: 'Se cerrará la sesión activa y regresarás a la pantalla de acceso de Ford SafeTeen.',
                        icon: '🚪',
                        confirmText: 'Cerrar Sesión',
                        cancelText: 'Cancelar',
                        onConfirm: () => {
                            if (window.SafeTeenAuth) {
                                window.SafeTeenAuth.logout();
                            }
                            navigateTo('w00');
                            window.SafeTeenUtils.showToast('Sesión Finalizada', 'Has cerrado sesión correctamente.', '👋', 'info');
                        }
                    });
                } else {
                    if (window.SafeTeenAuth) window.SafeTeenAuth.logout();
                    navigateTo('w00');
                }
            };
        }
    }

    function openMoreDrawer() {
        const drawer = document.getElementById('drawer-more-menu');
        if (drawer) drawer.classList.remove('hidden');
    }

    /**
     * Enlaza los botones del Simulador CAN
     */
    function setupSimulationButtons() {
        const bind = (id, fn) => {
            const el = document.getElementById(id);
            if (el) el.onclick = fn;
        };

        bind('sim-iniciar-marcha', () => {
            window.CanBusSimulator.iniciarMarcha();
        });

        bind('sim-frenada-defensiva', () => {
            window.CanBusSimulator.simularFrenadaDefensiva();
        });

        bind('sim-desvio-carril', () => {
            window.CanBusSimulator.simularDesvioCarril();
        });

        bind('sim-sirena-ambulancia', () => {
            window.CanBusSimulator.simularSirenaAmbulancia();
        });

        bind('sim-llegada-park', () => {
            window.CanBusSimulator.simularLlegadaSeguraPark();
        });

        bind('sim-ecall-impacto', () => {
            window.CanBusSimulator.simularAlertaImpactoECall();
        });

        bind('sim-parada-rapida', () => {
            window.CanBusSimulator.toggleModoParadaRapida();
            renderActiveView();
        });

        bind('sim-ver-certificado', () => {
            const drawer = document.getElementById('drawer-can-simulator');
            if (drawer) drawer.classList.add('hidden');
            navigateTo('w03');
            setTimeout(() => {
                const btn = document.getElementById('btn-ver-certificado');
                if (btn) btn.click();
            }, 150);
        });

        // Simulaciones LiteDash: TPMS y OBD-II
        bind('sim-fuga-tpms', () => {
            window.CanBusSimulator.simularFugaLlantaTPMS();
        });

        bind('sim-scan-obd', () => {
            const drawer = document.getElementById('drawer-can-simulator');
            if (drawer) drawer.classList.add('hidden');
            if (currentView !== 'w01') navigateTo('w01');
            setTimeout(() => {
                const btnScan = document.getElementById('btn-ejecutar-scan-obd');
                if (btnScan) btnScan.click();
            }, 200);
        });
    }

    /**
     * Renderiza la vista activa en el contenedor móvil
     */
    function renderActiveView() {
        const screenContainer = document.getElementById('app-screen-container');
        if (!screenContainer) return;

        const viewObj = views[currentView];
        if (viewObj && viewObj.module && viewObj.module.render) {
            viewObj.module.render(screenContainer);
        }
    }

    /**
     * Notificación Flotante Superior Telemática
     */
    function mostrarToastNotificacion(eventType, data) {
        if (!window.SafeTeenUtils) return;

        let icono = '📡';
        let titulo = 'Evento CAN Detectado';
        let detalle = '';
        let variante = 'info';

        if (eventType === 'evento_frenada_defensiva') {
            icono = '🛑';
            titulo = 'Co-Pilot360: Frenada Defensiva';
            detalle = 'Obstáculo en calzada validado. 0 pts penalizados en Score.';
            variante = 'info';
            window.SafeTeenUtils.triggerHaptic([60, 30, 60]);
        } else if (eventType === 'evento_desvio_carril' || eventType === 'alerta_desvio_carril') {
            icono = '🟡';
            titulo = 'Alerta Háptica de Carril';
            detalle = 'Vibración suave en volante de la Ford Territory.';
            variante = 'warning';
            window.SafeTeenUtils.triggerHaptic([120, 40, 120]);
        } else if (eventType === 'evento_sirena_emergencia' || eventType === 'sirena_externa_detectada') {
            icono = '🚨';
            titulo = 'Sirena de Emergencia Detectada';
            detalle = 'Micrófonos SYNC 4 proyectan advertencia lumínica.';
            variante = 'warning';
            window.SafeTeenUtils.triggerHaptic([150, 50, 150]);
        } else if (eventType === 'evento_llegada_segura' || eventType === 'llegada_segura_park') {
            icono = '🅿️';
            titulo = 'Llegada Segura Confirmada';
            detalle = 'Park (P) engranado. Notificación enviada al tutor.';
            variante = 'success';
        } else if (eventType === 'evento_ecall_impacto' || eventType === 'alerta_ecall_impacto') {
            icono = '💥';
            titulo = 'e-Call Impacto Crítico (>3.0G)';
            detalle = 'Llamada automática SOS 105 y telemetría a Ricardo.';
            variante = 'danger';
            window.SafeTeenUtils.triggerHaptic([300, 100, 300, 100, 300]);
        } else if (eventType === 'evento_fuga_tpms') {
            icono = '🛞';
            titulo = 'Alerta TPMS: Fuga en Neumático';
            detalle = 'Rueda Delantera Der. cayó a 24.2 PSI. Revisar por pinchazo.';
            variante = 'warning';
            window.SafeTeenUtils.triggerHaptic([200, 80, 200]);
        } else if (eventType === 'tpms_restaurado') {
            icono = '🛞';
            titulo = 'TPMS Calibrado y Óptimo';
            detalle = '4 neumáticos calibrados y compensados a 35.0 PSI.';
            variante = 'success';
        } else if (eventType === 'escaneo_obd_completado') {
            icono = '🔬';
            titulo = 'Escáner OBD-II Completado';
            detalle = '5/5 Monitores de Emisiones Listos. 0 Códigos DTC.';
            variante = 'success';
        } else if (eventType === 'parada_rapida_cambiada' || eventType === 'modo_parada_rapida') {
            icono = '⏱️';
            const activa = typeof data === 'boolean' ? data : (data && data.activa);
            titulo = activa ? 'Parada Rápida Iniciada' : 'Parada Rápida Finalizada';
            detalle = activa ? '15 min de privacidad en farmacia/tienda.' : 'Geocercas de arribo reanudadas.';
            variante = activa ? 'warning' : 'info';
        } else if (eventType === 'telemetria_actualizada' || eventType === 'inicio_marcha') {
            icono = '🟢';
            titulo = 'Vehículo en Marcha (Drive)';
            detalle = 'Av. Ejército a 48 km/h. Modo Conducción Silencioso Activo.';
            variante = 'info';
        } else {
            return;
        }

        window.SafeTeenUtils.showToast(titulo, detalle, icono, variante);
    }

    function goBackHome() {
        navigateTo(currentProfile === 'ricardo' ? 'w02' : 'w01');
    }

    return {
        init: init,
        navigateTo: navigateTo,
        setProfile: setProfile,
        getCurrentProfile: function () { return currentProfile; },
        goBackHome: goBackHome,
        onUserLoggedIn: onUserLoggedIn
    };
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    window.SafeTeenApp.init();
});

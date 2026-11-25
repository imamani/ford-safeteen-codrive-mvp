/**
 * Ford SafeTeen Co-Drive - Utilidades de Seguridad y Experiencia de Usuario Móvil
 * Auditoría de Seguridad & UX: cloudflare/security-audit-skill
 * Telemetría Avanzada: Integración con LiteDash (TPMS & OBD-II UI)
 * 
 * Funcionalidades:
 * - Sanitización estricta de cadenas HTML (Prevención de XSS en innerHTML)
 * - Modal y Diálogo Nativo Móvil (Sustituye alert, prompt y confirm de forma no intrusiva)
 * - Soporte para contenido HTML enriquecido en modales (Escáner OBD, Diagnósticos)
 * - Sistema de Toasts Telemáticos con variantes de color (Éxito, Alerta, Peligro, Información)
 * - Simulación y API de Vibración Háptica (navigator.vibrate + CSS pulse)
 */

window.SafeTeenUtils = (function () {
    /**
     * Sanitizador HTML para prevenir inyecciones XSS
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Feedback Háptico Táctil y Visual
     */
    function triggerHaptic(pattern = [80, 40, 80]) {
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                // Silencioso si los permisos de vibración no están activos
            }
        }
        const main = document.querySelector('main');
        if (main) {
            main.classList.remove('haptic-pulse');
            void main.offsetWidth; // Reflow
            main.classList.add('haptic-pulse');
            setTimeout(() => {
                if (main) main.classList.remove('haptic-pulse');
            }, 380);
        }
    }

    /**
     * Muestra una notificación Toast superior flotante
     * @param {string} title Título del evento
     * @param {string} desc Descripción concisa
     * @param {string} icon Emoji o icono
     * @param {'info'|'success'|'warning'|'danger'} variant Variante estética
     */
    function showToast(title, desc = '', icon = '🚙', variant = 'info') {
        const toast = document.getElementById('toast-notification');
        const toastInner = document.getElementById('toast-inner');
        const toastIcon = document.getElementById('toast-icon');
        const toastTitle = document.getElementById('toast-title');
        const toastDesc = document.getElementById('toast-desc');

        if (!toast || !toastTitle || !toastDesc) return;

        toastIcon.textContent = icon;
        toastTitle.textContent = title;
        toastDesc.textContent = desc;

        // Estilos según variante
        const borderColors = {
            info: 'border-cyan-500 shadow-cyan-950/60',
            success: 'border-emerald-500 shadow-emerald-950/60',
            warning: 'border-amber-500 shadow-amber-950/60',
            danger: 'border-red-500 shadow-red-950/60'
        };

        if (toastInner) {
            toastInner.className = `p-3 rounded-2xl bg-slate-900/95 border-2 ${borderColors[variant] || borderColors.info} shadow-2xl backdrop-blur-md flex items-center gap-3`;
        }

        toast.classList.remove('opacity-0', '-translate-y-24', 'pointer-events-none');
        toast.classList.add('opacity-100', 'translate-y-0');

        if (toast._timer) clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', '-translate-y-24', 'pointer-events-none');
        }, 4200);
    }

    /**
     * Diálogo Modal Móvil (Reemplazo moderno de alert, confirm y prompt)
     * @param {Object} options
     * @param {string} options.title Título
     * @param {string} [options.message] Mensaje en texto plano
     * @param {string} [options.customHtml] Contenido HTML enriquecido
     * @param {string} options.icon Emoji o icono distintivo
     * @param {string} [options.confirmText] Texto del botón de confirmación
     * @param {string} [options.cancelText] Texto de cancelar (si se omite, solo muestra botón aceptar)
     * @param {boolean} [options.isPrompt] Si es true, incluye campo de texto input
     * @param {string} [options.placeholder] Placeholder del input
     * @param {string} [options.defaultValue] Valor inicial del input
     * @param {function} [options.onConfirm] Callback al confirmar
     * @param {function} [options.onCancel] Callback al cancelar
     */
    function showModal(options = {}) {
        const backdrop = document.getElementById('mobile-modal-backdrop');
        const iconEl = document.getElementById('mobile-modal-icon');
        const titleEl = document.getElementById('mobile-modal-title');
        const msgEl = document.getElementById('mobile-modal-message');
        const inputContainer = document.getElementById('mobile-modal-input-container');
        const inputEl = document.getElementById('mobile-modal-input');
        const btnCancel = document.getElementById('mobile-modal-cancel');
        const btnConfirm = document.getElementById('mobile-modal-confirm');

        if (!backdrop || !titleEl || !msgEl || !btnConfirm) {
            if (options.onConfirm) options.onConfirm();
            return;
        }

        iconEl.textContent = options.icon || 'ℹ️';
        titleEl.textContent = options.title || 'Ford SafeTeen';
        
        if (options.customHtml) {
            msgEl.innerHTML = options.customHtml;
        } else {
            msgEl.textContent = options.message || '';
        }

        // Manejo de prompt
        if (options.isPrompt) {
            inputContainer.classList.remove('hidden');
            inputEl.placeholder = options.placeholder || '';
            inputEl.value = options.defaultValue || '';
            setTimeout(() => inputEl.focus(), 150);
        } else {
            inputContainer.classList.add('hidden');
        }

        // Configuración de botones
        btnConfirm.textContent = options.confirmText || 'Aceptar';
        if (options.cancelText) {
            btnCancel.textContent = options.cancelText;
            btnCancel.classList.remove('hidden');
        } else {
            btnCancel.classList.add('hidden');
        }

        const closeModal = () => {
            backdrop.classList.add('hidden');
        };

        btnConfirm.onclick = () => {
            closeModal();
            if (typeof options.onConfirm === 'function') {
                const val = options.isPrompt ? inputEl.value : true;
                options.onConfirm(val);
            }
        };

        btnCancel.onclick = () => {
            closeModal();
            if (typeof options.onCancel === 'function') {
                options.onCancel();
            }
        };

        backdrop.classList.remove('hidden');
    }

    return {
        escapeHtml: escapeHtml,
        triggerHaptic: triggerHaptic,
        showToast: showToast,
        showModal: showModal
    };
})();

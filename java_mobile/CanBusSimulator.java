package java_mobile;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * ============================================================================
 * CLASE: CanBusSimulator (Simulador Telemático del Bus CAN en Java)
 * ============================================================================
 * Implementa los requerimientos funcionales del APF3 (RF-01 al RF-14).
 * Permite simular los eventos de tráfico de Arequipa (Uchumayo, Av. Ejército).
 */
public class CanBusSimulator {

    // RF-01 y RF-08: Iniciar Conducción Normal
    public static void iniciarMarcha() {
        SafeTeenData.enMarcha = true;
        SafeTeenData.marchaActual = "D";
        SafeTeenData.velocidadKmH = 48;
        SafeTeenData.presionFrenoBar = 12;
        SafeTeenData.resplandorColor = "CIAN";
        SafeTeenData.alertaVisualSirena = false;
        SafeTeenData.mensajeAlerta = "Conduciendo en Av. Ejercito (48 km/h) - Modo Silencioso Activo";
    }

    // RF-03: Frenada Defensiva Validada por Co-Pilot360 (Perro en Uchumayo)
    public static String simularFrenadaDefensiva() {
        SafeTeenData.enMarcha = true;
        SafeTeenData.marchaActual = "D";
        SafeTeenData.velocidadKmH = 15;
        SafeTeenData.presionFrenoBar = 85;
        SafeTeenData.resplandorColor = "CIAN"; // Sigue cian porque Co-Pilot360 lo validó
        SafeTeenData.mensajeAlerta = "Co-Pilot360: Obstaculo frontal en Variante de Uchumayo. Frenada Defensiva Legítima VALIDADA (Score 94 protegido).";
        return SafeTeenData.mensajeAlerta;
    }

    // RF-08 y RF-13: Desvío Involuntario de Carril con Pulso Háptico
    public static String simularDesvioCarril() {
        SafeTeenData.resplandorColor = "AMBAR";
        SafeTeenData.mensajeAlerta = "Co-Pilot360: Correccion de carril. Volante vibra suavemente a la izquierda (Cero pitidos).";
        return SafeTeenData.mensajeAlerta;
    }

    // RF-13: Detección Inclusiva de Sirenas Externas para Mateo Huarca
    public static String simularSirenaAmbulancia() {
        SafeTeenData.alertaVisualSirena = true;
        SafeTeenData.resplandorColor = "ROJO";
        SafeTeenData.mensajeAlerta = "ALERTA INCLUSIVA: Sirena externa detectada por microfonos de cabina (Ambulancia acercandose).";
        return SafeTeenData.mensajeAlerta;
    }

    // RF-04 y RF-05: Llegada Segura por Geocerca en Park (P)
    public static String simularLlegadaPark() {
        SafeTeenData.enMarcha = false;
        SafeTeenData.marchaActual = "P";
        SafeTeenData.velocidadKmH = 0;
        SafeTeenData.presionFrenoBar = 0;
        SafeTeenData.resplandorColor = "CIAN";
        SafeTeenData.alertaVisualSirena = false;

        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        String hora = sdf.format(new Date()) + " hrs";
        SafeTeenData.ultimaHoraArribo = hora + " (A tiempo)";
        SafeTeenData.ultimoDestino = "Campus UTP (Arequipa)";
        SafeTeenData.estadoPalanca = "Park (P) - Motor apagado";
        SafeTeenData.seguroPuertas = "Bloqueado automaticamente";
        SafeTeenData.bateriaMovil = 84;
        SafeTeenData.llamadasEnRuta = 0;

        SafeTeenData.mensajeAlerta = "Llegada Segura enviada al tutor: Tomas arribo a Campus UTP - Bateria: 84% - Cero llamadas en ruta.";
        return SafeTeenData.mensajeAlerta;
    }

    // RF-12: Alerta Crítica e-Call de Impacto (>3.0G)
    public static String simularImpactoECall() {
        SafeTeenData.enMarcha = false;
        SafeTeenData.marchaActual = "P";
        SafeTeenData.resplandorColor = "ROJO";
        SafeTeenData.mensajeAlerta = "ALERTA CRITICA E-CALL: Impacto > 3.0G detectado. Coordenadas GPS transmitidas a Ricardo Morales y auxilio Ford en < 3s.";
        return SafeTeenData.mensajeAlerta;
    }
}

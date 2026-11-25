package java_mobile;

import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CLASE: SafeTeenData (Modelo de Datos de Ford SafeTeen Co-Drive)
 * ============================================================================
 * Esta clase almacena toda la información del vehículo y de los usuarios
 * descritos en el informe de APF3 (Tomás, Ricardo, Mateo y Camila).
 * 
 * Nivel de Programación: Básico (-1/10) con nombres claros y explicaciones.
 */
public class SafeTeenData {

    // 1. Datos del Vehículo Familiar
    public static String vehiculoModelo = "Ford Territory Titanium 1.5L EcoBoost";
    public static String vehiculoVin = "3FADP4BJ9NM82143";
    public static int pastillasFrenoVida = 75; // 75% vida remanente
    public static String consumoCombustible = "42 km/galón";
    public static int kilometrajeActual = 15420;
    public static int proximoServiceKm = 4200;

    // 2. Perfil de Tomás Morales (Conductor Joven - 20 años)
    public static String jovenNombre = "Tomás Morales";
    public static int jovenScore = 94; // Score global (0 - 100)
    public static String jovenNivel = "Nivel Excelente";
    public static int frenadoSuavePorcentaje = 96; // Ponderación 40%
    public static int controlCarrilPorcentaje = 92; // Ponderación 30%
    public static int velocidadRutaPorcentaje = 94; // Ponderación 30%
    public static int rachaDiasSeguros = 14;
    public static int bateriaMovil = 84;
    public static int llamadasEnRuta = 0;

    // 3. Perfil del Tutor (Ing. Ricardo Morales - 52 años)
    public static String tutorNombre = "Ing. Ricardo Morales";
    public static String ultimoDestino = "Campus UTP (Arequipa)";
    public static String ultimaHoraArribo = "19:45 hrs (A tiempo)";
    public static String estadoPalanca = "Park (P) - Motor apagado";
    public static String seguroPuertas = "Bloqueado automáticamente";
    public static String estadoPermisoFinSemana = "Aprobado Automáticamente (Score >= 88)";

    // 4. Perfil Inclusivo (Mateo Huarca - 21 años / Hipoacusia)
    public static String inclusivoNombre = "Mateo Huarca";
    public static String inclusivoCondicion = "Hipoacusia bilateral moderada a severa (65 dB)";
    public static int inclusivoScore = 95;
    public static boolean cfgLucesSync4 = true;
    public static boolean cfgPulsosHapticos = true;
    public static boolean cfgDetectorSirenas = true;

    // 5. Contrato Digital Familiar
    public static int metaScorePactada = 88;
    public static List<String> geocercasPactadas = new ArrayList<>();

    // 6. Telemetría en Vivo (Bus CAN 500 kbps)
    public static boolean enMarcha = false;
    public static int velocidadKmH = 0;
    public static int presionFrenoBar = 0; // 0 - 180 bar
    public static String marchaActual = "P"; // P, R, N, D
    public static String resplandorColor = "CIAN"; // CIAN (Suave), AMBAR (Desvío), ROJO (Emergencia)
    public static boolean alertaVisualSirena = false;
    public static String mensajeAlerta = "Co-Pilot360 activo • Conducción segura";

    // Inicializar listas por defecto
    static {
        geocercasPactadas.add("Campus UTP (Arequipa) - Radio 200m");
        geocercasPactadas.add("Hogar Familiar (Cerro Colorado) - Radio 150m");
        geocercasPactadas.add("Gimnasio Polideportivo - Radio 200m");
    }
}

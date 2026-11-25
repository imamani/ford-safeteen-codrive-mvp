/**
 * Generador Automatizado del Ecosistema Balsamiq para Ford SafeTeen Co-Drive
 * APF3 - Semana 12 | Diseño de Productos y Servicios (UTP Arequipa)
 */

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const outDir = path.join(__dirname, 'pantallas en balsamiq');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Datos de las 8 Pantallas de la Tabla 13 y Figuras del Documento
const pantallas = [
    {
        codigo: 'W-01',
        archivoId: 'W01_Dashboard_Conductor_Joven',
        titulo: 'Modo Conductor Joven (Dashboard)',
        figura: 'Figura 7 (Pág. 43)',
        actor: 'Tomás Morales (20 años) - Conductor Joven',
        tipoDispositivo: 'phone',
        reqs: 'RF-01, RF-02, RF-06',
        resumen: 'Dashboard post-viaje con dial circular de Score (94/100), desglose de frenado CAN (96%), carril (92%) y velocidad (94%), racha de 14 días seguros y medallas de logro.'
    },
    {
        codigo: 'W-02',
        archivoId: 'W02_Tutor_Familiar_PeaceOfMind',
        titulo: 'Modo Tutor Familiar (Peace of Mind Dashboard)',
        figura: 'Figura 8 (Pág. 44)',
        actor: 'Ricardo Morales (52 años) - Tutor y Padre',
        tipoDispositivo: 'phone',
        reqs: 'RF-04, RF-05, RF-07, RF-09',
        resumen: 'Peace of Mind Card [OK], confirmación de arribo a UTP a las 19:45 hrs, monitoreo pasivo de batería del móvil (84%), 0 llamadas al volante, salud de frenos (75%) y aprobación de préstamo.'
    },
    {
        codigo: 'W-03',
        archivoId: 'W03_Modo_Inclusivo_Accesibilidad',
        titulo: 'Modo Inclusivo & Accesibilidad Sensorial Universal',
        figura: 'Figura 9 (Pág. 45)',
        actor: 'Mateo Huarca (21 años) - Conductor con Hipoacusia',
        tipoDispositivo: 'phone',
        reqs: 'RF-13, RF-14, WCAG 2.2 AA, ISO 9241-171',
        resumen: 'Toggles para supresión de pitidos, luces cromáticas en SYNC 4, pulsos hápticos en volante, detector inteligente de sirenas de emergencia y vista previa de alerta en clúster.'
    },
    {
        codigo: 'W-04',
        archivoId: 'W04_Contrato_Digital_Familiar',
        titulo: 'Contrato Digital Familiar y Gestión de Geocercas',
        figura: 'Figura 10 (Pág. 46)',
        actor: 'Tutor y Conductor Joven (Negociación Mutua)',
        tipoDispositivo: 'phone',
        reqs: 'RF-10',
        resumen: 'Slider interactivo de meta de Score (88 pts), geocercas pactadas con check-in automático (UTP, Hogar, Gimnasio) y cláusula de aprobación automática para el fin de semana.'
    },
    {
        codigo: 'W-05',
        archivoId: 'W05_Manual_Uso_Onboarding',
        titulo: 'Manual de Uso y Onboarding Familiar Paso a Paso',
        figura: 'Figura 11 (Pág. 48)',
        actor: 'Nuevos Usuarios y Familias',
        tipoDispositivo: 'phone',
        reqs: 'Adopción y Soporte Ergonómico',
        resumen: 'Guía secuencial en 4 pasos: 1) Vincular VIN con SYNC 4, 2) Pactar Contrato Digital, 3) Conducir en Modo Silencioso, y 4) Llegada Segura con Score.'
    },
    {
        codigo: 'W-06',
        archivoId: 'W06_Centro_Ayuda_FAQ',
        titulo: 'Centro de Ayuda, Soporte Técnico y FAQ Familiar',
        figura: 'Figura 12 (Pág. 50)',
        actor: 'Familia / Soporte Técnico Ford',
        tipoDispositivo: 'phone',
        reqs: 'Soporte y Transparencia 24/7',
        resumen: 'Buscador inteligente y preguntas frecuentes que resuelven dudas sobre el algoritmo del Score, la privacidad sin mapa en vivo y contingencias de batería.'
    },
    {
        codigo: 'W-07',
        archivoId: 'W07_Configuracion_General',
        titulo: 'Configuración General del Ecosistema y Privacidad',
        figura: 'Figura 13 (Pág. 52)',
        actor: 'Tutor Administrador',
        tipoDispositivo: 'phone',
        reqs: 'Seguridad y Privacidad Telemática',
        resumen: 'Gestión de VIN vehicular, enlace MQTT 4G LTE, perfiles familiares activos (Tomás, Ricardo, Mateo) y casillas de control de privacidad de datos.'
    },
    {
        codigo: 'W-08',
        archivoId: 'W08_Cabina_SYNC4_HMI',
        titulo: 'Interfaz Vehicular HMI en Cabina (Ford SYNC 4 de 12")',
        figura: 'Figura 14 (Pág. 53)',
        actor: 'Conductor en Marcha (Cabina SYNC 4)',
        tipoDispositivo: 'sync4',
        reqs: 'RF-01, RF-08, RF-13',
        resumen: 'Consola táctil de 12 pulgadas con resplandor ambiental cian perimetral, navegación limpia hacia geocerca, telemetría CAN en vivo y franja de alerta visual inclusiva de sirena.'
    }
];

// ==========================================
// 1. GENERACIÓN DE ARCHIVOS BMML (.bmml)
// ==========================================
console.log('-> Generando archivos BMML (Balsamiq Mockups XML)...');

const bmmlTemplates = {
    W01_Dashboard_Conductor_Joven: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <!-- Marco de Smartphone -->
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1">
      <controlProperties>
        <bgPattern>topOnly</bgPattern>
        <orientation>portrait</orientation>
      </controlProperties>
    </control>

    <!-- Barra Superior -->
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="45" h="26" measuredW="45" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%5B%20%3D%20%5D</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="100" y="110" w="220" h="-1" measuredW="195" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Ford%20SafeTeen%20Co-Drive</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::SubTitle" x="100" y="130" w="220" h="-1" measuredW="135" measuredH="16" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Modo%20Joven%20%E2%80%A2%20Post-Viaje</text></controlProperties>
    </control>
    <control controlID="4" controlTypeID="com.balsamiq.mockups::Button" x="325" y="115" w="50" h="26" measuredW="50" measuredH="26" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><text>%5BPerfil%5D</text></controlProperties>
    </control>

    <!-- Identidad del Conductor y Vehículo -->
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Label" x="50" y="160" w="325" h="-1" measuredW="280" measuredH="18" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>11</size><text>MODO%20CONDUCTOR%3A%20TOM%C3%81S%20MORALES%20%2820%29</text></controlProperties>
    </control>
    <control controlID="6" controlTypeID="com.balsamiq.mockups::Label" x="50" y="178" w="325" h="-1" measuredW="225" measuredH="16" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>Ford%20Territory%20Titanium%201.5L%20EcoBoost</text></controlProperties>
    </control>

    <!-- Dial Circular de Score Global 94/100 -->
    <control controlID="7" controlTypeID="com.balsamiq.mockups::RoundButton" x="145" y="205" w="130" h="130" measuredW="32" measuredH="32" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties>
        <size>32</size><bold>true</bold><text>94%0A/100%0A*EXCELENTE*</text>
      </controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Label" x="50" y="340" w="325" h="-1" measuredW="270" measuredH="16" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><align>center</align><text>*%20Ponderaci%C3%B3n%20Objetiva%20por%20Bus%20CAN%20Vehicular%20*</text></controlProperties>
    </control>

    <!-- Desglose Telemático Post-Viaje -->
    <control controlID="9" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="365" w="330" h="180" measuredW="200" measuredH="170" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><text>Desglose%20Telem%C3%A1tico%20Post-Viaje%20%28Bus%20CAN%29</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::Label" x="60" y="385" w="300" h="-1" measuredW="220" measuredH="16" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><bold>true</bold><text>Frenado%20Suave%20y%20Anticipado%20%2840%25%29%3A%2096%25</text></controlProperties>
    </control>
    <control controlID="11" controlTypeID="com.balsamiq.mockups::ProgressBar" x="60" y="405" w="305" h="14" measuredW="100" measuredH="20" zOrder="11" locked="false" isInGroup="-1">
      <controlProperties><scrollBars>none</scrollBars><indeterminate>false</indeterminate></controlProperties>
    </control>

    <control controlID="12" controlTypeID="com.balsamiq.mockups::Label" x="60" y="430" w="300" h="-1" measuredW="210" measuredH="16" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><bold>true</bold><text>Mantenimiento%20de%20Carril%20%2830%25%29%3A%2092%25</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::ProgressBar" x="60" y="450" w="305" h="14" measuredW="100" measuredH="20" zOrder="13" locked="false" isInGroup="-1"/>

    <control controlID="14" controlTypeID="com.balsamiq.mockups::Label" x="60" y="475" w="300" h="-1" measuredW="215" measuredH="16" zOrder="14" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><bold>true</bold><text>Velocidad%20Controlada%20%2830%25%29%3A%2094%25</text></controlProperties>
    </control>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::ProgressBar" x="60" y="495" w="305" h="14" measuredW="100" measuredH="20" zOrder="15" locked="false" isInGroup="-1"/>
    <control controlID="16" controlTypeID="com.balsamiq.mockups::Label" x="60" y="515" w="305" h="-1" measuredW="295" measuredH="15" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Co-Pilot360%20valid%C3%B3%20frenadas%20preventivas%20sin%20penalizar.</text></controlProperties>
    </control>

    <!-- Gamificación y Rachas -->
    <control controlID="17" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="555" w="330" h="115" measuredW="200" measuredH="170" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><text>Racha%20de%20Manejo%20Seguro%3A%2014%20D%C3%8DAS</text></controlProperties>
    </control>
    <control controlID="18" controlTypeID="com.balsamiq.mockups::Button" x="55" y="580" w="70" h="45" measuredW="70" measuredH="27" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%5BFreno%5D%0AOro</text></controlProperties>
    </control>
    <control controlID="19" controlTypeID="com.balsamiq.mockups::Button" x="135" y="580" w="70" h="45" measuredW="70" measuredH="27" zOrder="19" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%5BEco%5D%0ADrive</text></controlProperties>
    </control>
    <control controlID="20" controlTypeID="com.balsamiq.mockups::Button" x="215" y="580" w="70" h="45" measuredW="70" measuredH="27" zOrder="20" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%5BNocturno%5D%0APro</text></controlProperties>
    </control>
    <control controlID="21" controlTypeID="com.balsamiq.mockups::Button" x="295" y="580" w="70" h="45" measuredW="70" measuredH="27" zOrder="21" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%5BCarril%5D%0A100%25</text></controlProperties>
    </control>

    <!-- Botón de Acción -->
    <control controlID="22" controlTypeID="com.balsamiq.mockups::Button" x="48" y="685" w="330" h="38" measuredW="230" measuredH="27" zOrder="22" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>COMPARTIR%20SCORE%20CON%20TUTOR</text></controlProperties>
    </control>

    <!-- Nota Adhesiva Balsamiq -->
    <control controlID="23" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="730" w="135" h="65" measuredW="109" measuredH="123" zOrder="23" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Sin%20mapa%20satelital.%0APrivacidad%20protegida.%0AValida%20RF-02%20y%20RF-06.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W02_Tutor_Familiar_PeaceOfMind: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="45" h="26" measuredW="45" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%5B%20%3D%20%5D</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="100" y="110" w="220" h="-1" measuredW="195" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Ford%20SafeTeen%20%E2%80%A2%20Tutor</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::SubTitle" x="100" y="130" w="220" h="-1" measuredW="135" measuredH="16" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Paz%20Mental%20Parental</text></controlProperties>
    </control>
    <control controlID="4" controlTypeID="com.balsamiq.mockups::Button" x="325" y="115" w="50" h="26" measuredW="50" measuredH="26" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><text>%5BAjustes%5D</text></controlProperties>
    </control>

    <control controlID="5" controlTypeID="com.balsamiq.mockups::Label" x="50" y="155" w="325" h="-1" measuredW="280" measuredH="18" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>11</size><text>MODO%20TUTOR%3A%20ING.%20RICARDO%20MORALES</text></controlProperties>
    </control>

    <!-- Peace of Mind Card: Arribo Confirmado -->
    <control controlID="6" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="180" w="330" h="150" measuredW="200" measuredH="170" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>LLEGADA%20SEGURA%20CONFIRMADA%20%5BOK%5D</text></controlProperties>
    </control>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::RoundButton" x="65" y="210" w="55" h="55" measuredW="32" measuredH="32" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>16</size><text>%5BOK%5D</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Paragraph" x="130" y="205" w="235" h="65" measuredW="200" measuredH="80" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><size>11</size><text>*Destino%3A*%20Campus%20UTP%20%28Arequipa%29%0A*Hora%3A*%2019%3A45%20hrs%20%28A%20tiempo%29%0A*Geocerca%3A*%20Radio%20200m%20cumplido</text></controlProperties>
    </control>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::CheckBox" x="65" y="275" w="290" h="20" measuredW="230" measuredH="20" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>10</size><text>Veh%C3%ADculo%20Apagado%20en%20Park%20%28P%29</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::CheckBox" x="65" y="295" w="290" h="20" measuredW="240" measuredH="20" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>10</size><text>Puertas%20bloqueadas%20autom%C3%A1ticamente</text></controlProperties>
    </control>

    <!-- Dispositivo Móvil del Joven -->
    <control controlID="11" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="340" w="330" h="115" measuredW="200" measuredH="170" zOrder="11" locked="false" isInGroup="-1">
      <controlProperties><text>Dispositivo%20M%C3%B3vil%20de%20Tom%C3%A1s%20%28RF-05%29</text></controlProperties>
    </control>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::Label" x="60" y="360" w="280" h="-1" measuredW="230" measuredH="16" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Bater%C3%ADa%20del%20Smartphone%3A%2084%25</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::ProgressBar" x="60" y="380" w="305" h="14" measuredW="100" measuredH="20" zOrder="13" locked="false" isInGroup="-1"/>
    <control controlID="14" controlTypeID="com.balsamiq.mockups::Label" x="60" y="400" w="305" h="-1" measuredW="260" measuredH="16" zOrder="14" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>%E2%9C%94%20Llamadas%20en%20marcha%3A%200%20%28Cero%20distracciones%29</text></controlProperties>
    </control>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::Label" x="60" y="420" w="305" h="-1" measuredW="295" measuredH="15" zOrder="15" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Sin%20p%C3%A1nico%20parental%3A%20celular%20con%20carga%20y%20sin%20llamadas.</text></controlProperties>
    </control>

    <!-- Salud Mecánica -->
    <control controlID="16" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="465" w="330" h="135" measuredW="200" measuredH="170" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><text>Salud%20Mec%C3%A1nica%20-%20Bus%20CAN%20%28RF-09%29</text></controlProperties>
    </control>
    <control controlID="17" controlTypeID="com.balsamiq.mockups::Label" x="60" y="485" w="305" h="-1" measuredW="275" measuredH="16" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>*Pastillas%20de%20freno%3A*%2075%25%20vida%20%28Desgaste%20normal%29</text></controlProperties>
    </control>
    <control controlID="18" controlTypeID="com.balsamiq.mockups::Label" x="60" y="505" w="305" h="-1" measuredW="260" measuredH="16" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>*Consumo%20promedio%3A*%2042%20km/gal%C3%B3n%20%28Eco-Drive%29</text></controlProperties>
    </control>
    <control controlID="19" controlTypeID="com.balsamiq.mockups::Label" x="60" y="525" w="305" h="-1" measuredW="255" measuredH="16" zOrder="19" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>*Pr%C3%B3ximo%20mantenimiento%3A*%20En%204%2C200%20km</text></controlProperties>
    </control>
    <control controlID="20" controlTypeID="com.balsamiq.mockups::Label" x="60" y="550" w="305" h="-1" measuredW="295" measuredH="15" zOrder="20" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Ahorro%20econ%C3%B3mico%20patrimonial%20y%20preservaci%C3%B3n%20de%20frenos.</text></controlProperties>
    </control>

    <!-- Botón de Aprobación -->
    <control controlID="21" controlTypeID="com.balsamiq.mockups::Button" x="48" y="615" w="330" h="45" measuredW="280" measuredH="27" zOrder="21" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>APROBAR%20PR%C3%89STAMO%20FIN%20DE%20SEMANA</text></controlProperties>
    </control>

    <control controlID="22" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="675" w="135" h="70" measuredW="109" measuredH="123" zOrder="22" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Paz%20mental%20parental.%0ASin%20mapas%20esp%C3%ADas%0Ani%20llamadas%20invasivas.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W03_Modo_Inclusivo_Accesibilidad: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="55" h="26" measuredW="55" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%3C%20Atr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="110" y="110" w="200" h="-1" measuredW="190" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Accesibilidad%20Sensorial</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::Button" x="315" y="115" w="65" h="26" measuredW="65" measuredH="26" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><text>%5BInclusivo%5D</text></controlProperties>
    </control>

    <control controlID="4" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="150" w="330" h="65" measuredW="200" measuredH="170" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><text>Perfil%20Inclusivo%3A%20Mateo%20Huarca%20%2821%29</text></controlProperties>
    </control>
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Label" x="55" y="170" w="315" h="-1" measuredW="305" measuredH="16" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>Hipoacusia%20Bilateral%20%28-65%20dB%29%20%E2%80%A2%20Norma%20ISO%209241-171</text></controlProperties>
    </control>

    <!-- Switch 1: Luces SYNC 4 -->
    <control controlID="6" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="225" w="330" h="60" measuredW="100" measuredH="70" zOrder="6" locked="false" isInGroup="-1"/>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::Label" x="55" y="230" w="245" h="-1" measuredW="210" measuredH="16" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Sustituir%20Pitidos%20por%20Luces%20SYNC%204</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Label" x="55" y="250" w="245" h="-1" measuredW="240" measuredH="15" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Franjas%20cian/ambar%20en%20pantalla%2012%27%27%20sin%20pitidos</text></controlProperties>
    </control>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::Switch" x="310" y="235" w="-1" h="-1" measuredW="49" measuredH="28" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><on_off>on</on_off></controlProperties>
    </control>

    <!-- Switch 2: Pulsos Hápticos -->
    <control controlID="10" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="295" w="330" h="60" measuredW="100" measuredH="70" zOrder="10" locked="false" isInGroup="-1"/>
    <control controlID="11" controlTypeID="com.balsamiq.mockups::Label" x="55" y="300" w="245" h="-1" measuredW="215" measuredH="16" zOrder="11" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Pulsos%20H%C3%A1pticos%20Volante%20y%20Asiento</text></controlProperties>
    </control>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::Label" x="55" y="320" w="245" h="-1" measuredW="235" measuredH="15" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Vibraci%C3%B3n%20direccional%20en%20desv%C3%ADo%20de%20carril</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::Switch" x="310" y="305" w="-1" h="-1" measuredW="49" measuredH="28" zOrder="13" locked="false" isInGroup="-1">
      <controlProperties><on_off>on</on_off></controlProperties>
    </control>

    <!-- Switch 3: Detector de Sirenas -->
    <control controlID="14" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="365" w="330" h="60" measuredW="100" measuredH="70" zOrder="14" locked="false" isInGroup="-1"/>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::Label" x="55" y="370" w="245" h="-1" measuredW="225" measuredH="16" zOrder="15" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Detector%20Inteligente%20de%20Sirenas</text></controlProperties>
    </control>
    <control controlID="16" controlTypeID="com.balsamiq.mockups::Label" x="55" y="390" w="245" h="-1" measuredW="240" measuredH="15" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Micr%C3%B3fonos%20SYNC%204%20reconocen%20ambulancias</text></controlProperties>
    </control>
    <control controlID="17" controlTypeID="com.balsamiq.mockups::Switch" x="310" y="375" w="-1" h="-1" measuredW="49" measuredH="28" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><on_off>on</on_off></controlProperties>
    </control>

    <!-- Vista Previa en Clúster -->
    <control controlID="18" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="440" w="330" h="120" measuredW="200" measuredH="170" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><text>VISTA%20PREVIA%20EN%20CL%C3%9ASTER%20DIGITAL</text></controlProperties>
    </control>
    <control controlID="19" controlTypeID="com.balsamiq.mockups::Alert" x="55" y="465" w="315" h="65" measuredW="200" measuredH="100" zOrder="19" locked="false" isInGroup="-1">
      <controlProperties><text>%21%20ALERTA%20VISUAL%20INCLUSIVA%0AAmbulancia%20aproxim%C3%A1ndose%20por%20detr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="20" controlTypeID="com.balsamiq.mockups::Label" x="55" y="535" w="315" h="-1" measuredW="280" measuredH="15" zOrder="20" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%28Volante%3A%20pulso%20lado%20izq%20%E2%80%A2%20Cl%C3%BAster%3A%20destello%20%C3%A1mbar%29</text></controlProperties>
    </control>

    <!-- Botones -->
    <control controlID="21" controlTypeID="com.balsamiq.mockups::Button" x="48" y="575" w="160" h="38" measuredW="150" measuredH="27" zOrder="21" locked="false" isInGroup="-1">
      <controlProperties><text>PROBAR%20H%C3%81PTICO</text></controlProperties>
    </control>
    <control controlID="22" controlTypeID="com.balsamiq.mockups::Button" x="218" y="575" w="160" h="38" measuredW="145" measuredH="27" zOrder="22" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>GUARDAR%20PERFIL</text></controlProperties>
    </control>
    <control controlID="23" controlTypeID="com.balsamiq.mockups::Button" x="48" y="625" w="330" h="38" measuredW="295" measuredH="27" zOrder="23" locked="false" isInGroup="-1">
      <controlProperties><text>DESCARGAR%20CERTIFICADO%20%28Score%2095%29</text></controlProperties>
    </control>

    <control controlID="24" controlTypeID="com.balsamiq.mockups::StickyNote" x="240" y="680" w="140" h="70" measuredW="109" measuredH="123" zOrder="24" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Accesibilidad%20Universal.%0ACumple%20WCAG%202.2%20AA%0Ae%20ISO%209241-171.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W04_Contrato_Digital_Familiar: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="55" h="26" measuredW="55" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%3C%20Atr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="110" y="110" w="200" h="-1" measuredW="195" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Contrato%20Digital%20Familiar</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::Button" x="315" y="115" w="65" h="26" measuredW="65" measuredH="26" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><text>%5BAcuerdo%5D</text></controlProperties>
    </control>

    <control controlID="4" controlTypeID="com.balsamiq.mockups::Label" x="50" y="150" w="325" h="-1" measuredW="280" measuredH="18" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><align>center</align><bold>true</bold><size>11</size><text>ACUERDO%20DE%20CONFIANZA%20FAMILIAR</text></controlProperties>
    </control>
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Label" x="50" y="170" w="325" h="-1" measuredW="260" measuredH="16" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><align>center</align><size>9</size><text>Tom%C3%A1s%20Morales%20%E2%87%84%20Ing.%20Ricardo%20Morales</text></controlProperties>
    </control>

    <!-- Condición 1: Meta de Score (Slider) -->
    <control controlID="6" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="195" w="330" h="115" measuredW="200" measuredH="170" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><text>Condici%C3%B3n%201%3A%20Meta%20de%20Score%20Semanal</text></controlProperties>
    </control>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::Label" x="60" y="215" w="305" h="-1" measuredW="240" measuredH="18" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>12</size><text>Meta%20Pactada%3A%2088%20PUNTOS</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::HSlider" x="60" y="240" w="305" h="-1" measuredW="33" measuredH="11" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><value>60</value></controlProperties>
    </control>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::Label" x="60" y="260" w="305" h="-1" measuredW="295" measuredH="15" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>80%20pts%20%28B%C3%A1sico%29%20%E2%80%A2%2088%20pts%20%28Recomendado%29%20%E2%80%A2%2095%20pts%20%28M%C3%A1x%29</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::Label" x="60" y="280" w="305" h="-1" measuredW="280" measuredH="15" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Puntaje%20objetivo%20le%C3%ADdo%20del%20bus%20CAN%20del%20auto.</text></controlProperties>
    </control>

    <!-- Condición 2: Geocercas -->
    <control controlID="11" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="325" w="330" h="160" measuredW="200" measuredH="170" zOrder="11" locked="false" isInGroup="-1">
      <controlProperties><text>Condici%C3%B3n%202%3A%20Geocercas%20Autorizadas</text></controlProperties>
    </control>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="350" w="305" h="22" measuredW="270" measuredH="22" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><selected>true</selected><size>10</size><text>Campus%20UTP%20%28Radio%20200m%20%E2%80%A2%20Check-in%20P%29</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="380" w="305" h="22" measuredW="280" measuredH="22" zOrder="13" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><selected>true</selected><size>10</size><text>Hogar%20Familiar%20%28Cerro%20Colorado%20150m%29</text></controlProperties>
    </control>
    <control controlID="14" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="410" w="305" h="22" measuredW="275" measuredH="22" zOrder="14" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><selected>true</selected><size>10</size><text>Gimnasio%20/%20Polideportivo%20%28150m%29</text></controlProperties>
    </control>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::Button" x="60" y="445" w="150" h="26" measuredW="145" measuredH="26" zOrder="15" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>%2B%20Agregar%20Geocerca</text></controlProperties>
    </control>

    <!-- Compromiso Mutuo -->
    <control controlID="16" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="500" w="330" h="95" measuredW="200" measuredH="170" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><text>Compromiso%20de%20Autonom%C3%ADa%20Mutua</text></controlProperties>
    </control>
    <control controlID="17" controlTypeID="com.balsamiq.mockups::Paragraph" x="55" y="520" w="315" h="65" measuredW="200" measuredH="80" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>Si%20Tom%C3%A1s%20mantiene%20Score%20%3E%3D%2088%20pts%2C%20el%20sistema%20autoriza%20autom%C3%A1ticamente%20el%20pr%C3%A9stamo%20el%20fin%20de%20semana%20sin%20discusiones%20subjetivas.</text></controlProperties>
    </control>

    <!-- Botón -->
    <control controlID="18" controlTypeID="com.balsamiq.mockups::Button" x="48" y="615" w="330" h="45" measuredW="295" measuredH="27" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>CONFIRMAR%20Y%20FIRMAR%20CONTRATO</text></controlProperties>
    </control>

    <control controlID="19" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="675" w="135" h="70" measuredW="109" measuredH="123" zOrder="19" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Sustituye%20discusiones%0Apor%20reglas%20claras.%0ARF-10%20formalizado.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W05_Manual_Uso_Onboarding: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="55" h="26" measuredW="55" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%3C%20Atr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="110" y="110" w="200" h="-1" measuredW="180" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Manual%20de%20Uso%20y%20Gu%C3%ADa</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::Button" x="320" y="115" w="60" h="26" measuredW="60" measuredH="26" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><text>%5BGu%C3%ADa%5D</text></controlProperties>
    </control>

    <control controlID="4" controlTypeID="com.balsamiq.mockups::Label" x="50" y="150" w="325" h="-1" measuredW="280" measuredH="18" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><align>center</align><bold>true</bold><size>11</size><text>ONBOARDING%3A%20PASO%20A%20PASO%20FAMILIAR</text></controlProperties>
    </control>

    <!-- Paso 1 -->
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="185" w="330" h="80" measuredW="100" measuredH="70" zOrder="5" locked="false" isInGroup="-1"/>
    <control controlID="6" controlTypeID="com.balsamiq.mockups::RoundButton" x="58" y="200" w="35" h="35" measuredW="32" measuredH="32" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>1</text></controlProperties>
    </control>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::Paragraph" x="105" y="195" w="260" h="65" measuredW="200" measuredH="80" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Paso%201%3A%20Vincular%20con%20SYNC%204%0A%5Bsize%3D8%5DIngresa%20el%20VIN%20en%20FordPass%20para%20activar%20la%20captura%20telem%C3%A1tica%20del%20bus%20CAN%20en%20segundo%20plano.%5B/size%5D</text></controlProperties>
    </control>

    <!-- Paso 2 -->
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="275" w="330" h="80" measuredW="100" measuredH="70" zOrder="8" locked="false" isInGroup="-1"/>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::RoundButton" x="58" y="290" w="35" h="35" measuredW="32" measuredH="32" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>2</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::Paragraph" x="105" y="285" w="260" h="65" measuredW="200" measuredH="80" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Paso%202%3A%20Pactar%20Contrato%20Digital%0A%5Bsize%3D8%5DSeleccionen%20el%20Score%20meta%20%28ej.%2088%20pts%29%20y%20las%20geocercas%20de%20arribo%20seguro%20%28UTP%2C%20Hogar%29.%5B/size%5D</text></controlProperties>
    </control>

    <!-- Paso 3 -->
    <control controlID="11" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="365" w="330" h="80" measuredW="100" measuredH="70" zOrder="11" locked="false" isInGroup="-1"/>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::RoundButton" x="58" y="380" w="35" h="35" measuredW="32" measuredH="32" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>3</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::Paragraph" x="105" y="375" w="260" h="65" measuredW="200" measuredH="80" zOrder="13" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Paso%203%3A%20Conducir%20en%20Silencio%0A%5Bsize%3D8%5DLa%20pantalla%20SYNC%204%20gu%C3%ADa%20con%20resplandor%20cian%20ambiental%20y%20Co-Pilot360%20sin%20pitidos.%5B/size%5D</text></controlProperties>
    </control>

    <!-- Paso 4 -->
    <control controlID="14" controlTypeID="com.balsamiq.mockups::Canvas" x="48" y="455" w="330" h="80" measuredW="100" measuredH="70" zOrder="14" locked="false" isInGroup="-1"/>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::RoundButton" x="58" y="470" w="35" h="35" measuredW="32" measuredH="32" zOrder="15" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>4</text></controlProperties>
    </control>
    <control controlID="16" controlTypeID="com.balsamiq.mockups::Paragraph" x="105" y="465" w="260" h="65" measuredW="200" measuredH="80" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>10</size><text>Paso%204%3A%20Llegada%20Segura%20y%20Score%0A%5Bsize%3D8%5DAl%20poner%20Park%20%28P%29%2C%20el%20padre%20recibe%20push%20y%20el%20joven%20desbloquea%20sus%20medallas.%5B/size%5D</text></controlProperties>
    </control>

    <control controlID="17" controlTypeID="com.balsamiq.mockups::Button" x="48" y="565" w="330" h="45" measuredW="230" measuredH="27" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>INICIAR%20TOUR%20INTERACTIVO</text></controlProperties>
    </control>

    <control controlID="18" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="635" w="135" h="70" measuredW="109" measuredH="123" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Onboarding%20sin%20fricci%C3%B3n.%0ACapacita%20a%20la%20familia%0Aen%203%20minutos.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W06_Centro_Ayuda_FAQ: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="55" h="26" measuredW="55" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%3C%20Atr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="110" y="110" w="200" h="-1" measuredW="180" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Centro%20de%20Ayuda%20y%20FAQ</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::Button" x="325" y="115" w="50" h="26" measuredW="50" measuredH="26" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><text>%5B%20%3F%20%5D</text></controlProperties>
    </control>

    <control controlID="4" controlTypeID="com.balsamiq.mockups::SearchBox" x="48" y="155" w="330" h="-1" measuredW="200" measuredH="25" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><text>Buscar%20dudas%20o%20preguntas...</text></controlProperties>
    </control>

    <!-- Acordeón de FAQs -->
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Accordion" x="48" y="195" w="330" h="280" measuredW="240" measuredH="240" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties>
        <selectedIndex>0</selectedIndex>
        <text>%C2%BFC%C3%B3mo%20se%20calcula%20mi%20Score%20%280-100%29%3F%0A-%20Pondera%2040%25%20freno%20CAN%2C%2030%25%20carril%20y%2030%25%20velocidad.%0A-%20Frenadas%20de%20emergencia%20preventivas%20NO%20descuentan.%0A%C2%BFPor%20qu%C3%A9%20mis%20padres%20no%20ven%20mi%20mapa%20en%20vivo%3F%0A%C2%BFQu%C3%A9%20ocurre%20si%20se%20apaga%20el%20m%C3%B3vil%20del%20hijo%3F</text>
      </controlProperties>
    </control>

    <!-- Tarjeta de Asistencia Ford 24/7 -->
    <control controlID="6" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="495" w="330" h="110" measuredW="200" measuredH="170" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><text>%C2%BFDudas%20o%20soporte%20t%C3%A9cnico%3F</text></controlProperties>
    </control>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::Paragraph" x="60" y="520" w="305" h="45" measuredW="200" measuredH="80" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>Asistencia%20Ford%20SafeTeen%2024/7%20disponible%20para%20consultas%20de%20telemetr%C3%ADa%20y%20privacidad%20familiar.</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Button" x="60" y="565" w="305" h="30" measuredW="220" measuredH="27" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>CONTACTAR%20SOPORTE%20FORD</text></controlProperties>
    </control>

    <control controlID="9" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="625" w="135" h="70" measuredW="109" measuredH="123" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Resuelve%20dudas%20de%0Aprivacidad%20y%20despeja%0Ael%20p%C3%A1nico%20parental.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W07_Configuracion_General: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="450" measuredH="880" mockupW="400" mockupH="850">
  <controls>
    <control controlID="0" controlTypeID="com.balsamiq.mockups::iPhone" x="20" y="10" w="390" h="840" measuredW="282" measuredH="510" zOrder="0" locked="false" isInGroup="-1"/>
    
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Button" x="50" y="115" w="55" h="26" measuredW="55" measuredH="26" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><text>%3C%20Atr%C3%A1s</text></controlProperties>
    </control>
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="110" y="110" w="200" h="-1" measuredW="185" measuredH="20" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><size>13</size><bold>true</bold><text>Configuraci%C3%B3n%20General</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::Button" x="325" y="115" w="50" h="26" measuredW="50" measuredH="26" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><text>%5B%20%E2%9A%99%20%5D</text></controlProperties>
    </control>

    <!-- Bloque 1: Vehículo -->
    <control controlID="4" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="150" w="330" h="80" measuredW="200" measuredH="170" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><text>Veh%C3%ADculo%20Vinculado%20%28FordPass%29</text></controlProperties>
    </control>
    <control controlID="5" controlTypeID="com.balsamiq.mockups::Paragraph" x="60" y="170" w="305" h="50" measuredW="200" measuredH="80" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><size>9</size><text>Ford%20Territory%20Titanium%201.5L%20EcoBoost%0AVIN%3A%203FADP4BJ9NM82143%20%E2%80%A2%20M%C3%B3dem%204G%20LTE%0AEstado%3A%20En%20l%C3%ADnea%20%28MQTT%20Cifrado%20Activo%29</text></controlProperties>
    </control>

    <!-- Bloque 2: Perfiles -->
    <control controlID="6" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="240" w="330" h="120" measuredW="200" measuredH="170" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><text>Gesti%C3%B3n%20de%20Perfiles%20Familiares</text></controlProperties>
    </control>
    <control controlID="7" controlTypeID="com.balsamiq.mockups::Label" x="60" y="260" w="305" h="-1" measuredW="260" measuredH="16" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>%E2%80%A2%20Tom%C3%A1s%20Morales%20%28Conductor%20Joven%20Activo%29</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Label" x="60" y="280" w="305" h="-1" measuredW="260" measuredH="16" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>%E2%80%A2%20Ricardo%20Morales%20%28Tutor%20Administrador%29</text></controlProperties>
    </control>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::Label" x="60" y="300" w="305" h="-1" measuredW="285" measuredH="16" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>%E2%80%A2%20Mateo%20Huarca%20%28Perfil%20Inclusivo%20Hipoacusia%29</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::Button" x="60" y="325" w="140" h="24" measuredW="135" measuredH="26" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>%2B%20A%C3%B1adir%20Miembro</text></controlProperties>
    </control>

    <!-- Bloque 3: Ajustes de Privacidad -->
    <control controlID="11" controlTypeID="com.balsamiq.mockups::FieldSet" x="48" y="370" w="330" h="150" measuredW="200" measuredH="170" zOrder="11" locked="false" isInGroup="-1">
      <controlProperties><text>Ajustes%20de%20Privacidad%20y%20Telemetr%C3%ADa</text></controlProperties>
    </control>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="395" w="305" h="20" measuredW="280" measuredH="20" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>9</size><text>Ocultar%20mapa%20satelital%20detallado%20al%20tutor</text></controlProperties>
    </control>
    <control controlID="13" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="420" w="305" h="20" measuredW="285" measuredH="20" zOrder="13" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>9</size><text>Confirmaci%C3%B3n%20autom%C3%A1tica%20en%20Park%20%28P%29</text></controlProperties>
    </control>
    <control controlID="14" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="445" w="305" h="20" measuredW="275" measuredH="20" zOrder="14" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>9</size><text>Compartir%20nivel%20de%20bater%C3%ADa%20del%20m%C3%B3vil</text></controlProperties>
    </control>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::CheckBox" x="60" y="470" w="305" h="20" measuredW="280" measuredH="20" zOrder="15" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>9</size><text>Tolerancia%20de%20paradas%20r%C3%A1pidas%20%2815%20min%29</text></controlProperties>
    </control>

    <!-- Botones de Acción -->
    <control controlID="16" controlTypeID="com.balsamiq.mockups::Button" x="48" y="535" w="155" h="38" measuredW="150" measuredH="27" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><text>RESTABLECER</text></controlProperties>
    </control>
    <control controlID="17" controlTypeID="com.balsamiq.mockups::Button" x="215" y="535" w="163" h="38" measuredW="160" measuredH="27" zOrder="17" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>GUARDAR%20CAMBIOS</text></controlProperties>
    </control>

    <control controlID="18" controlTypeID="com.balsamiq.mockups::StickyNote" x="250" y="595" w="135" h="70" measuredW="109" measuredH="123" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Administraci%C3%B3n%20central%0Ade%20privacidad%20y%0Aseguridad%20familiar.</text></controlProperties>
    </control>
  </controls>
</mockup>`,

    W08_Cabina_SYNC4_HMI: `
<mockup version="1.0" skin="sketch" fontFace="Balsamiq Sans" measuredW="980" measuredH="640" mockupW="940" mockupH="600">
  <controls>
    <!-- Marco de la Consola Táctil de Cabina SYNC 4 (12 pulgadas) -->
    <control controlID="0" controlTypeID="com.balsamiq.mockups::Canvas" x="20" y="20" w="940" h="600" measuredW="100" measuredH="70" zOrder="0" locked="false" isInGroup="-1">
      <controlProperties><borderStyle>roundedSolid</borderStyle></controlProperties>
    </control>

    <!-- Marco de Luz Ambiental Cian (Coaching Silencioso) -->
    <control controlID="1" controlTypeID="com.balsamiq.mockups::Canvas" x="35" y="35" w="910" h="570" measuredW="100" measuredH="70" zOrder="1" locked="false" isInGroup="-1">
      <controlProperties><borderStyle>square</borderStyle></controlProperties>
    </control>

    <!-- Barra de Estado Superior -->
    <control controlID="2" controlTypeID="com.balsamiq.mockups::Title" x="50" y="45" w="220" h="-1" measuredW="160" measuredH="22" zOrder="2" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>14</size><text>FORD%20SYNC%204</text></controlProperties>
    </control>
    <control controlID="3" controlTypeID="com.balsamiq.mockups::SubTitle" x="320" y="45" w="320" h="-1" measuredW="295" measuredH="20" zOrder="3" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>13</size><text>SAFETEEN%20CO-DRIVE%3A%20MODO%20ACTIVO</text></controlProperties>
    </control>
    <control controlID="4" controlTypeID="com.balsamiq.mockups::Label" x="780" y="45" w="150" h="-1" measuredW="115" measuredH="18" zOrder="4" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>12</size><text>21%C2%B0C%20%E2%80%A2%2019%3A32%20hrs</text></controlProperties>
    </control>

    <control controlID="5" controlTypeID="com.balsamiq.mockups::Label" x="50" y="75" w="400" h="-1" measuredW="310" measuredH="16" zOrder="5" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Conductor%20Detectado%3A%20Tom%C3%A1s%20Morales%20%28SYNC%20Bluetooth%29</text></controlProperties>
    </control>
    <control controlID="6" controlTypeID="com.balsamiq.mockups::Label" x="550" y="75" w="380" h="-1" measuredW="270" measuredH="16" zOrder="6" locked="false" isInGroup="-1">
      <controlProperties><align>right</align><size>10</size><text>Modo%20Copiloto%20Silencioso%3A%20%5BACTIVO%20-%20SIN%20PITIDOS%5D</text></controlProperties>
    </control>

    <!-- Panel Dividido Izquierdo: Ruta hacia Geocerca -->
    <control controlID="7" controlTypeID="com.balsamiq.mockups::FieldSet" x="50" y="105" w="410" h="335" measuredW="200" measuredH="170" zOrder="7" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>Navegaci%C3%B3n%20Hacia%20Geocerca%20Pactada</text></controlProperties>
    </control>
    <control controlID="8" controlTypeID="com.balsamiq.mockups::Label" x="65" y="130" w="370" h="-1" measuredW="295" measuredH="18" zOrder="8" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>12</size><text>Destino%3A%20Campus%20UTP%20%28Arequipa%20-%20Parque%20Industrial%29</text></controlProperties>
    </control>
    <control controlID="9" controlTypeID="com.balsamiq.mockups::Label" x="65" y="155" w="370" h="-1" measuredW="245" measuredH="16" zOrder="9" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Distancia%20Restante%3A%202.4%20km%20%28Aprox.%206%20minutos%29</text></controlProperties>
    </control>
    <control controlID="10" controlTypeID="com.balsamiq.mockups::CheckBox" x="65" y="180" w="370" h="20" measuredW="335" measuredH="20" zOrder="10" locked="false" isInGroup="-1">
      <controlProperties><selected>true</selected><size>10</size><text>Geocerca%20UTP%20Armada%20%28Auto-Checkin%20al%20poner%20Park%20P%29</text></controlProperties>
    </control>
    <!-- Trayecto esquemático sin mapa invasivo -->
    <control controlID="11" controlTypeID="com.balsamiq.mockups::Canvas" x="65" y="210" w="380" h="215" measuredW="100" measuredH="70" zOrder="11" locked="false" isInGroup="-1"/>
    <control controlID="12" controlTypeID="com.balsamiq.mockups::Paragraph" x="75" y="225" w="360" h="190" measuredW="200" measuredH="80" zOrder="12" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>%5B%20V%C3%8DA%20DIRECTA%20DESPEJADA%20%5D%0A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5BAUTO%20FORD%5D%20----%3E%20%5BGEOCERCA%20UTP%5D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%0A*%20Navegaci%C3%B3n%20limpia%20sin%20saturaci%C3%B3n%20visual%0A*%20Cero%20distracciones%20al%20volante</text></controlProperties>
    </control>

    <!-- Panel Dividido Derecho: Telemetría CAN en Vivo -->
    <control controlID="13" controlTypeID="com.balsamiq.mockups::FieldSet" x="480" y="105" w="455" h="335" measuredW="200" measuredH="170" zOrder="13" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><text>Evaluaci%C3%B3n%20Cinem%C3%A1tica%20Bus%20CAN%20%28RF-01%20y%20RF-08%29</text></controlProperties>
    </control>
    <control controlID="14" controlTypeID="com.balsamiq.mockups::Label" x="500" y="135" w="420" h="-1" measuredW="365" measuredH="18" zOrder="14" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>11</size><text>Presi%C3%B3n%20de%20Frenos%3A%20Fluida%20y%20Progresiva%20%5B96%25%20%C3%93ptimo%5D</text></controlProperties>
    </control>
    <control controlID="15" controlTypeID="com.balsamiq.mockups::ProgressBar" x="500" y="158" w="415" h="16" measuredW="100" measuredH="20" zOrder="15" locked="false" isInGroup="-1"/>

    <control controlID="16" controlTypeID="com.balsamiq.mockups::Label" x="500" y="188" w="420" h="-1" measuredW="355" measuredH="18" zOrder="16" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>11</size><text>Centrado%20de%20Carril%20Co-Pilot360%3A%20Activo%20%5BSin%20Desv%C3%ADos%5D</text></controlProperties>
    </control>
    <control controlID="17" controlTypeID="com.balsamiq.mockups::ProgressBar" x="500" y="210" w="415" h="16" measuredW="100" measuredH="20" zOrder="17" locked="false" isInGroup="-1"/>

    <control controlID="18" controlTypeID="com.balsamiq.mockups::Label" x="500" y="240" w="420" h="-1" measuredW="335" measuredH="18" zOrder="18" locked="false" isInGroup="-1">
      <controlProperties><bold>true</bold><size>11</size><text>Velocidad%20Actual%3A%2048%20km/h%20%28L%C3%ADmite%20de%20v%C3%ADa%3A%2050%20km/h%29</text></controlProperties>
    </control>
    <control controlID="19" controlTypeID="com.balsamiq.mockups::ProgressBar" x="500" y="262" w="415" h="16" measuredW="100" measuredH="20" zOrder="19" locked="false" isInGroup="-1"/>

    <control controlID="20" controlTypeID="com.balsamiq.mockups::Label" x="500" y="295" w="420" h="-1" measuredW="345" measuredH="16" zOrder="20" locked="false" isInGroup="-1">
      <controlProperties><size>10</size><text>Volumen%20Multimedia%3A%2065%25%20%28Sin%20bloqueos%20punitivos%20MyKey%29</text></controlProperties>
    </control>
    <control controlID="21" controlTypeID="com.balsamiq.mockups::Label" x="500" y="325" w="420" h="-1" measuredW="415" measuredH="15" zOrder="21" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>Coaching%20no%20invasivo%3A%20resplandor%20ambiental%20cian%20sustituye%20pitidos%20estresantes.</text></controlProperties>
    </control>

    <!-- Banner Inferior de Alerta Inclusiva (RF-13) -->
    <control controlID="22" controlTypeID="com.balsamiq.mockups::Alert" x="50" y="450" w="885" h="70" measuredW="200" measuredH="100" zOrder="22" locked="false" isInGroup="-1">
      <controlProperties><text>%21%20ALERTA%20VISUAL%20INCLUSIVA%3A%20SIRENA%20DE%20EMERGENCIA%20DETECTADA%0AAmbulancia%20aproxim%C3%A1ndose%20por%20retaguardia%20%E2%80%A2%20Volante%3A%20pulsos%20h%C3%A1pticos%20en%20lado%20izquierdo</text></controlProperties>
    </control>

    <!-- Barra Inferior de Aplicaciones de Cabina -->
    <control controlID="23" controlTypeID="com.balsamiq.mockups::ButtonBar" x="50" y="530" w="885" h="38" measuredW="430" measuredH="27" zOrder="23" locked="false" isInGroup="-1">
      <controlProperties><text>Clima%2021%C2%B0C%2C%20SafeTeen%20Coaching%2C%20Navegaci%C3%B3n%2C%20Apps%20FordPass%2C%20Audio/BT</text></controlProperties>
    </control>

    <control controlID="24" controlTypeID="com.balsamiq.mockups::StickyNote" x="780" y="520" w="155" h="80" measuredW="109" measuredH="123" zOrder="24" locked="false" isInGroup="-1">
      <controlProperties><size>8</size><text>HMI%20SYNC%204%20de%2012%27%27%3A%0ACoaching%20ambiental%20sin%20pitidos%0Ay%20alerta%20visual%20para%20hipoacusia.</text></controlProperties>
    </control>
  </controls>
</mockup>`
};

// Escribir los 8 archivos BMML
pantallas.forEach(p => {
    const xml = bmmlTemplates[p.archivoId];
    if (xml) {
        fs.writeFileSync(path.join(outDir, `${p.archivoId}.bmml`), xml.trim());
        console.log(`  ✔ BMML creado: ${p.archivoId}.bmml`);
    }
});

// ==========================================
// 2. GENERACIÓN DE ARCHIVOS VECTORIALES SVG (.svg)
// ==========================================
console.log('\n-> Generando archivos Vectoriales SVG en estilo boceto Balsamiq...');

function renderSvgPhone(contentInside, stickyText, screenCode, title, subtitle) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 920" width="460" height="920">
  <defs>
    <filter id="balsamiq-shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="4" dy="4" stdDeviation="0" flood-color="#000000" flood-opacity="0.9" />
    </filter>
    <filter id="sticky-shadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="#000000" flood-opacity="0.7" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&amp;display=swap');
    text {
      font-family: 'Comic Neue', 'Comic Sans MS', cursive, sans-serif;
      fill: #18181b;
    }
    .sketch-border {
      stroke: #18181b;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  </style>

  <!-- Fondo General de Mesa de Trabajo -->
  <rect x="0" y="0" width="460" height="920" fill="#f8fafc" />

  <!-- Chasis Smartphone Estilo Balsamiq -->
  <rect x="35" y="25" width="390" height="860" rx="36" fill="#ffffff" stroke="#18181b" stroke-width="3" filter="url(#balsamiq-shadow)" />

  <!-- Bocina y Cámara Frontal (Notch) -->
  <rect x="190" y="42" width="60" height="6" rx="3" fill="#18181b" />
  <circle cx="265" cy="45" r="4" fill="#18181b" />

  <!-- Área de Pantalla -->
  <rect x="52" y="65" width="356" height="780" rx="18" fill="#ffffff" class="sketch-border" />

  <!-- Barra Superior de Navegación -->
  <rect x="65" y="80" width="45" height="28" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="76" y="98" font-size="12" font-weight="bold">[ = ]</text>

  <text x="230" y="93" text-anchor="middle" font-size="14" font-weight="bold">${title}</text>
  <text x="230" y="108" text-anchor="middle" font-size="10" fill="#52525b">${subtitle}</text>

  <rect x="345" y="80" width="50" height="28" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="355" y="98" font-size="10" font-weight="bold">${screenCode}</text>

  <line x1="65" y1="118" x2="395" y2="118" stroke="#18181b" stroke-width="1.8" stroke-dasharray="4,4" />

  <!-- Contenido Inyectado de la Pantalla -->
  ${contentInside}

  <!-- Botón Home Inferior del Smartphone -->
  <rect x="180" y="860" width="100" height="4" rx="2" fill="#18181b" />

  <!-- Sticky Note de Balsamiq -->
  <g transform="rotate(-3 340 820)">
    <rect x="230" y="745" width="165" height="85" rx="2" fill="#fef08a" stroke="#18181b" stroke-width="1.8" filter="url(#sticky-shadow)" />
    <text x="240" y="765" font-size="10" font-weight="bold" fill="#854d0e">📌 NOTA BALSAMIQ:</text>
    <text x="240" y="782" font-size="8.5" fill="#713f12">${stickyText[0]}</text>
    <text x="240" y="796" font-size="8.5" fill="#713f12">${stickyText[1]}</text>
    <text x="240" y="810" font-size="8.5" fill="#713f12">${stickyText[2]}</text>
  </g>
</svg>`;
}

// 1. W-01: Conductor Joven
const svgW01 = renderSvgPhone(`
  <!-- Identidad -->
  <text x="230" y="140" text-anchor="middle" font-size="11" font-weight="bold">MODO CONDUCTOR: TOMÁS MORALES (20 AÑOS)</text>
  <text x="230" y="155" text-anchor="middle" font-size="9" fill="#71717a">Ford Territory Titanium 1.5L EcoBoost • Arequipa</text>

  <!-- Dial Circular Score 94/100 -->
  <circle cx="230" cy="235" r="65" fill="#ffffff" stroke="#18181b" stroke-width="3" filter="url(#balsamiq-shadow)" />
  <circle cx="230" cy="235" r="55" fill="#ffffff" stroke="#18181b" stroke-width="1.5" stroke-dasharray="3,3" />
  <text x="230" y="240" text-anchor="middle" font-size="40" font-weight="bold">94</text>
  <text x="230" y="258" text-anchor="middle" font-size="12" fill="#71717a">/ 100</text>
  
  <rect x="175" y="268" width="110" height="18" rx="9" fill="#18181b" />
  <text x="230" y="281" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">* NIVEL: EXCELENTE *</text>

  <text x="230" y="318" text-anchor="middle" font-size="9" fill="#71717a">* Ponderación Objetiva por Bus CAN Vehicular *</text>

  <!-- Card: Desglose Telemático Post-Viaje -->
  <rect x="68" y="335" width="324" height="195" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="358" font-size="11" font-weight="bold">DESGLOSE TELEMÁTICO POST-VIAJE:</text>
  <text x="310" y="358" font-size="9" fill="#71717a">CAN 500k</text>

  <!-- Métrica 1: Frenado -->
  <text x="82" y="385" font-size="10" font-weight="bold">Frenado Suave y Anticipado (40%)</text>
  <text x="365" y="385" text-anchor="end" font-size="11" font-weight="bold">96%</text>
  <rect x="82" y="392" width="295" height="12" rx="6" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="82" y="392" width="283" height="12" rx="6" fill="#18181b" />
  <text x="82" y="415" font-size="8" fill="#71717a">Co-Pilot360 validó frenadas preventivas sin castigo</text>

  <!-- Métrica 2: Carril -->
  <text x="82" y="435" font-size="10" font-weight="bold">Mantenimiento de Carril (30%)</text>
  <text x="365" y="435" text-anchor="end" font-size="11" font-weight="bold">92%</text>
  <rect x="82" y="442" width="295" height="12" rx="6" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="82" y="442" width="271" height="12" rx="6" fill="#18181b" />
  <text x="82" y="465" font-size="8" fill="#71717a">Cero desvíos involuntarios en Variante Uchumayo</text>

  <!-- Métrica 3: Velocidad -->
  <text x="82" y="485" font-size="10" font-weight="bold">Velocidad Controlada en Ruta (30%)</text>
  <text x="365" y="485" text-anchor="end" font-size="11" font-weight="bold">94%</text>
  <rect x="82" y="492" width="295" height="12" rx="6" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="82" y="492" width="277" height="12" rx="6" fill="#18181b" />

  <!-- Card: Gamificación y Rachas -->
  <rect x="68" y="542" width="324" height="110" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="230" y="562" text-anchor="middle" font-size="10" font-weight="bold">🏆 RACHA DE MANEJO SEGURO: 14 DÍAS</text>

  <rect x="78" y="575" width="65" height="42" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="110" y="593" text-anchor="middle" font-size="9" font-weight="bold">[Freno]</text>
  <text x="110" y="607" text-anchor="middle" font-size="8">Nivel Oro</text>

  <rect x="153" y="575" width="65" height="42" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="185" y="593" text-anchor="middle" font-size="9" font-weight="bold">[Eco]</text>
  <text x="185" y="607" text-anchor="middle" font-size="8">Driver</text>

  <rect x="228" y="575" width="65" height="42" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="260" y="593" text-anchor="middle" font-size="9" font-weight="bold">[Noche]</text>
  <text x="260" y="607" text-anchor="middle" font-size="8">Prudente</text>

  <rect x="303" y="575" width="65" height="42" rx="6" fill="#f4f4f5" class="sketch-border" />
  <text x="335" y="593" text-anchor="middle" font-size="9" font-weight="bold">[Carril]</text>
  <text x="335" y="607" text-anchor="middle" font-size="8">100% Pro</text>

  <text x="230" y="640" text-anchor="middle" font-size="8.5" fill="#71717a">Superaste la meta de 88 pts pactada en el Contrato</text>

  <!-- Botón de Acción Principal -->
  <rect x="68" y="665" width="324" height="42" rx="10" fill="#18181b" class="sketch-border" filter="url(#balsamiq-shadow)" />
  <text x="230" y="691" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">COMPARTIR SCORE CON TUTOR</text>
`, [
    '• Sin mapa satelital continuo.',
    '• Score CAN inmutable (RF-02).',
    '• Gamificación por logros (RF-06).'
], 'W-01', 'Ford SafeTeen Co-Drive', 'Modo Conductor Joven');

// 2. W-02: Tutor Paz Mental
const svgW02 = renderSvgPhone(`
  <!-- Identidad -->
  <text x="230" y="140" text-anchor="middle" font-size="11" font-weight="bold">MODO TUTOR: ING. RICARDO MORALES</text>
  <text x="230" y="155" text-anchor="middle" font-size="9" fill="#71717a">Vehículo Monitoreado: Ford Territory Titanium</text>

  <!-- Peace of Mind Card -->
  <rect x="68" y="172" width="324" height="150" rx="10" fill="#ffffff" stroke="#18181b" stroke-width="2.5" filter="url(#balsamiq-shadow)" />
  <circle cx="108" cy="222" r="26" fill="#18181b" />
  <text x="108" y="228" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">[OK]</text>

  <text x="148" y="205" font-size="12" font-weight="bold">LLEGADA SEGURA CONFIRMADA</text>
  <text x="148" y="224" font-size="10">Destino: <tspan font-weight="bold">Campus UTP (Arequipa)</tspan></text>
  <text x="148" y="240" font-size="10">Hora de Arribo: <tspan font-weight="bold">19:45 hrs (A tiempo)</tspan></text>

  <line x1="80" y1="262" x2="380" y2="262" stroke="#18181b" stroke-width="1.5" stroke-dasharray="3,3" />

  <text x="90" y="284" font-size="9.5">✔ Estado Vehicular: <tspan font-weight="bold">Apagado / En Park (P)</tspan></text>
  <text x="90" y="304" font-size="9.5">✔ Seguro de Puertas: <tspan font-weight="bold">Bloqueado Automático</tspan></text>

  <!-- Smartphone del Joven -->
  <rect x="68" y="335" width="324" height="115" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="358" font-size="11" font-weight="bold">[DISPOSITIVO MÓVIL DE TOMÁS]</text>
  
  <text x="82" y="380" font-size="10">Nivel de Batería del Smartphone:</text>
  <text x="365" y="380" text-anchor="end" font-size="11" font-weight="bold">84%</text>
  <rect x="82" y="388" width="295" height="10" rx="5" fill="#e4e4e7" stroke="#18181b" stroke-width="1.2" />
  <rect x="82" y="388" width="248" height="10" rx="5" fill="#18181b" />

  <text x="82" y="418" font-size="9.5">● Interacciones en marcha: <tspan font-weight="bold">0 (Cero llamadas)</tspan></text>
  <text x="82" y="435" font-size="8" fill="#71717a">* Sin pánico: celular con carga y sin llamadas al volante.</text>

  <!-- Salud Mecánica -->
  <rect x="68" y="462" width="324" height="120" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="485" font-size="11" font-weight="bold">[SALUD MECÁNICA - BUS CAN]</text>
  <text x="82" y="508" font-size="9.5">• Pastillas de Freno: <tspan font-weight="bold">75% vida remanente (Óptimo)</tspan></text>
  <text x="82" y="528" font-size="9.5">• Eficiencia de Combustible: <tspan font-weight="bold">42 km/galón</tspan></text>
  <text x="82" y="548" font-size="9.5">• Próximo Service Ford: <tspan font-weight="bold">En 4,200 km programado</tspan></text>
  <text x="82" y="568" font-size="8" fill="#71717a">Preservación patrimonial del automóvil familiar garantizada.</text>

  <!-- Botón de Aprobación -->
  <rect x="68" y="595" width="324" height="42" rx="10" fill="#ffffff" stroke="#18181b" stroke-width="2.5" filter="url(#balsamiq-shadow)" />
  <text x="230" y="621" text-anchor="middle" font-size="11.5" font-weight="bold">APROBAR PRÉSTAMO FIN DE SEMANA</text>
`, [
    '• Notificación instantánea en Park (P).',
    '• Monitoreo pasivo de batería 84%.',
    '• Salud de frenos (RF-04, 05, 09).'
], 'W-02', 'Ford SafeTeen • Tutor', 'Paz Mental Parental');

// 3. W-03: Modo Inclusivo
const svgW03 = renderSvgPhone(`
  <text x="230" y="140" text-anchor="middle" font-size="11" font-weight="bold">PERFIL INCLUSIVO: MATEO HUARCA (21)</text>
  <text x="230" y="155" text-anchor="middle" font-size="9" fill="#71717a">Hipoacusia Neurosensorial (-65 dB) • ISO 9241-171</text>

  <!-- Switch 1 -->
  <rect x="68" y="172" width="324" height="60" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="80" y="195" font-size="10.5" font-weight="bold">Sustitución de Pitidos por Luces SYNC 4</text>
  <text x="80" y="212" font-size="8" fill="#71717a">Franjas cian/ámbar en pantalla 12'' sin sonidos molestos</text>
  <rect x="330" y="185" width="48" height="26" rx="13" fill="#18181b" />
  <circle cx="363" cy="198" r="9" fill="#ffffff" />

  <!-- Switch 2 -->
  <rect x="68" y="242" width="324" height="60" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="80" y="265" font-size="10.5" font-weight="bold">Pulsos Hápticos en Volante y Asiento</text>
  <text x="80" y="282" font-size="8" fill="#71717a">Vibración direccional en desvío de carril y punto ciego</text>
  <rect x="330" y="255" width="48" height="26" rx="13" fill="#18181b" />
  <circle cx="363" cy="268" r="9" fill="#ffffff" />

  <!-- Switch 3 -->
  <rect x="68" y="312" width="324" height="60" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="80" y="335" font-size="10.5" font-weight="bold">Detector Inteligente de Sirenas Externas</text>
  <text x="80" y="352" font-size="8" fill="#71717a">Micrófonos SYNC 4 reconocen acústica de ambulancias</text>
  <rect x="330" y="325" width="48" height="26" rx="13" fill="#18181b" />
  <circle cx="363" cy="338" r="9" fill="#ffffff" />

  <!-- Vista Previa en Clúster -->
  <rect x="68" y="385" width="324" height="130" rx="10" fill="#f4f4f5" class="sketch-border" />
  <text x="230" y="405" text-anchor="middle" font-size="9.5" font-weight="bold">VISTA PREVIA EN CLÚSTER SYNC 4</text>
  
  <rect x="80" y="415" width="300" height="55" rx="6" fill="#dc2626" stroke="#18181b" stroke-width="1.8" />
  <text x="230" y="438" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">⚠️ ALERTA VISUAL INCLUSIVA</text>
  <text x="230" y="455" text-anchor="middle" font-size="8.5" fill="#fee2e2">Ambulancia aproximándose por retaguardia</text>
  <text x="230" y="495" text-anchor="middle" font-size="8" fill="#71717a">(Volante: vibración lado izquierdo • Clúster: ámbar perimétrico)</text>

  <!-- Botones de Acción -->
  <rect x="68" y="528" width="155" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="145" y="552" text-anchor="middle" font-size="10" font-weight="bold">PROBAR HÁPTICO</text>

  <rect x="235" y="528" width="157" height="38" rx="8" fill="#18181b" class="sketch-border" />
  <text x="313" y="552" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">GUARDAR PERFIL</text>

  <rect x="68" y="576" width="324" height="38" rx="8" fill="#ffffff" stroke="#18181b" stroke-width="2" />
  <text x="230" y="600" text-anchor="middle" font-size="10" font-weight="bold">DESCARGAR CERTIFICADO (Score 95/100)</text>
`, [
    '• Accesibilidad universal sensorial.',
    '• Cumple WCAG 2.2 AA e ISO 9241-171.',
    '• Valida RF-13 y RF-14 (Mateo).'
], 'W-03', 'Accesibilidad Sensorial', 'Inclusión Universal ISO');

// 4. W-04: Contrato Digital
const svgW04 = renderSvgPhone(`
  <text x="230" y="140" text-anchor="middle" font-size="11" font-weight="bold">ACUERDO DE CONFIANZA FAMILIAR</text>
  <text x="230" y="155" text-anchor="middle" font-size="9" fill="#71717a">Tomás Morales (Hijo) ⇄ Ing. Ricardo Morales (Padre)</text>

  <!-- Condición 1 -->
  <rect x="68" y="172" width="324" height="115" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="195" font-size="10.5" font-weight="bold">Condición 1: Meta de Score Semanal</text>
  <text x="365" y="195" text-anchor="end" font-size="11" font-weight="bold">88 PUNTOS</text>

  <line x1="82" y1="225" x2="365" y2="225" stroke="#18181b" stroke-width="4" stroke-linecap="round" />
  <circle cx="260" cy="225" r="10" fill="#ffffff" stroke="#18181b" stroke-width="2.5" />
  <text x="82" y="248" font-size="8" fill="#71717a">80 pts (Básico)</text>
  <text x="260" y="248" text-anchor="middle" font-size="8" font-weight="bold">88 pts (Pactado)</text>
  <text x="365" y="248" text-anchor="end" font-size="8" fill="#71717a">95 pts (Máx)</text>

  <!-- Condición 2 -->
  <rect x="68" y="298" width="324" height="160" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="320" font-size="10.5" font-weight="bold">Condición 2: Geocercas de Arribo</text>
  <text x="365" y="320" text-anchor="end" font-size="9" fill="#71717a">3 Activas</text>

  <rect x="82" y="332" width="16" height="16" rx="3" fill="#18181b" />
  <text x="90" y="344" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">✓</text>
  <text x="108" y="344" font-size="10" font-weight="bold">Campus UTP (Arequipa)</text>
  <text x="108" y="356" font-size="8" fill="#71717a">Radio 200m • Check-in automático en Park</text>

  <rect x="82" y="368" width="16" height="16" rx="3" fill="#18181b" />
  <text x="90" y="380" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">✓</text>
  <text x="108" y="380" font-size="10" font-weight="bold">Hogar Familiar (Cerro Colorado)</text>
  <text x="108" y="392" font-size="8" fill="#71717a">Radio 150m • Check-in automático en Park</text>

  <rect x="82" y="404" width="16" height="16" rx="3" fill="#18181b" />
  <text x="90" y="416" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">✓</text>
  <text x="108" y="416" font-size="10" font-weight="bold">Gimnasio / Polideportivo</text>
  <text x="108" y="428" font-size="8" fill="#71717a">Radio 150m • Check-in automático</text>

  <!-- Compromiso Mutuo -->
  <rect x="68" y="470" width="324" height="95" rx="10" fill="#ffffff" class="sketch-border" />
  <text x="82" y="492" font-size="10.5" font-weight="bold">Compromiso de Autonomía Mutua:</text>
  <text x="82" y="512" font-size="8.5" fill="#3f3f46">"Si Tomás mantiene un Score semanal &gt;= 88 puntos,</text>
  <text x="82" y="526" font-size="8.5" fill="#3f3f46">el sistema aprueba automáticamente el vehículo</text>
  <text x="82" y="540" font-size="8.5" fill="#3f3f46">el viernes sin disputas ni llamadas invasivas."</text>

  <!-- Botón de Firma -->
  <rect x="68" y="580" width="324" height="42" rx="10" fill="#18181b" class="sketch-border" filter="url(#balsamiq-shadow)" />
  <text x="230" y="606" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">CONFIRMAR Y FIRMAR CONTRATO</text>
`, [
    '• Control deslizante único de Score.',
    '• Erradica negociaciones subjetivas.',
    '• Formaliza el RF-10 del sistema.'
], 'W-04', 'Contrato Digital Familiar', 'Autonomía y Confianza');

// 5. W-05: Onboarding
const svgW05 = renderSvgPhone(`
  <text x="230" y="140" text-anchor="middle" font-size="11" font-weight="bold">ONBOARDING: PASO A PASO FAMILIAR</text>
  <text x="230" y="155" text-anchor="middle" font-size="9" fill="#71717a">Guía rápida de configuración y uso inicial</text>

  <!-- Paso 1 -->
  <rect x="68" y="172" width="324" height="85" rx="8" fill="#ffffff" class="sketch-border" />
  <circle cx="95" cy="214" r="16" fill="#18181b" />
  <text x="95" y="220" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">1</text>
  <text x="122" y="196" font-size="10" font-weight="bold">Paso 1: Vincular Vehículo con SYNC 4</text>
  <text x="122" y="212" font-size="8" fill="#52525b">Ingresa el VIN en FordPass para activar</text>
  <text x="122" y="224" font-size="8" fill="#52525b">la telemetría del bus CAN en segundo plano.</text>

  <!-- Paso 2 -->
  <rect x="68" y="268" width="324" height="85" rx="8" fill="#ffffff" class="sketch-border" />
  <circle cx="95" cy="310" r="16" fill="#18181b" />
  <text x="95" y="316" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">2</text>
  <text x="122" y="292" font-size="10" font-weight="bold">Paso 2: Pactar Contrato Digital</text>
  <text x="122" y="308" font-size="8" fill="#52525b">Definan la meta semanal de Score (ej. 88 pts)</text>
  <text x="122" y="320" font-size="8" fill="#52525b">y geocercas autorizadas de arribo seguro.</text>

  <!-- Paso 3 -->
  <rect x="68" y="364" width="324" height="85" rx="8" fill="#ffffff" class="sketch-border" />
  <circle cx="95" cy="406" r="16" fill="#18181b" />
  <text x="95" y="412" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">3</text>
  <text x="122" y="388" font-size="10" font-weight="bold">Paso 3: Conducir en Modo Silencioso</text>
  <text x="122" y="404" font-size="8" fill="#52525b">La pantalla SYNC 4 guía con resplandor cian</text>
  <text x="122" y="416" font-size="8" fill="#52525b">ambiental y Co-Pilot360 sin pitidos molestos.</text>

  <!-- Paso 4 -->
  <rect x="68" y="460" width="324" height="85" rx="8" fill="#ffffff" class="sketch-border" />
  <circle cx="95" cy="502" r="16" fill="#18181b" />
  <text x="95" y="508" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">4</text>
  <text x="122" y="484" font-size="10" font-weight="bold">Paso 4: Llegada Segura y Score</text>
  <text x="122" y="500" font-size="8" fill="#52525b">Al situar Park (P), el padre recibe el push</text>
  <text x="122" y="512" font-size="8" fill="#52525b">y el joven desbloquea insignias de logro.</text>

  <!-- Botón -->
  <rect x="68" y="560" width="324" height="42" rx="10" fill="#18181b" class="sketch-border" filter="url(#balsamiq-shadow)" />
  <text x="230" y="586" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">INICIAR TOUR INTERACTIVO</text>
`, [
    '• Guía secuencial para novatos.',
    '• Facilita adopción intergeneracional.',
    '• Reduce fricción tecnológica en 3 min.'
], 'W-05', 'Manual de Uso y Guía', 'Onboarding Paso a Paso');

// 6. W-06: FAQ
const svgW06 = renderSvgPhone(`
  <rect x="68" y="135" width="324" height="34" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="156" font-size="10" fill="#71717a">Buscar dudas, preguntas o errores...  🔍</text>

  <!-- Acordeón 1: Desplegado -->
  <rect x="68" y="180" width="324" height="120" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="202" font-size="10.5" font-weight="bold">[-] ¿Cómo se calcula mi Score (0 a 100)?</text>
  <text x="82" y="222" font-size="8.5" fill="#3f3f46">• Pondera 40% suavidad de frenada (Bus CAN),</text>
  <text x="82" y="236" font-size="8.5" fill="#3f3f46">  30% mantenimiento de carril y 30% velocidad.</text>
  <text x="82" y="254" font-size="8.5" fill="#3f3f46">• Frenadas de emergencia preventivas frente a</text>
  <text x="82" y="268" font-size="8.5" fill="#3f3f46">  baches o animales NO descuentan puntos.</text>

  <!-- Acordeón 2 -->
  <rect x="68" y="310" width="324" height="45" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="337" font-size="10.5" font-weight="bold">[+] ¿Por qué mis padres no ven mi mapa en vivo?</text>

  <!-- Acordeón 3 -->
  <rect x="68" y="365" width="324" height="45" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="392" font-size="10.5" font-weight="bold">[+] ¿Qué hacer si se apaga el móvil del hijo?</text>

  <!-- Soporte Ford -->
  <rect x="68" y="430" width="324" height="110" rx="10" fill="#f4f4f5" class="sketch-border" />
  <text x="230" y="455" text-anchor="middle" font-size="10.5" font-weight="bold">¿NECESITAS MÁS ASISTENCIA FAMILIAR?</text>
  <text x="230" y="475" text-anchor="middle" font-size="8.5" fill="#52525b">Asistencia Ford SafeTeen 24/7 disponible</text>
  
  <rect x="85" y="490" width="290" height="34" rx="6" fill="#18181b" />
  <text x="230" y="511" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">CONTACTAR SOPORTE FORD (24/7)</text>
`, [
    '• Preguntas de las 18 entrevistas.',
    '• Transparencia en algoritmos CAN.',
    '• Cero dudas de privacidad familiar.'
], 'W-06', 'Centro de Ayuda y FAQ', 'Soporte y Consultas 24/7');

// 7. W-07: Configuración
const svgW07 = renderSvgPhone(`
  <!-- Bloque 1: Vehículo -->
  <rect x="68" y="135" width="324" height="85" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="156" font-size="10.5" font-weight="bold">VEHÍCULO VINCULADO (FORDPASS)</text>
  <text x="82" y="175" font-size="9">• Ford Territory Titanium 1.5L EcoBoost</text>
  <text x="82" y="192" font-size="9">• VIN: 3FADP4BJ9NM82143 • Módem: 4G LTE</text>
  <text x="82" y="209" font-size="9">• Conexión: En línea (Protocolo MQTT Cifrado)</text>

  <!-- Bloque 2: Perfiles -->
  <rect x="68" y="230" width="324" height="120" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="252" font-size="10.5" font-weight="bold">GESTIÓN DE PERFILES FAMILIARES</text>
  <text x="82" y="272" font-size="9">👤 Tomás Morales: Conductor Joven Activo</text>
  <text x="82" y="292" font-size="9">👤 Ricardo Morales: Tutor Administrador</text>
  <text x="82" y="312" font-size="9">👤 Mateo Huarca: Perfil Inclusivo (Hipoacusia)</text>
  <text x="82" y="335" font-size="8.5" font-weight="bold" fill="#0284c7">+ Añadir Miembro Familiar</text>

  <!-- Bloque 3: Ajustes -->
  <rect x="68" y="360" width="324" height="150" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="82" y="382" font-size="10.5" font-weight="bold">AJUSTES DE PRIVACIDAD Y TELEMETRÍA</text>

  <rect x="82" y="395" width="14" height="14" rx="2" fill="#18181b" />
  <text x="89" y="406" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">✓</text>
  <text x="104" y="406" font-size="9">Ocultar mapa satelital detallado al tutor</text>

  <rect x="82" y="420" width="14" height="14" rx="2" fill="#18181b" />
  <text x="89" y="431" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">✓</text>
  <text x="104" y="431" font-size="9">Confirmación automática de llegada en Park (P)</text>

  <rect x="82" y="445" width="14" height="14" rx="2" fill="#18181b" />
  <text x="89" y="456" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">✓</text>
  <text x="104" y="456" font-size="9">Compartir nivel de batería del smartphone</text>

  <rect x="82" y="470" width="14" height="14" rx="2" fill="#18181b" />
  <text x="89" y="481" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">✓</text>
  <text x="104" y="481" font-size="9">Tolerancia de paradas rápidas (15 minutos)</text>

  <!-- Botones -->
  <rect x="68" y="525" width="155" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="145" y="549" text-anchor="middle" font-size="10" font-weight="bold">RESTABLECER</text>

  <rect x="235" y="525" width="157" height="38" rx="8" fill="#18181b" class="sketch-border" />
  <text x="313" y="549" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">GUARDAR CAMBIOS</text>
`, [
    '• Gestión de chasis VIN y módem.',
    '• Roles familiares y privacidad.',
    '• Aislamiento criptográfico OAuth 2.0.'
], 'W-07', 'Configuración General', 'Ajustes y Privacidad');

// 8. W-08: Cabina SYNC 4 (Pantalla Horizontal de 12'')
const svgW08 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 640" width="1000" height="640">
  <defs>
    <filter id="balsamiq-shadow-sync" x="-3%" y="-3%" width="108%" height="108%">
      <feDropShadow dx="5" dy="5" stdDeviation="0" flood-color="#000000" flood-opacity="0.9" />
    </filter>
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&amp;display=swap');
    text {
      font-family: 'Comic Neue', 'Comic Sans MS', cursive, sans-serif;
      fill: #18181b;
    }
    .sketch-border {
      stroke: #18181b;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  </style>

  <!-- Mesa de Trabajo -->
  <rect x="0" y="0" width="1000" height="640" fill="#f8fafc" />

  <!-- Consola Táctil de Cabina SYNC 4 de 12'' -->
  <rect x="30" y="25" width="940" height="590" rx="28" fill="#ffffff" stroke="#18181b" stroke-width="3.5" filter="url(#balsamiq-shadow-sync)" />

  <!-- Marco de Luz Ambiental Cian (Coaching Silencioso) -->
  <rect x="48" y="42" width="904" height="556" rx="20" fill="none" stroke="#0891b2" stroke-width="4" stroke-dasharray="8,6" />

  <!-- Barra de Estado Superior -->
  <rect x="52" y="46" width="896" height="42" rx="14" fill="#f4f4f5" class="sketch-border" />
  <text x="80" y="73" font-size="14" font-weight="bold">FORD SYNC 4</text>
  <text x="500" y="73" text-anchor="middle" font-size="13" font-weight="bold">SAFETEEN CO-DRIVE: MODO ACTIVO</text>
  <text x="910" y="73" text-anchor="end" font-size="12" font-weight="bold">21°C • 19:32 hrs</text>

  <!-- Subtítulo de Cabina -->
  <text x="80" y="112" font-size="11">Conductor Detectado: <tspan font-weight="bold">Tomás Morales (SYNC Bluetooth)</tspan></text>
  <text x="910" y="112" text-anchor="end" font-size="11">Modo Copiloto Silencioso: <tspan font-weight="bold">[ACTIVO - SIN PITIDOS]</tspan></text>

  <!-- Panel Dividido Izquierdo: Ruta hacia Geocerca -->
  <rect x="70" y="130" width="410" height="320" rx="12" fill="#ffffff" class="sketch-border" />
  <text x="90" y="158" font-size="12.5" font-weight="bold">NAVEGACIÓN HACIA GEOCERCA PACTADA</text>
  <text x="90" y="180" font-size="10.5">Destino: <tspan font-weight="bold">Campus UTP (Arequipa)</tspan></text>
  <text x="90" y="198" font-size="10.5">Distancia Restante: <tspan font-weight="bold">2.4 km (Aprox. 6 minutos)</tspan></text>

  <rect x="90" y="210" width="14" height="14" rx="2" fill="#18181b" />
  <text x="97" y="221" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">✓</text>
  <text x="112" y="222" font-size="9.5" font-weight="bold">Geocerca UTP Armada (Auto-Checkin en Park)</text>

  <!-- Esquema gráfico limpio sin mapa invasivo -->
  <rect x="90" y="238" width="370" height="190" rx="8" fill="#f8fafc" stroke="#18181b" stroke-width="1.8" />
  <text x="275" y="265" text-anchor="middle" font-size="11" font-weight="bold">[ VÍA DIRECTA DESPEJADA ]</text>
  
  <line x1="120" y1="300" x2="430" y2="300" stroke="#18181b" stroke-width="2.5" stroke-dasharray="6,6" />
  <circle cx="160" cy="300" r="16" fill="#18181b" />
  <text x="160" y="305" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">FORD</text>
  
  <rect x="370" y="282" width="36" height="36" rx="6" fill="#ffffff" stroke="#18181b" stroke-width="2" />
  <text x="388" y="304" text-anchor="middle" font-size="10" font-weight="bold">UTP</text>

  <text x="275" y="355" text-anchor="middle" font-size="9" fill="#52525b">• Navegación sobria sin mapas saturados ni distracciones.</text>
  <text x="275" y="375" text-anchor="middle" font-size="9" fill="#52525b">• Conducción enfocada 100% en el entorno vial.</text>

  <!-- Panel Dividido Derecho: Telemetría CAN en Tiempo Real -->
  <rect x="500" y="130" width="430" height="320" rx="12" fill="#ffffff" class="sketch-border" />
  <text x="520" y="158" font-size="12.5" font-weight="bold">EVALUACIÓN CINEMÁTICA EN MARCHA (CAN)</text>

  <!-- Frenos -->
  <text x="520" y="190" font-size="11" font-weight="bold">Presión de Frenos: Fluida y Progresiva</text>
  <text x="910" y="190" text-anchor="end" font-size="11" font-weight="bold">96% Óptimo</text>
  <rect x="520" y="198" width="390" height="14" rx="7" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="520" y="198" width="374" height="14" rx="7" fill="#18181b" />

  <!-- Carril -->
  <text x="520" y="235" font-size="11" font-weight="bold">Centrado de Carril Co-Pilot360:</text>
  <text x="910" y="235" text-anchor="end" font-size="11" font-weight="bold">Activo (Centrado)</text>
  <rect x="520" y="243" width="390" height="14" rx="7" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="520" y="243" width="358" height="14" rx="7" fill="#18181b" />

  <!-- Velocidad -->
  <text x="520" y="280" font-size="11" font-weight="bold">Velocidad Actual: 48 km/h (Límite: 50 km/h)</text>
  <text x="910" y="280" text-anchor="end" font-size="11" font-weight="bold">Reglamentaria</text>
  <rect x="520" y="288" width="390" height="14" rx="7" fill="#e4e4e7" stroke="#18181b" stroke-width="1.5" />
  <rect x="520" y="288" width="365" height="14" rx="7" fill="#18181b" />

  <!-- Audio -->
  <text x="520" y="325" font-size="10.5">Volumen Multimedia: <tspan font-weight="bold">65% (Sin límites punitivos MyKey)</tspan></text>
  <text x="520" y="348" font-size="9" fill="#52525b">• Resplandor cian ambiental sustituye pitidos de advertencia no crítica.</text>
  <text x="520" y="366" font-size="9" fill="#52525b">• Co-Pilot360 contextualiza frenadas preventivas sin alarmas falsas.</text>

  <!-- Banner Inferior de Alerta Inclusiva (RF-13) -->
  <rect x="70" y="465" width="860" height="60" rx="10" fill="#dc2626" stroke="#18181b" stroke-width="2.5" />
  <text x="500" y="490" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">⚠️ ALERTA VISUAL INCLUSIVA: SIRENA DE EMERGENCIA DETECTADA</text>
  <text x="500" y="510" text-anchor="middle" font-size="10.5" fill="#fee2e2">Ambulancia aproximándose por retaguardia • Volante: pulsos hápticos en lado izquierdo • Clúster: ámbar perimétrico</text>

  <!-- Botones de Control en Cabina -->
  <rect x="70" y="538" width="160" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="150" y="562" text-anchor="middle" font-size="10.5" font-weight="bold">Clima 21°C</text>

  <rect x="245" y="538" width="160" height="38" rx="8" fill="#18181b" class="sketch-border" />
  <text x="325" y="562" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">SafeTeen Coaching</text>

  <rect x="420" y="538" width="160" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="500" y="562" text-anchor="middle" font-size="10.5" font-weight="bold">Navegación</text>

  <rect x="595" y="538" width="160" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="675" y="562" text-anchor="middle" font-size="10.5" font-weight="bold">Apps FordPass</text>

  <rect x="770" y="538" width="160" height="38" rx="8" fill="#ffffff" class="sketch-border" />
  <text x="850" y="562" text-anchor="middle" font-size="10.5" font-weight="bold">Audio / BT</text>

  <!-- Sticky Note -->
  <g transform="rotate(3 850 560)">
    <rect x="740" y="480" width="190" height="90" rx="2" fill="#fef08a" stroke="#18181b" stroke-width="1.8" />
    <text x="750" y="502" font-size="10" font-weight="bold" fill="#854d0e">📌 HMI EN CABINA SYNC 4:</text>
    <text x="750" y="520" font-size="8.5" fill="#713f12">• Coaching ambiental sin pitidos.</text>
    <text x="750" y="535" font-size="8.5" fill="#713f12">• Alerta visual inclusiva sirenas.</text>
    <text x="750" y="550" font-size="8.5" fill="#713f12">• Aporte Grupo B (SmartFleet).</text>
  </g>
</svg>`;

const svgs = {
    W01_Dashboard_Conductor_Joven: svgW01,
    W02_Tutor_Familiar_PeaceOfMind: svgW02,
    W03_Modo_Inclusivo_Accesibilidad: svgW03,
    W04_Contrato_Digital_Familiar: svgW04,
    W05_Manual_Uso_Onboarding: svgW05,
    W06_Centro_Ayuda_FAQ: svgW06,
    W07_Configuracion_General: svgW07,
    W08_Cabina_SYNC4_HMI: svgW08
};

pantallas.forEach(p => {
    const svg = svgs[p.archivoId];
    if (svg) {
        fs.writeFileSync(path.join(outDir, `${p.archivoId}.svg`), svg.trim());
        console.log(`  ✔ SVG creado: ${p.archivoId}.svg`);
    }
});

// ==========================================
// 3. GENERACIÓN DEL ARCHIVO DE PROYECTO BMPR (.bmpr)
// ==========================================
console.log('\n-> Generando archivo de proyecto BMPR SQLite (Ford_SafeTeen_CoDrive_MVP.bmpr)...');
const bmprPath = path.join(outDir, 'Ford_SafeTeen_CoDrive_MVP.bmpr');
if (fs.existsSync(bmprPath)) {
    fs.unlinkSync(bmprPath);
}

const db = new DatabaseSync(bmprPath);

// Crear tablas canónicas del archivo SQLite de Balsamiq Wireframes (.bmpr)
db.exec(`
    CREATE TABLE INFO (
        key TEXT PRIMARY KEY,
        value TEXT
    );

    CREATE TABLE BRANCHES (
        id TEXT PRIMARY KEY,
        name TEXT
    );

    CREATE TABLE RESOURCES (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        data TEXT,
        attributes TEXT
    );

    CREATE TABLE THUMBNAILS (
        id TEXT PRIMARY KEY,
        image BLOB
    );
`);

// Insertar metadata en INFO
const insertInfo = db.prepare('INSERT INTO INFO (key, value) VALUES (?, ?)');
insertInfo.run('version', '4.0.0');
insertInfo.run('author', 'Equipo SafeTeen Co-Drive UTP Arequipa');
insertInfo.run('projectName', 'Ford SafeTeen Co-Drive - MVP APF3');
insertInfo.run('created', new Date().toISOString());

// Insertar rama
const insertBranch = db.prepare('INSERT INTO BRANCHES (id, name) VALUES (?, ?)');
insertBranch.run('master', 'Master Branch');

// Insertar cada mockup en RESOURCES
const insertResource = db.prepare('INSERT INTO RESOURCES (id, name, type, data, attributes) VALUES (?, ?, ?, ?, ?)');

pantallas.forEach((p, idx) => {
    const resourceData = {
        mockupId: p.archivoId,
        screenCode: p.codigo,
        title: p.titulo,
        device: p.tipoDispositivo,
        requirements: p.reqs,
        figuraReporte: p.figura,
        actor: p.actor,
        bmmlRef: `${p.archivoId}.bmml`,
        svgRef: `${p.archivoId}.svg`,
        description: p.resumen
    };

    insertResource.run(
        `mockup_${idx + 1}`,
        `${p.codigo}: ${p.titulo}`,
        'mockup',
        JSON.stringify(resourceData),
        JSON.stringify({ order: idx, locked: false })
    );
});

db.close();
console.log('  ✔ Archivo BMPR creado exitosamente: Ford_SafeTeen_CoDrive_MVP.bmpr');

// ==========================================
// 4. GENERACIÓN DEL VISOR HTML INTERACTIVO (index.html)
// ==========================================
console.log('\n-> Generando visor interactivo web (index.html)...');

const htmlViewer = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pantallas en Balsamiq - Ford SafeTeen Co-Drive (APF3)</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        .font-balsamiq { font-family: 'Comic Neue', cursive, sans-serif; }
        .font-ui { font-family: 'Plus Jakarta Sans', sans-serif; }
        .balsamiq-box {
            box-shadow: 5px 5px 0px #000000;
        }
    </style>
</head>
<body class="bg-zinc-100 text-zinc-900 font-ui min-h-screen flex flex-col">

    <!-- Header Corporativo Balsamiq Studio -->
    <header class="bg-white border-b-2 border-black px-6 py-4 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-black text-white font-balsamiq font-bold flex items-center justify-center text-xl shadow-[3px_3px_0px_#000000]">
                    B
                </div>
                <div>
                    <h1 class="text-lg font-extrabold tracking-tight flex items-center gap-2">
                        <span>Ford SafeTeen Co-Drive</span>
                        <span class="text-xs bg-amber-200 text-amber-900 border border-black px-2 py-0.5 rounded font-mono font-bold">
                            Wireframes Balsamiq • APF3
                        </span>
                    </h1>
                    <p class="text-xs text-zinc-600">
                        Prototipos de Baja/Media Fidelidad Estilo Balsamiq Mockups • 8 Pantallas Oficiales
                    </p>
                </div>
            </div>

            <!-- Botones de Descarga Global -->
            <div class="flex items-center gap-2 flex-wrap">
                <a href="Ford_SafeTeen_CoDrive_MVP.bmpr" download class="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 border-2 border-black font-bold text-xs rounded-lg shadow-[3px_3px_0px_#000000] transition-all flex items-center gap-1.5">
                    <span>📦 Descargar Proyecto (.bmpr)</span>
                </a>
                <a href="../index.html" class="px-3.5 py-2 bg-white hover:bg-zinc-50 border-2 border-black font-bold text-xs rounded-lg shadow-[3px_3px_0px_#000000] transition-all">
                    🚀 Abrir MVP en Vivo
                </a>
            </div>
        </div>
    </header>

    <!-- Barra de Pestañas para las 8 Pantallas -->
    <nav class="bg-zinc-200/90 border-b-2 border-black px-4 py-2.5 overflow-x-auto sticky top-[73px] z-40 backdrop-blur-md">
        <div class="max-w-7xl mx-auto flex items-center gap-2 min-w-max" id="nav-container">
            ${pantallas.map((p, i) => `
                <button onclick="seleccionarPantalla(${i})" id="btn-tab-${i}" class="tab-btn px-3 py-2 rounded-lg text-xs font-bold border-2 border-black transition-all ${i === 0 ? 'bg-black text-white shadow-[2px_2px_0px_#000000]' : 'bg-white text-black hover:bg-zinc-100'}">
                    <span>${p.codigo}</span>
                    <span class="block text-[10px] font-normal opacity-80">${p.titulo.split('(')[0]}</span>
                </button>
            `).join('')}
        </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Visor del Wireframe (Izquierda / Central) -->
        <div class="lg:col-span-8 bg-white border-2 border-black rounded-2xl p-4 md:p-6 balsamiq-box flex flex-col items-center">
            
            <div class="w-full flex justify-between items-center mb-4 pb-3 border-b-2 border-dashed border-zinc-300">
                <div>
                    <span id="screen-badge" class="font-mono text-xs font-bold px-2 py-1 bg-black text-white rounded">
                        W-01
                    </span>
                    <h2 id="screen-title" class="text-base font-extrabold mt-1">
                        Modo Conductor Joven (Dashboard)
                    </h2>
                </div>
                <div class="flex items-center gap-2">
                    <a id="btn-download-bmml" href="W01_Dashboard_Conductor_Joven.bmml" download class="px-3 py-1.5 text-xs font-bold border-2 border-black rounded bg-zinc-100 hover:bg-zinc-200 shadow-[2px_2px_0px_#000000]">
                        📄 .bmml
                    </a>
                    <a id="btn-download-svg" href="W01_Dashboard_Conductor_Joven.svg" download class="px-3 py-1.5 text-xs font-bold border-2 border-black rounded bg-zinc-100 hover:bg-zinc-200 shadow-[2px_2px_0px_#000000]">
                        🖼️ .svg
                    </a>
                </div>
            </div>

            <!-- Contenedor del Gráfico SVG -->
            <div class="w-full flex justify-center py-2 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 overflow-auto max-h-[820px]">
                <img id="screen-svg-img" src="W01_Dashboard_Conductor_Joven.svg" alt="Wireframe Balsamiq" class="max-w-full h-auto drop-shadow-md">
            </div>

        </div>

        <!-- Panel Lateral de Información y Trazabilidad (Derecha) -->
        <div class="lg:col-span-4 space-y-4">
            
            <!-- Tarjeta de Ficha Técnica del Wireframe -->
            <div class="bg-white border-2 border-black rounded-2xl p-5 balsamiq-box">
                <h3 class="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono mb-3">
                    📋 Ficha Técnica del Prototipo
                </h3>
                
                <div class="space-y-3 text-xs">
                    <div>
                        <span class="font-bold text-zinc-500 block">Ubicación en el Informe APF3:</span>
                        <span id="info-figura" class="font-bold text-black text-sm">Figura 7 (Pág. 43)</span>
                    </div>

                    <div>
                        <span class="font-bold text-zinc-500 block">Actor / Arquetipo Principal:</span>
                        <span id="info-actor" class="font-semibold text-black">Tomás Morales (20 años) - Conductor Joven</span>
                    </div>

                    <div>
                        <span class="font-bold text-zinc-500 block">Requerimientos Funcionales (IEEE 830):</span>
                        <span id="info-reqs" class="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mt-0.5">
                            RF-01, RF-02, RF-06
                        </span>
                    </div>

                    <div>
                        <span class="font-bold text-zinc-500 block">Propósito y Valor del Mockup:</span>
                        <p id="info-resumen" class="text-zinc-700 leading-relaxed mt-1">
                            Dashboard post-viaje con dial circular de Score (94/100), desglose de frenado CAN (96%), carril (92%) y velocidad (94%), racha de 14 días seguros y medallas de logro.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Nota Metodológica de Co-Evaluación Inter-Grupal -->
            <div class="bg-amber-50 border-2 border-black rounded-2xl p-5 balsamiq-box font-balsamiq">
                <h4 class="font-bold text-sm text-black flex items-center gap-1.5 mb-2">
                    <span>💡 Innovaciones Integradas en APF3:</span>
                </h4>
                <ul class="text-xs space-y-2 text-zinc-800 list-disc list-inside">
                    <li><strong>Perfil Inclusivo (Mateo):</strong> Adaptación auditiva completa según normas ISO 9241-171 y WCAG 2.2 AA.</li>
                    <li><strong>Alerta en Clúster Digital:</strong> Recomendación del Grupo B (SmartFleet UTP) para visión periférica.</li>
                    <li><strong>Slider Único de Confianza:</strong> Simplificación del contrato digital para reducir sobrecarga al tutor Ricardo.</li>
                </ul>
            </div>

            <!-- Tabla de Archivos Listos -->
            <div class="bg-white border-2 border-black rounded-2xl p-5 balsamiq-box text-xs">
                <h4 class="font-bold text-xs uppercase tracking-wide mb-2 text-zinc-700">Archivos en esta Carpeta:</h4>
                <ul class="space-y-1 font-mono text-[11px] text-zinc-600">
                    <li>✔ <strong>8 archivos .bmml</strong> (Balsamiq XML editable)</li>
                    <li>✔ <strong>8 archivos .svg</strong> (Vectores alta resolución)</li>
                    <li>✔ <strong>1 archivo .bmpr</strong> (Proyecto SQLite oficial)</li>
                    <li>✔ <strong>LEEME_BALSAMIQ.md</strong> (Manual de importación)</li>
                </ul>
            </div>

        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t-2 border-black p-4 text-center text-xs text-zinc-600 mt-6">
        Ford SafeTeen Co-Drive • Proyecto Final APF3 • Universidad Tecnológica del Perú (Arequipa - 2026)
    </footer>

    <script>
        const dataPantallas = ${JSON.stringify(pantallas)};

        function seleccionarPantalla(index) {
            const p = dataPantallas[index];
            if (!p) return;

            // Actualizar imagen y botones
            document.getElementById('screen-badge').textContent = p.codigo;
            document.getElementById('screen-title').textContent = p.titulo;
            document.getElementById('screen-svg-img').src = p.archivoId + '.svg';
            document.getElementById('btn-download-bmml').href = p.archivoId + '.bmml';
            document.getElementById('btn-download-svg').href = p.archivoId + '.svg';

            // Actualizar información técnica
            document.getElementById('info-figura').textContent = p.figura;
            document.getElementById('info-actor').textContent = p.actor;
            document.getElementById('info-reqs').textContent = p.reqs;
            document.getElementById('info-resumen').textContent = p.resumen;

            // Actualizar estilos de pestañas
            document.querySelectorAll('.tab-btn').forEach((btn, i) => {
                if (i === index) {
                    btn.className = 'tab-btn px-3 py-2 rounded-lg text-xs font-bold border-2 border-black bg-black text-white shadow-[2px_2px_0px_#000000]';
                } else {
                    btn.className = 'tab-btn px-3 py-2 rounded-lg text-xs font-bold border-2 border-black bg-white text-black hover:bg-zinc-100';
                }
            });
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), htmlViewer.trim());
console.log('  ✔ Visor HTML creado: pantallas en balsamiq/index.html');

// ==========================================
// 5. GENERACIÓN DEL DOCUMENTO GUÍA LEEME_BALSAMIQ.md
// ==========================================
console.log('\n-> Generando archivo de documentación LEEME_BALSAMIQ.md...');

const leemeMd = `# Ecosistema de Wireframes en Balsamiq: Ford SafeTeen Co-Drive

### Proyecto Final 3 (APF3) - Semana 12
**Curso:** Diseño de Productos y Servicios  
**Docente:** Fernández Bernedo Alberto Edu  
**Institución:** Universidad Tecnológica del Perú (Sede Arequipa - 2026)  
**Equipo de Proyecto:**
- Anderson Roque Zevallos – U22321650
- Jack Jhonatan Ramos Quispe – U25225261
- Cesar Del Carpio Achahui – U23254280
- Ivan Benjamin Mamani Villanueva – U23304519

---

## 📁 Contenido de esta Carpeta (\`pantallas en balsamiq\`)

Esta carpeta contiene el ecosistema completo de maquetación en **baja y media fidelidad estilo Balsamiq Mockups** para el proyecto **Ford SafeTeen Co-Drive**, alineado con la **Tabla 13** y las **Figuras 7 a 14** del documento de informe oficial:

| Código | Archivo Base | Figura e Informe | Actor / Rol | Requerimientos |
| :--- | :--- | :--- | :--- | :--- |
| **W-01** | \`W01_Dashboard_Conductor_Joven\` | **Figura 7 (Pág. 43)** | Tomás Morales (20) | RF-01, RF-02, RF-06 |
| **W-02** | \`W02_Tutor_Familiar_PeaceOfMind\` | **Figura 8 (Pág. 44)** | Ricardo Morales (52) | RF-04, RF-05, RF-07, RF-09 |
| **W-03** | \`W03_Modo_Inclusivo_Accesibilidad\`| **Figura 9 (Pág. 45)** | Mateo Huarca (21) | RF-13, RF-14, ISO 9241-171 |
| **W-04** | \`W04_Contrato_Digital_Familiar\` | **Figura 10 (Pág. 46)**| Tutor y Conductor Joven | RF-10 |
| **W-05** | \`W05_Manual_Uso_Onboarding\` | **Figura 11 (Pág. 48)**| Nuevas Familias | Inducción y Adopción |
| **W-06** | \`W06_Centro_Ayuda_FAQ\` | **Figura 12 (Pág. 50)**| Familia / Soporte Ford | Transparencia y FAQ 24/7 |
| **W-07** | \`W07_Configuracion_General\` | **Figura 13 (Pág. 52)**| Tutor Administrador | VIN, Módem y Privacidad |
| **W-08** | \`W08_Cabina_SYNC4_HMI\` | **Figura 14 (Pág. 53)**| Conductor en Marcha | RF-01, RF-08, RF-13 |

---

## 🛠️ Formatos Incluidos y Cómo Usarlos

### 1. Archivo de Proyecto Oficial (\`.bmpr\`)
- **Archivo:** \`Ford_SafeTeen_CoDrive_MVP.bmpr\`
- **Uso:** Es el formato nativo SQLite utilizado por **Balsamiq Wireframes Desktop** y **Balsamiq Cloud**. Puedes abrirlo con doble clic o importarlo desde el menú *Project -> Import...*. Contiene los 8 wireframes organizados con su metadata.

### 2. Archivos Individuales XML (\`.bmml\`)
- **Archivos:** \`W01_Dashboard_Conductor_Joven.bmml\` al \`W08_Cabina_SYNC4_HMI.bmml\`
- **Uso:** Formato clásico XML de Balsamiq Mockups 3. Puedes arrastrar cualquier archivo \`.bmml\` a tu lienzo de Balsamiq para editar los componentes, textos o posiciones.

### 3. Imágenes Vectoriales Alta Resolución (\`.svg\`)
- **Archivos:** \`W01_Dashboard_Conductor_Joven.svg\` al \`W08_Cabina_SYNC4_HMI.svg\`
- **Uso:** Renderizan el boceto exacto de Balsamiq (con fuentes manuscritas, trazos orgánicos, sombras, botones y notas adhesivas amarillas). Se pueden arrastrar e insertar directamente en **Microsoft Word, PowerPoint, Google Docs o presentaciones ejecutivas** sin ninguna pérdida de calidad o pixelado.

### 4. Visor Web Interactivo (\`index.html\`)
- **Archivo:** \`index.html\` dentro de esta carpeta.
- **Uso:** Ábrelo con cualquier navegador (Chrome, Edge) para explorar interactivamente todas las pantallas, cambiar de pestañas, leer la ficha técnica de cada wireframe y descargar los archivos individualmente con un solo clic.

---

## 🌟 Principales Decisiones de Diseño Reflejadas

1. **Desacoplamiento de Certeza y Espionaje (W-01 y W-02):** Se suprime por completo el mapa satelital continuo en tiempo real (evitando el síndrome de *padre policía* tipo Life360). En su lugar, el tutor recibe la *Peace of Mind Card* al engranar Park (P) y el estado de batería del joven (84%).
2. **Inclusión Sensorial Universal (W-03 y W-08):** Adaptación completa para **Mateo Huarca** (conductor novel con hipoacusia de 65 dB). Se sustituyen los pitidos agudos de cabina por pulsos hápticos en el volante y un detector visual inteligente de sirenas de emergencia en la pantalla SYNC 4 de 12''.
3. **Contrato de Negociación por Méritos (W-04):** Control deslizante único de Score (88 pts) y geocercas pactadas que aprueban automáticamente el préstamo de fin de semana, eliminando las disputas verbales subjetivas en la familia.
`;

fs.writeFileSync(path.join(outDir, 'LEEME_BALSAMIQ.md'), leemeMd.trim());
console.log('  ✔ Documento LEEME creado: pantallas en balsamiq/LEEME_BALSAMIQ.md');

console.log('\n🎉 ¡Ecosistema completo de pantallas en Balsamiq generado con éxito!');

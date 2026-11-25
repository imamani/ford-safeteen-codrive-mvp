package java_mobile;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Ellipse2D;
import java.awt.geom.RoundRectangle2D;

/**
 * ============================================================================
 * APLICACION PRINCIPAL EN JAVA: SafeTeenMobileApp
 * ============================================================================
 * Reproduce el MVP movil en Java puro (Swing) para que los estudiantes
 * puedan compilar y ejecutar directamente en su computadora sin configuraciones dificiles.
 * 
 * Cumple con los requerimientos RF-01 al RF-14 del informe APF3 (UTP Arequipa).
 */
public class SafeTeenMobileApp extends JFrame {

    private static final long serialVersionUID = 1L;

    private CardLayout cardLayout;
    private JPanel screensPanel;
    private JLabel lblStatusToast;

    // Componentes interactivos
    private JLabel lblHoraArribo;
    private JLabel lblBateriaTutor;
    private JSlider sliderScoreMeta;
    private JLabel lblMetaPactada;
    private JLabel lblResplandorCabina;
    private JPanel panelMapaSync4;

    public SafeTeenMobileApp() {
        setTitle("Ford SafeTeen Co-Drive - Aplicacion Movil (Java MVP)");
        setSize(460, 860);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        getContentPane().setBackground(new Color(5, 8, 17));
        setLayout(new BorderLayout());

        // 1. Marco Superior del Telefono Movil
        add(crearHeaderTelefono(), BorderLayout.NORTH);

        // 2. Contenedor de Pantallas Moviles (CardLayout para cambiar de vista)
        cardLayout = new CardLayout();
        screensPanel = new JPanel(cardLayout);
        screensPanel.setBackground(new Color(5, 8, 17));

        // Anadir cada una de las pantallas
        screensPanel.add(crearPantallaTomas(), "TOMAS");
        screensPanel.add(crearPantallaRicardo(), "RICARDO");
        screensPanel.add(crearPantallaMateo(), "MATEO");
        screensPanel.add(crearPantallaContrato(), "CONTRATO");
        screensPanel.add(crearPantallaCabinaSync4(), "SYNC4");

        add(screensPanel, BorderLayout.CENTER);

        // 3. Consola de Simulacion Telematica CAN Inferior
        add(crearConsolaSimulacion(), BorderLayout.SOUTH);
    }

    /**
     * Barra Superior del Movil con Logo Ford y Pestanas de Pantallas
     */
    private JPanel crearHeaderTelefono() {
        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.Y_AXIS));
        header.setBackground(new Color(15, 23, 42));
        header.setBorder(new EmptyBorder(10, 12, 10, 12));

        // Barra de estado de smartphone (Hora, Bateria, Senal)
        JPanel statusBar = new JPanel(new BorderLayout());
        statusBar.setOpaque(false);
        JLabel lblHora = new JLabel("19:32");
        lblHora.setForeground(Color.LIGHT_GRAY);
        lblHora.setFont(new Font("Monospaced", Font.BOLD, 12));

        JLabel lblNotch = new JLabel("--- FORD SAFETEEN ---");
        lblNotch.setForeground(new Color(56, 189, 248));
        lblNotch.setFont(new Font("SansSerif", Font.BOLD, 11));
        lblNotch.setHorizontalAlignment(SwingConstants.CENTER);

        JLabel lblBat = new JLabel("84% BAT");
        lblBat.setForeground(new Color(52, 211, 153));
        lblBat.setFont(new Font("Monospaced", Font.BOLD, 12));

        statusBar.add(lblHora, BorderLayout.WEST);
        statusBar.add(lblNotch, BorderLayout.CENTER);
        statusBar.add(lblBat, BorderLayout.EAST);
        header.add(statusBar);
        header.add(Box.createVerticalStrut(8));

        // Pestanas de Navegacion Movil
        JPanel tabs = new JPanel(new GridLayout(1, 5, 4, 0));
        tabs.setOpaque(false);

        JButton btnTomas = crearBotonPestana("Tomas", "TOMAS");
        JButton btnRicardo = crearBotonPestana("Ricardo", "RICARDO");
        JButton btnMateo = crearBotonPestana("Mateo", "MATEO");
        JButton btnContrato = crearBotonPestana("Contrato", "CONTRATO");
        JButton btnSync4 = crearBotonPestana("SYNC 4", "SYNC4");

        tabs.add(btnTomas);
        tabs.add(btnRicardo);
        tabs.add(btnMateo);
        tabs.add(btnContrato);
        tabs.add(btnSync4);

        header.add(tabs);
        return header;
    }

    private JButton crearBotonPestana(String texto, String screenName) {
        JButton btn = new JButton(texto);
        btn.setFont(new Font("SansSerif", Font.BOLD, 10));
        btn.setBackground(new Color(30, 41, 59));
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createLineBorder(new Color(51, 65, 85), 1));
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btn.addActionListener(e -> cardLayout.show(screensPanel, screenName));
        return btn;
    }

    /**
     * PANTALLA 1: Dashboard Conductor Joven (Tomas Morales - 20 anos)
     */
    private JPanel crearPantallaTomas() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(7, 12, 24));
        panel.setBorder(new EmptyBorder(15, 18, 15, 18));

        JLabel lblTitulo = new JLabel("MODO CONDUCTOR: " + SafeTeenData.jovenNombre);
        lblTitulo.setForeground(Color.WHITE);
        lblTitulo.setFont(new Font("SansSerif", Font.BOLD, 13));
        lblTitulo.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblTitulo);

        JLabel lblAuto = new JLabel(SafeTeenData.vehiculoModelo);
        lblAuto.setForeground(new Color(56, 189, 248));
        lblAuto.setFont(new Font("SansSerif", Font.PLAIN, 11));
        lblAuto.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblAuto);
        panel.add(Box.createVerticalStrut(15));

        // Dial de Score (94/100)
        JPanel dialPanel = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2 = (Graphics2D) g;
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                int size = 120;
                int x = (getWidth() - size) / 2;
                int y = (getHeight() - size) / 2;

                g2.setColor(new Color(16, 185, 129, 60));
                g2.setStroke(new BasicStroke(10));
                g2.draw(new Ellipse2D.Float(x, y, size, size));

                g2.setColor(new Color(16, 185, 129));
                g2.setStroke(new BasicStroke(10, BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
                g2.drawArc(x, y, size, size, 90, -320);

                g2.setColor(new Color(15, 23, 42));
                g2.fill(new Ellipse2D.Float(x + 5, y + 5, size - 10, size - 10));

                g2.setColor(new Color(52, 211, 153));
                g2.setFont(new Font("Monospaced", Font.BOLD, 36));
                String s = String.valueOf(SafeTeenData.jovenScore);
                FontMetrics fm = g2.getFontMetrics();
                g2.drawString(s, (getWidth() - fm.stringWidth(s)) / 2, y + 65);

                g2.setColor(Color.LIGHT_GRAY);
                g2.setFont(new Font("Monospaced", Font.PLAIN, 11));
                g2.drawString("/ 100", (getWidth() - fm.stringWidth("/ 100")) / 2, y + 85);
            }
        };
        dialPanel.setPreferredSize(new Dimension(140, 130));
        dialPanel.setMaximumSize(new Dimension(140, 130));
        dialPanel.setOpaque(false);
        dialPanel.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(dialPanel);

        JLabel lblNivel = new JLabel("* " + SafeTeenData.jovenNivel + " *");
        lblNivel.setForeground(new Color(52, 211, 153));
        lblNivel.setFont(new Font("SansSerif", Font.BOLD, 11));
        lblNivel.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblNivel);
        panel.add(Box.createVerticalStrut(12));

        // Desglose de Telemetria CAN
        JPanel cardDesglose = crearCard("Desglose Telematico Post-Viaje (Bus CAN):");
        cardDesglose.setLayout(new BoxLayout(cardDesglose, BoxLayout.Y_AXIS));

        cardDesglose.add(crearBarraProgreso("Frenado Suave y Anticipado (40%)", SafeTeenData.frenadoSuavePorcentaje, new Color(16, 185, 129)));
        cardDesglose.add(Box.createVerticalStrut(6));
        cardDesglose.add(crearBarraProgreso("Mantenimiento de Carril Co-Pilot360 (30%)", SafeTeenData.controlCarrilPorcentaje, new Color(6, 182, 212)));
        cardDesglose.add(Box.createVerticalStrut(6));
        cardDesglose.add(crearBarraProgreso("Velocidad Reglamentaria en Ruta (30%)", SafeTeenData.velocidadRutaPorcentaje, new Color(59, 130, 246)));
        panel.add(cardDesglose);
        panel.add(Box.createVerticalStrut(10));

        // Racha y Medallas de Gamificacion
        JPanel cardRacha = crearCard("[!] Racha Segura: " + SafeTeenData.rachaDiasSeguros + " DIAS CONSECUTIVOS");
        cardRacha.setBorder(BorderFactory.createDashedBorder(new Color(245, 158, 11), 2, 4, 2, true));
        JLabel lblMedallas = new JLabel("Medallas: [Guardian del Freno] [Eco-Driver] [Nocturno Pro]");
        lblMedallas.setForeground(new Color(253, 230, 138));
        lblMedallas.setFont(new Font("SansSerif", Font.PLAIN, 10));
        cardRacha.add(lblMedallas);
        panel.add(cardRacha);
        panel.add(Box.createVerticalStrut(12));

        // Boton Compartir Score
        JButton btnCompartir = new JButton("COMPARTIR SCORE CON TUTOR");
        btnCompartir.setBackground(new Color(2, 132, 199));
        btnCompartir.setForeground(Color.WHITE);
        btnCompartir.setFont(new Font("SansSerif", Font.BOLD, 12));
        btnCompartir.setMaximumSize(new Dimension(380, 42));
        btnCompartir.setAlignmentX(Component.CENTER_ALIGNMENT);
        btnCompartir.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnCompartir.addActionListener(e -> {
            JOptionPane.showMessageDialog(this,
                    "Score de " + SafeTeenData.jovenScore + " pts enviado a Ricardo Morales.\n" +
                    "El Contrato Digital certifico tu meta semanal y autoriza la camioneta el fin de semana.",
                    "Ford SafeTeen - Envio Exitoso", JOptionPane.INFORMATION_MESSAGE);
        });
        panel.add(btnCompartir);

        return panel;
    }

    /**
     * PANTALLA 2: Dashboard Tutor Familiar (Ing. Ricardo Morales - 52 anos)
     */
    private JPanel crearPantallaRicardo() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(7, 12, 24));
        panel.setBorder(new EmptyBorder(15, 18, 15, 18));

        JLabel lblTitulo = new JLabel("MODO TUTOR: " + SafeTeenData.tutorNombre);
        lblTitulo.setForeground(Color.WHITE);
        lblTitulo.setFont(new Font("SansSerif", Font.BOLD, 13));
        lblTitulo.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblTitulo);

        JLabel lblSub = new JLabel("Paz Mental Parental - Cero Espionaje GPS");
        lblSub.setForeground(new Color(52, 211, 153));
        lblSub.setFont(new Font("SansSerif", Font.PLAIN, 11));
        lblSub.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblSub);
        panel.add(Box.createVerticalStrut(15));

        // Peace of Mind Card
        JPanel cardPeace = crearCard("LLEGADA SEGURA CONFIRMADA [OK]");
        cardPeace.setBorder(BorderFactory.createLineBorder(new Color(16, 185, 129), 2));
        cardPeace.setLayout(new BoxLayout(cardPeace, BoxLayout.Y_AXIS));

        JLabel lblDestino = new JLabel("Destino: " + SafeTeenData.ultimoDestino);
        lblDestino.setForeground(Color.WHITE);
        lblDestino.setFont(new Font("SansSerif", Font.BOLD, 12));

        lblHoraArribo = new JLabel("Hora: " + SafeTeenData.ultimaHoraArribo);
        lblHoraArribo.setForeground(new Color(52, 211, 153));
        lblHoraArribo.setFont(new Font("Monospaced", Font.BOLD, 11));

        JLabel lblPalanca = new JLabel("OK Estado: " + SafeTeenData.estadoPalanca);
        lblPalanca.setForeground(Color.LIGHT_GRAY);
        lblPalanca.setFont(new Font("SansSerif", Font.PLAIN, 10));

        JLabel lblPuertas = new JLabel("OK Seguro: " + SafeTeenData.seguroPuertas);
        lblPuertas.setForeground(Color.LIGHT_GRAY);
        lblPuertas.setFont(new Font("SansSerif", Font.PLAIN, 10));

        cardPeace.add(lblDestino);
        cardPeace.add(Box.createVerticalStrut(4));
        cardPeace.add(lblHoraArribo);
        cardPeace.add(Box.createVerticalStrut(4));
        cardPeace.add(lblPalanca);
        cardPeace.add(lblPuertas);
        panel.add(cardPeace);
        panel.add(Box.createVerticalStrut(10));

        // Dispositivo Movil de Tomas
        JPanel cardMovil = crearCard("Dispositivo Movil de Tomas:");
        cardMovil.setLayout(new BoxLayout(cardMovil, BoxLayout.Y_AXIS));

        lblBateriaTutor = new JLabel("Bateria Smartphone: " + SafeTeenData.bateriaMovil + "%");
        lblBateriaTutor.setForeground(new Color(52, 211, 153));
        lblBateriaTutor.setFont(new Font("Monospaced", Font.BOLD, 11));

        JLabel lblLlamadas = new JLabel("Interacciones con el movil al volante: 0 (CERO)");
        lblLlamadas.setForeground(Color.WHITE);
        lblLlamadas.setFont(new Font("SansSerif", Font.PLAIN, 10));

        cardMovil.add(lblBateriaTutor);
        cardMovil.add(Box.createVerticalStrut(4));
        cardMovil.add(lblLlamadas);
        panel.add(cardMovil);
        panel.add(Box.createVerticalStrut(10));

        // Salud Mecanica
        JPanel cardMecanica = crearCard("Salud Mecanica - Bus CAN");
        cardMecanica.setLayout(new BoxLayout(cardMecanica, BoxLayout.Y_AXIS));
        JLabel lblPastillas = new JLabel("Pastillas de freno: " + SafeTeenData.pastillasFrenoVida + "% vida remanente (Optimo)");
        lblPastillas.setForeground(Color.LIGHT_GRAY);
        lblPastillas.setFont(new Font("SansSerif", Font.PLAIN, 10));

        JLabel lblConsumo = new JLabel("Consumo de combustible: " + SafeTeenData.consumoCombustible);
        lblConsumo.setForeground(Color.LIGHT_GRAY);
        lblConsumo.setFont(new Font("SansSerif", Font.PLAIN, 10));

        cardMecanica.add(lblPastillas);
        cardMecanica.add(lblConsumo);
        panel.add(cardMecanica);
        panel.add(Box.createVerticalStrut(15));

        // Boton Aprobar Prestamo
        JButton btnAprobar = new JButton("APROBAR PRESTAMO FIN DE SEMANA");
        btnAprobar.setBackground(new Color(16, 185, 129));
        btnAprobar.setForeground(Color.BLACK);
        btnAprobar.setFont(new Font("SansSerif", Font.BOLD, 12));
        btnAprobar.setMaximumSize(new Dimension(380, 42));
        btnAprobar.setAlignmentX(Component.CENTER_ALIGNMENT);
        btnAprobar.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnAprobar.addActionListener(e -> {
            JOptionPane.showMessageDialog(this,
                    "Prestamo autorizado por Ricardo Morales.\n" +
                    "Pase digital enviado al celular de Tomas para el fin de semana.",
                    "Autorizacion Concedida", JOptionPane.INFORMATION_MESSAGE);
        });
        panel.add(btnAprobar);

        return panel;
    }

    /**
     * PANTALLA 3: Modo Inclusivo (Mateo Huarca - Hipoacusia)
     */
    private JPanel crearPantallaMateo() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(7, 12, 24));
        panel.setBorder(new EmptyBorder(15, 18, 15, 18));

        JLabel lblTitulo = new JLabel("ACCESIBILIDAD SENSORIAL: " + SafeTeenData.inclusivoNombre);
        lblTitulo.setForeground(Color.WHITE);
        lblTitulo.setFont(new Font("SansSerif", Font.BOLD, 13));
        lblTitulo.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblTitulo);

        JLabel lblCond = new JLabel(SafeTeenData.inclusivoCondicion);
        lblCond.setForeground(new Color(56, 189, 248));
        lblCond.setFont(new Font("SansSerif", Font.PLAIN, 10));
        lblCond.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblCond);
        panel.add(Box.createVerticalStrut(15));

        // Interruptores de Accesibilidad
        JPanel cardOpciones = crearCard("Configuraciones de Asistencia Multimodal:");
        cardOpciones.setLayout(new BoxLayout(cardOpciones, BoxLayout.Y_AXIS));

        JCheckBox chkLuces = new JCheckBox("Sustituir pitidos por resplandor cian/ambar en SYNC 4", SafeTeenData.cfgLucesSync4);
        chkLuces.setOpaque(false);
        chkLuces.setForeground(Color.WHITE);
        chkLuces.setFont(new Font("SansSerif", Font.PLAIN, 10));

        JCheckBox chkHaptico = new JCheckBox("Pulsos hapticos (vibracion en volante ante desvios)", SafeTeenData.cfgPulsosHapticos);
        chkHaptico.setOpaque(false);
        chkHaptico.setForeground(Color.WHITE);
        chkHaptico.setFont(new Font("SansSerif", Font.PLAIN, 10));

        JCheckBox chkSirena = new JCheckBox("Detector de sirenas de ambulancias por microfonos", SafeTeenData.cfgDetectorSirenas);
        chkSirena.setOpaque(false);
        chkSirena.setForeground(Color.WHITE);
        chkSirena.setFont(new Font("SansSerif", Font.PLAIN, 10));

        cardOpciones.add(chkLuces);
        cardOpciones.add(chkHaptico);
        cardOpciones.add(chkSirena);
        panel.add(cardOpciones);
        panel.add(Box.createVerticalStrut(12));

        // Vista previa de alerta en cluster
        JPanel cardPreview = crearCard("Vista Previa en Cluster de Instrumentos:");
        cardPreview.setBackground(new Color(153, 27, 27));
        cardPreview.setBorder(BorderFactory.createLineBorder(Color.RED, 2));
        JLabel lblSirenaText = new JLabel("[!] SIRENA DE AMBULANCIA ACERCANDOSE POR RETAGUARDIA");
        lblSirenaText.setForeground(Color.WHITE);
        lblSirenaText.setFont(new Font("SansSerif", Font.BOLD, 10));
        cardPreview.add(lblSirenaText);
        panel.add(cardPreview);
        panel.add(Box.createVerticalStrut(15));

        // Boton Certificado Inclusivo
        JButton btnCert = new JButton("VER CERTIFICADO TELEMATICO (RF-14)");
        btnCert.setBackground(new Color(147, 51, 234));
        btnCert.setForeground(Color.WHITE);
        btnCert.setFont(new Font("SansSerif", Font.BOLD, 11));
        btnCert.setMaximumSize(new Dimension(380, 40));
        btnCert.setAlignmentX(Component.CENTER_ALIGNMENT);
        btnCert.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnCert.addActionListener(e -> {
            JOptionPane.showMessageDialog(this,
                    "FORD MOTOR COMPANY - CERTIFICADO TELEMATICO INCLUSIVO\n" +
                    "Titular: Mateo Huarca (Hipoacusia Neurosensorial Bilateral)\n" +
                    "Score Promedio 30 Dias: 95 / 100\n" +
                    "Siniestros viales: 0 (Cero)\n" +
                    "Compensacion visual y pericia de frenado: 98% Optima.\n\n" +
                    "Aval digital valido para aseguradoras y autonomia familiar.",
                    "Certificado Oficial de Aptitud", JOptionPane.INFORMATION_MESSAGE);
        });
        panel.add(btnCert);

        return panel;
    }

    /**
     * PANTALLA 4: Contrato Digital Familiar
     */
    private JPanel crearPantallaContrato() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(7, 12, 24));
        panel.setBorder(new EmptyBorder(15, 18, 15, 18));

        JLabel lblTitulo = new JLabel("CONTRATO DIGITAL FAMILIAR");
        lblTitulo.setForeground(Color.WHITE);
        lblTitulo.setFont(new Font("SansSerif", Font.BOLD, 13));
        lblTitulo.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblTitulo);

        JLabel lblPactantes = new JLabel("Tomas Morales (Hijo) <-> Ricardo Morales (Padre)");
        lblPactantes.setForeground(new Color(56, 189, 248));
        lblPactantes.setFont(new Font("SansSerif", Font.PLAIN, 10));
        lblPactantes.setAlignmentX(Component.CENTER_ALIGNMENT);
        panel.add(lblPactantes);
        panel.add(Box.createVerticalStrut(15));

        // Control Deslizante Unico de Confianza
        JPanel cardSlider = crearCard("Meta de Score Semanal Pactada:");
        cardSlider.setLayout(new BoxLayout(cardSlider, BoxLayout.Y_AXIS));

        lblMetaPactada = new JLabel(SafeTeenData.metaScorePactada + " PUNTOS MINIMOS");
        lblMetaPactada.setForeground(new Color(52, 211, 153));
        lblMetaPactada.setFont(new Font("Monospaced", Font.BOLD, 13));
        lblMetaPactada.setAlignmentX(Component.CENTER_ALIGNMENT);

        sliderScoreMeta = new JSlider(80, 95, SafeTeenData.metaScorePactada);
        sliderScoreMeta.setOpaque(false);
        sliderScoreMeta.addChangeListener(e -> {
            SafeTeenData.metaScorePactada = sliderScoreMeta.getValue();
            lblMetaPactada.setText(SafeTeenData.metaScorePactada + " PUNTOS MINIMOS");
        });

        cardSlider.add(lblMetaPactada);
        cardSlider.add(sliderScoreMeta);
        panel.add(cardSlider);
        panel.add(Box.createVerticalStrut(10));

        // Geocercas
        JPanel cardGeocercas = crearCard("Geocercas Autorizadas de Check-in en Park:");
        cardGeocercas.setLayout(new BoxLayout(cardGeocercas, BoxLayout.Y_AXIS));
        for (String g : SafeTeenData.geocercasPactadas) {
            JLabel lblG = new JLabel("[*] " + g);
            lblG.setForeground(Color.LIGHT_GRAY);
            lblG.setFont(new Font("SansSerif", Font.PLAIN, 10));
            cardGeocercas.add(lblG);
        }
        panel.add(cardGeocercas);
        panel.add(Box.createVerticalStrut(15));

        // Boton Firmar Contrato
        JButton btnFirmar = new JButton("CONFIRMAR Y FIRMAR CONTRATO");
        btnFirmar.setBackground(new Color(79, 70, 229));
        btnFirmar.setForeground(Color.WHITE);
        btnFirmar.setFont(new Font("SansSerif", Font.BOLD, 12));
        btnFirmar.setMaximumSize(new Dimension(380, 42));
        btnFirmar.setAlignmentX(Component.CENTER_ALIGNMENT);
        btnFirmar.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnFirmar.addActionListener(e -> {
            JOptionPane.showMessageDialog(this,
                    "Contrato Digital Firmado.\n" +
                    "Si Tomas mantiene un promedio >= " + SafeTeenData.metaScorePactada + " pts,\n" +
                    "el sistema aprueba la llave de la Ford Territory para el fin de semana.",
                    "Contrato Digital Activo", JOptionPane.INFORMATION_MESSAGE);
        });
        panel.add(btnFirmar);

        return panel;
    }

    /**
     * PANTALLA 5: Servicio en Cabina Ford SYNC 4 (Segundo Plano & Co-Pilot360)
     * Arquitectura real: El joven usa Waze/Maps normal, SafeTeen opera en 2do plano.
     */
    private JPanel crearPantallaCabinaSync4() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(new Color(7, 12, 24));
        panel.setBorder(new EmptyBorder(12, 16, 12, 16));

        // Cabecera explicativa de arquitectura
        JPanel cabinaHeader = new JPanel();
        cabinaHeader.setLayout(new BoxLayout(cabinaHeader, BoxLayout.Y_AXIS));
        cabinaHeader.setBackground(new Color(15, 23, 42));
        cabinaHeader.setBorder(new EmptyBorder(10, 12, 10, 12));

        JLabel lblSync = new JLabel("FORD SYNC 4 (12'') - SERVICIO EN SEGUNDO PLANO");
        lblSync.setForeground(new Color(56, 189, 248));
        lblSync.setFont(new Font("SansSerif", Font.BOLD, 12));
        lblSync.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel lblSub = new JLabel("Cero distraccion: El conductor usa su mapa nativo normal");
        lblSub.setForeground(Color.LIGHT_GRAY);
        lblSub.setFont(new Font("SansSerif", Font.PLAIN, 10));
        lblSub.setAlignmentX(Component.CENTER_ALIGNMENT);

        cabinaHeader.add(lblSync);
        cabinaHeader.add(Box.createVerticalStrut(2));
        cabinaHeader.add(lblSub);
        panel.add(cabinaHeader, BorderLayout.NORTH);

        // Contenido Central: Demostracion de las 3 Funciones Reales en el Auto
        JPanel central = new JPanel();
        central.setLayout(new BoxLayout(central, BoxLayout.Y_AXIS));
        central.setOpaque(false);
        central.setBorder(new EmptyBorder(12, 0, 12, 0));

        // Tarjeta 1: Navegacion del Auto (El carro ya tiene mapas)
        JPanel cardNav = crearCard("1. Navegacion Habitual del Vehiculo");
        cardNav.setLayout(new BoxLayout(cardNav, BoxLayout.Y_AXIS));
        JLabel lblNavInfo = new JLabel("El joven visualiza Android Auto / Apple CarPlay (Google Maps o Waze).");
        lblNavInfo.setForeground(Color.WHITE);
        lblNavInfo.setFont(new Font("SansSerif", Font.PLAIN, 10));
        JLabel lblNavInfo2 = new JLabel("SafeTeen NO le tapa la pantalla con mapas propios innecesarios.");
        lblNavInfo2.setForeground(new Color(52, 211, 153));
        lblNavInfo2.setFont(new Font("SansSerif", Font.BOLD, 10));
        cardNav.add(lblNavInfo);
        cardNav.add(Box.createVerticalStrut(2));
        cardNav.add(lblNavInfo2);
        central.add(cardNav);
        central.add(Box.createVerticalStrut(8));

        // Tarjeta 2: Co-Pilot360 y Vehiculos Cercanos (BLIS)
        JPanel cardBlis = crearCard("2. Deteccion de Carros Cercanos (Ford Co-Pilot360)");
        cardBlis.setLayout(new BoxLayout(cardBlis, BoxLayout.Y_AXIS));
        JLabel lblBlis1 = new JLabel("El auto YA tiene sensores de radar BLIS de fabrica:");
        lblBlis1.setForeground(Color.LIGHT_GRAY);
        lblBlis1.setFont(new Font("SansSerif", Font.PLAIN, 10));
        JLabel lblBlis2 = new JLabel("[*] Luz LED ambar en espejos retrovisores avisa autos aproximandose.");
        lblBlis2.setForeground(new Color(251, 191, 36));
        lblBlis2.setFont(new Font("SansSerif", Font.BOLD, 10));
        JLabel lblBlis3 = new JLabel("[*] En vez de pitidos molestos, SafeTeen activa vibracion en el volante.");
        lblBlis3.setForeground(new Color(56, 189, 248));
        lblBlis3.setFont(new Font("SansSerif", Font.BOLD, 10));
        cardBlis.add(lblBlis1);
        cardBlis.add(Box.createVerticalStrut(3));
        cardBlis.add(lblBlis2);
        cardBlis.add(Box.createVerticalStrut(3));
        cardBlis.add(lblBlis3);
        central.add(cardBlis);
        central.add(Box.createVerticalStrut(8));

        // Tarjeta 3: Telemetria Silenciosa del Bus CAN
        JPanel cardCan = crearCard("3. Telemetria Silenciosa en Segundo Plano (CAN 500kbps)");
        cardCan.setLayout(new BoxLayout(cardCan, BoxLayout.Y_AXIS));
        lblResplandorCabina = new JLabel("Estado actual: " + SafeTeenData.resplandorColor + " (Conduccion suave)");
        lblResplandorCabina.setForeground(new Color(52, 211, 153));
        lblResplandorCabina.setFont(new Font("Monospaced", Font.BOLD, 10));
        JLabel lblCanEvento = new JLabel("Disparador: Al estacionar en Park (P) se despacha el push al padre.");
        lblCanEvento.setForeground(Color.LIGHT_GRAY);
        lblCanEvento.setFont(new Font("SansSerif", Font.PLAIN, 10));
        cardCan.add(lblResplandorCabina);
        cardCan.add(Box.createVerticalStrut(3));
        cardCan.add(lblCanEvento);
        central.add(cardCan);
        central.add(Box.createVerticalStrut(8));

        // Tarjeta 4: Arquitectura Validada por Benchmarking (GM Teen Driver / Bouncie / MOTOsafety)
        JPanel cardBench = crearCard("4. Benchmarking HMI (GM Teen Driver & MOTOsafety)");
        cardBench.setLayout(new BoxLayout(cardBench, BoxLayout.Y_AXIS));
        JLabel lblB1 = new JLabel("Distribucion 70/30: 70% Waze/Maps + 30% SafeTeen Coaching.");
        lblB1.setForeground(new Color(56, 189, 248));
        lblB1.setFont(new Font("SansSerif", Font.BOLD, 10));
        JLabel lblB2 = new JLabel("In-Vehicle Report Card: En Park (P) se muestra el resumen ejecutivo.");
        lblB2.setForeground(Color.WHITE);
        lblB2.setFont(new Font("SansSerif", Font.PLAIN, 10));
        cardBench.add(lblB1);
        cardBench.add(Box.createVerticalStrut(2));
        cardBench.add(lblB2);
        central.add(cardBench);

        panel.add(central, BorderLayout.CENTER);

        // Pie de pantalla
        JPanel footer = new JPanel(new BorderLayout());
        footer.setBackground(new Color(15, 23, 42));
        footer.setBorder(new EmptyBorder(6, 10, 6, 10));
        JLabel lblFooter = new JLabel("Privacidad Garantizada: 0 espionaje de calles hacia el tutor");
        lblFooter.setForeground(new Color(148, 163, 184));
        lblFooter.setFont(new Font("SansSerif", Font.ITALIC, 10));
        footer.add(lblFooter, BorderLayout.CENTER);
        panel.add(footer, BorderLayout.SOUTH);

        return panel;
    }

    /**
     * Consola de Simulacion Telematica CAN en Vivo
     */
    private JPanel crearConsolaSimulacion() {
        JPanel console = new JPanel();
        console.setLayout(new BoxLayout(console, BoxLayout.Y_AXIS));
        console.setBackground(new Color(15, 23, 42));
        console.setBorder(new EmptyBorder(8, 12, 8, 12));

        lblStatusToast = new JLabel("Consola CAN: Selecciona un evento para simular");
        lblStatusToast.setForeground(new Color(56, 189, 248));
        lblStatusToast.setFont(new Font("Monospaced", Font.PLAIN, 11));
        lblStatusToast.setAlignmentX(Component.CENTER_ALIGNMENT);
        console.add(lblStatusToast);
        console.add(Box.createVerticalStrut(6));

        JPanel buttonsGrid = new JPanel(new GridLayout(2, 3, 6, 6));
        buttonsGrid.setOpaque(false);

        JButton btnMarcha = crearBotonSim("[Drive] Marcha", e -> {
            CanBusSimulator.iniciarMarcha();
            actualizarEstado("Conduciendo en Av. Ejercito a 48 km/h - Score 94");
        });

        JButton btnFreno = crearBotonSim("[Freno] Co-Pilot", e -> {
            String msg = CanBusSimulator.simularFrenadaDefensiva();
            actualizarEstado(msg);
        });

        JButton btnDesvio = crearBotonSim("[Carril] Desvio", e -> {
            String msg = CanBusSimulator.simularDesvioCarril();
            actualizarEstado(msg);
        });

        JButton btnSirena = crearBotonSim("[Sirena] Ambulancia", e -> {
            String msg = CanBusSimulator.simularSirenaAmbulancia();
            actualizarEstado(msg);
        });

        JButton btnPark = crearBotonSim("[Park] Llegada UTP", e -> {
            String msg = CanBusSimulator.simularLlegadaPark();
            actualizarEstado(msg);
        });

        JButton btnECall = crearBotonSim("[SOS] e-Call Impacto", e -> {
            String msg = CanBusSimulator.simularImpactoECall();
            actualizarEstado(msg);
        });

        buttonsGrid.add(btnMarcha);
        buttonsGrid.add(btnFreno);
        buttonsGrid.add(btnDesvio);
        buttonsGrid.add(btnSirena);
        buttonsGrid.add(btnPark);
        buttonsGrid.add(btnECall);

        console.add(buttonsGrid);
        return console;
    }

    private JButton crearBotonSim(String texto, ActionListener listener) {
        JButton btn = new JButton(texto);
        btn.setFont(new Font("SansSerif", Font.BOLD, 10));
        btn.setBackground(new Color(30, 41, 59));
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createLineBorder(new Color(51, 65, 85), 1));
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btn.addActionListener(listener);
        return btn;
    }

    private void actualizarEstado(String msg) {
        lblStatusToast.setText(msg);
        if (lblHoraArribo != null) lblHoraArribo.setText("Hora: " + SafeTeenData.ultimaHoraArribo);
        if (lblBateriaTutor != null) lblBateriaTutor.setText("Bateria Smartphone: " + SafeTeenData.bateriaMovil + "%");
        if (lblResplandorCabina != null) lblResplandorCabina.setText("Resplandor: " + SafeTeenData.resplandorColor);
        if (panelMapaSync4 != null) panelMapaSync4.repaint();
    }

    private JPanel crearCard(String titulo) {
        JPanel card = new JPanel();
        card.setBackground(new Color(15, 23, 42));
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(51, 65, 85), 1),
                new EmptyBorder(8, 10, 8, 10)
        ));
        JLabel lbl = new JLabel(titulo);
        lbl.setForeground(new Color(56, 189, 248));
        lbl.setFont(new Font("SansSerif", Font.BOLD, 11));
        card.add(lbl);
        return card;
    }

    private JPanel crearBarraProgreso(String etiqueta, int valor, Color colorBarra) {
        JPanel p = new JPanel(new BorderLayout(5, 2));
        p.setOpaque(false);

        JLabel lbl = new JLabel(etiqueta);
        lbl.setForeground(Color.LIGHT_GRAY);
        lbl.setFont(new Font("SansSerif", Font.PLAIN, 10));

        JLabel lblVal = new JLabel(valor + "%");
        lblVal.setForeground(colorBarra);
        lblVal.setFont(new Font("Monospaced", Font.BOLD, 10));

        JProgressBar pb = new JProgressBar(0, 100);
        pb.setValue(valor);
        pb.setForeground(colorBarra);
        pb.setBackground(new Color(30, 41, 59));
        pb.setBorderPainted(false);
        pb.setPreferredSize(new Dimension(100, 6));

        p.add(lbl, BorderLayout.WEST);
        p.add(lblVal, BorderLayout.EAST);
        p.add(pb, BorderLayout.SOUTH);
        return p;
    }

    /**
     * METODO MAIN: Permite ejecutar la aplicacion directamente
     */
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            SafeTeenMobileApp app = new SafeTeenMobileApp();
            app.setVisible(true);
        });
    }
}

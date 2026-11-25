package com.ford.safeteen;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * ============================================================================
 * ACTIVIDAD CABINA SYNC 4 (JAVA/ANDROID): Sync4Activity
 * ============================================================================
 * Representa la pantalla táctil de 12.3'' de la Ford Territory Titanium.
 * Basada en el benchmarking con GM Teen Driver, Bouncie y Ford OpenXC:
 * - 70% Navegación nativa / 30% Widget SafeTeen en Marcha (D).
 * - "In-Vehicle Report Card" al engranar Park (P).
 */
public class Sync4Activity extends AppCompatActivity {

    private boolean esPark = false;
    private Button btnCambiarMarcha, btnSirena, btnVolverJoven;
    private LinearLayout layoutEnMarcha, layoutReportCard;
    private TextView txtScoreCabina, txtMarchaActual;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sync4);

        btnCambiarMarcha = findViewById(R.id.btnCambiarMarcha);
        btnSirena = findViewById(R.id.btnSirena);
        btnVolverJoven = findViewById(R.id.btnVolverJoven);

        layoutEnMarcha = findViewById(R.id.layoutEnMarcha);
        layoutReportCard = findViewById(R.id.layoutReportCard);

        txtScoreCabina = findViewById(R.id.txtScoreCabina);
        txtMarchaActual = findViewById(R.id.txtMarchaActual);

        actualizarVista();

        btnCambiarMarcha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                esPark = !esPark;
                actualizarVista();
                if (esPark) {
                    Toast.makeText(Sync4Activity.this, 
                        "🅿️ Park engranado: Llegada confirmada a Ricardo Morales (Padre)", 
                        Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(Sync4Activity.this, 
                        "🟢 Marcha D activada: Navegación 70/30 en marcha", 
                        Toast.LENGTH_SHORT).show();
                }
            }
        });

        btnSirena.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(Sync4Activity.this, 
                    "🚨 ALERTA INCLUSIVA: Sirena externa detectada a 850 Hz (Ambulancia a retaguardia)", 
                    Toast.LENGTH_LONG).show();
            }
        });

        btnVolverJoven.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Sync4Activity.this, MainActivity.class));
                finish();
            }
        });
    }

    private void actualizarVista() {
        if (esPark) {
            layoutEnMarcha.setVisibility(View.GONE);
            layoutReportCard.setVisibility(View.VISIBLE);
            btnCambiarMarcha.setText("🟢 Poner Marcha (D)");
            txtMarchaActual.setText("Marcha: P (Park)");
        } else {
            layoutEnMarcha.setVisibility(View.VISIBLE);
            layoutReportCard.setVisibility(View.GONE);
            btnCambiarMarcha.setText("🅿️ Estacionar en Park (P)");
            txtMarchaActual.setText("Marcha: D (Drive)");
        }
    }
}

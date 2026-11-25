package com.ford.safeteen;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * ============================================================================
 * ACTIVIDAD PRINCIPAL ANDROID (JAVA): MainActivity
 * ============================================================================
 * Pantalla W-01: Dashboard Conductor Joven (Tomás Morales)
 * Muestra el Score 94/100, desglose de frenado CAN, rachas e insignias.
 */
public class MainActivity extends AppCompatActivity {

    private TextView txtScore, txtConductor, txtVehiculo;
    private ProgressBar progressFrenado, progressCarril, progressVelocidad;
    private Button btnCompartirScore, btnIrTutor, btnIrInclusivo, btnIrContrato, btnIrSync4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Enlazar componentes de la interfaz
        txtScore = findViewById(R.id.txtScore);
        txtConductor = findViewById(R.id.txtConductor);
        txtVehiculo = findViewById(R.id.txtVehiculo);

        progressFrenado = findViewById(R.id.progressFrenado);
        progressCarril = findViewById(R.id.progressCarril);
        progressVelocidad = findViewById(R.id.progressVelocidad);

        btnCompartirScore = findViewById(R.id.btnCompartirScore);
        btnIrTutor = findViewById(R.id.btnIrTutor);
        btnIrInclusivo = findViewById(R.id.btnIrInclusivo);
        btnIrContrato = findViewById(R.id.btnIrContrato);
        btnIrSync4 = findViewById(R.id.btnIrSync4);

        // 2. Cargar datos del modelo (Tomás Morales / Ford Territory)
        txtScore.setText("94");
        txtConductor.setText("Tomás Morales (20 años)");
        txtVehiculo.setText("Ford Territory Titanium 1.5L EcoBoost");

        progressFrenado.setProgress(96);
        progressCarril.setProgress(92);
        progressVelocidad.setProgress(94);

        // 3. Botón: Compartir Score con Tutor Ricardo
        btnCompartirScore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, 
                    "Score 94 enviado a Ricardo Morales. Préstamo de fin de semana aprobado automáticamente.", 
                    Toast.LENGTH_LONG).show();
            }
        });

        // 4. Navegación entre pantallas del MVP
        btnIrTutor.setOnClickListener(v -> startActivity(new Intent(MainActivity.this, TutorActivity.class)));
        btnIrInclusivo.setOnClickListener(v -> startActivity(new Intent(MainActivity.this, InclusivoActivity.class)));
        btnIrContrato.setOnClickListener(v -> startActivity(new Intent(MainActivity.this, ContratoActivity.class)));
        btnIrSync4.setOnClickListener(v -> startActivity(new Intent(MainActivity.this, Sync4Activity.class)));
    }
}

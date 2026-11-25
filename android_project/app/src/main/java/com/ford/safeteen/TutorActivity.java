package com.ford.safeteen;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * ============================================================================
 * ACTIVIDAD TUTOR ANDROID (JAVA): TutorActivity
 * ============================================================================
 * Pantalla W-02: Peace of Mind Dashboard (Ing. Ricardo Morales - 52 años)
 * Confirmación de llegada segura a Campus UTP en Park (P), batería al 84% y salud mecánica.
 */
public class TutorActivity extends AppCompatActivity {

    private TextView txtDestino, txtHora, txtBateria, txtFrenos;
    private Button btnAprobarPrestamo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tutor);

        txtDestino = findViewById(R.id.txtDestino);
        txtHora = findViewById(R.id.txtHora);
        txtBateria = findViewById(R.id.txtBateria);
        txtFrenos = findViewById(R.id.txtFrenos);
        btnAprobarPrestamo = findViewById(R.id.btnAprobarPrestamo);

        txtDestino.setText("Campus UTP (Arequipa)");
        txtHora.setText("19:45 hrs (A tiempo - Park confirmado)");
        txtBateria.setText("84% (0 llamadas al volante)");
        txtFrenos.setText("Pastillas al 75% vida útil (Óptimo)");

        btnAprobarPrestamo.setOnClickListener(v -> {
            Toast.makeText(TutorActivity.this, 
                "Préstamo autorizado para el fin de semana por Ricardo Morales.", 
                Toast.LENGTH_LONG).show();
        });
    }
}

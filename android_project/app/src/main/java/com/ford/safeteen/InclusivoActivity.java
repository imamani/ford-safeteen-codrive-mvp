package com.ford.safeteen;

import android.content.Context;
import android.os.Bundle;
import android.os.Vibrator;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * ============================================================================
 * ACTIVIDAD INCLUSIVA ANDROID (JAVA): InclusivoActivity
 * ============================================================================
 * Pantalla W-03: Accesibilidad Sensorial Universal (Mateo Huarca - Hipoacusia)
 * Supresión de pitidos por resplandor lumínico, pulsos hápticos (vibración física)
 * y detección acústica de sirenas de ambulancias por micrófonos.
 */
public class InclusivoActivity extends AppCompatActivity {

    private CheckBox chkLuces, chkHaptico, chkSirenas;
    private Button btnProbarHaptico, btnCertificado;
    private Vibrator vibrator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inclusivo);

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        chkLuces = findViewById(R.id.chkLuces);
        chkHaptico = findViewById(R.id.chkHaptico);
        chkSirenas = findViewById(R.id.chkSirenas);
        btnProbarHaptico = findViewById(R.id.btnProbarHaptico);
        btnCertificado = findViewById(R.id.btnCertificado);

        // Prueba de pulso háptico físico en el teléfono Android
        btnProbarHaptico.setOnClickListener(v -> {
            if (vibrator != null && vibrator.hasVibrator()) {
                vibrator.vibrate(250); // Vibración física real de 250 milisegundos
            }
            Toast.makeText(this, "Pulso háptico de advertencia ejecutado.", Toast.LENGTH_SHORT).show();
        });

        // Ver certificado de manejo inclusivo (RF-14)
        btnCertificado.setOnClickListener(v -> {
            Toast.makeText(this, 
                "Certificado Oficial: Mateo Huarca • Score 95/100 • 0 siniestros • Acreditado para aseguradoras.", 
                Toast.LENGTH_LONG).show();
        });
    }
}

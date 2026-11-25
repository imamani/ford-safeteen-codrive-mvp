package com.ford.safeteen;

import android.os.Bundle;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * ============================================================================
 * ACTIVIDAD CONTRATO ANDROID (JAVA): ContratoActivity
 * ============================================================================
 * Pantalla W-04: Contrato Digital Familiar y Geocercas
 * Slider único de Score (88 pts) y compromiso mutuo de autonomía familiar.
 */
public class ContratoActivity extends AppCompatActivity {

    private SeekBar seekScore;
    private TextView txtScoreMeta;
    private Button btnFirmar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contrato);

        seekScore = findViewById(R.id.seekScore);
        txtScoreMeta = findViewById(R.id.txtScoreMeta);
        btnFirmar = findViewById(R.id.btnFirmar);

        txtScoreMeta.setText("Meta Pactada: 88 Puntos");

        seekScore.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                int scoreReal = 80 + (progress * 15 / 100);
                txtScoreMeta.setText("Meta Pactada: " + scoreReal + " Puntos");
            }
            @Override public void onStartTrackingTouch(SeekBar seekBar) {}
            @Override public void onStopTrackingTouch(SeekBar seekBar) {}
        });

        btnFirmar.setOnClickListener(v -> {
            Toast.makeText(this, 
                "Contrato Digital Firmado. Meta registrada en la computadora de la Ford Territory.", 
                Toast.LENGTH_LONG).show();
        });
    }
}

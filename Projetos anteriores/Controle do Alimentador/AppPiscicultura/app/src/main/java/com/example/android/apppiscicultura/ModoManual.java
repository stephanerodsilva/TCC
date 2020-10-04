package com.example.android.apppiscicultura;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;

/**
 * Created by stephane on 20/08/2018.
 */

public class ModoManual extends AppCompatActivity {

    String serverIP;
    String porta;
    String cardume;

    int[] periodoAl={0,0,0,0,0,0,0,0,0};
    double[] quantRac={0,0,0,0,0,0,0,0,0};

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.cardumes);
        Intent intent = getIntent();
    serverIP = intent.getStringExtra("serverIP");
    porta = intent.getStringExtra("serverPort");
    cardume = intent.getStringExtra("cardume");
    }

    public void enviarManual(View view)
    {
        EditText p = findViewById(R.id.periodo);
        EditText quantRacao = findViewById(R.id.quantRacao);
        EditText dI = findViewById(R.id.dI);
        periodoAl[0] = Integer.parseInt(String.valueOf(p.getText()));  // numero de dias que o prototipo funciona
        quantRac[0] = Integer.parseInt(String.valueOf(quantRacao.getText()));  // ajuste manual do

        Intent intent = new Intent(ModoManual.this, Tanque.class);
        intent.putExtra("serverIP",serverIP);
        intent.putExtra("serverPort",porta);
        intent.putExtra("periodoAl",periodoAl);
        intent.putExtra("dataInicial",String.valueOf(dI.getText()));
        intent.putExtra("quantRacao", "80");
        startActivity(intent);


    }

    public void voltarManual(View view)
    {
        Intent intent = new Intent(ModoManual.this, Cardume.class);
        startActivity(intent);

    }
}

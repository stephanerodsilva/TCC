package com.example.android.apppiscicultura;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

/**
 * Created by stephane on 24/02/2018.
 */

    public class Tanques extends AppCompatActivity {
    String leitura = "";

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.tanques);

        Button btt1 = (Button)findViewById(R.id.tanque1);
        btt1.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(Tanques.this, Cardume.class);
                  intent.putExtra("dispositivo0", "192.168.0.175");
                  intent.putExtra("dispositivo1", "80");
                startActivity(intent);

            }
        });


        Button btt2 = (Button)findViewById(R.id.tanque2);
        btt2.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(Tanques.this, Tanque.class);
                intent.putExtra("dispositivo0", "192.168.0.99");
                intent.putExtra("dispositivo1", 80);
                startActivity(intent);

            }
        });


        Button btt3 = (Button)findViewById(R.id.tanque3);
        btt3.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(Tanques.this, Tanque.class);
                intent.putExtra("dispositivo0", "192.168.0.99");
                intent.putExtra("dispositivo1", 80);
                startActivity(intent);

            }
        });

    }


}
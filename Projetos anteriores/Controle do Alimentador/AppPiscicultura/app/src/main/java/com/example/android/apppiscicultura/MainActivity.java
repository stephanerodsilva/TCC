package com.example.android.apppiscicultura;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    private String usuarioJava;
    private String senhaJava;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button bt = (Button) findViewById(R.id.btEnviar);
        bt.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                EditText usuario = (EditText) findViewById(R.id.usuario) ;
                EditText senha = (EditText) findViewById(R.id.senha) ;
                usuarioJava=usuario.getText().toString();
                senhaJava=senha.getText().toString();
                if((usuarioJava.equals("admin"))&&(senhaJava.equals("1234"))) {

                    Intent myIntent = new Intent(MainActivity.this, Tanques.class);
                    startActivity(myIntent);

                }
            }
        });

    }


    }

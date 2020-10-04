package com.example.android.apppiscicultura;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.RadioButton;
import android.widget.RadioGroup;

/**
 * Created by stephane on 20/08/2018.
 */

public class Cardume extends AppCompatActivity {
    String serverIP;
    String serverPort;
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.cardumes);
        Intent i = getIntent();
        serverIP = i.getStringExtra("serverIP");
        serverPort= i.getStringExtra("serverPort");

    RadioButton btOrn = (RadioButton) findViewById(R.id.ornamental);
    RadioButton btTil = (RadioButton) findViewById(R.id.tilapia);
    if(btOrn.isSelected())
    {
    Log.i("****","Cardume Ornamental");
    }
    if(btTil.isSelected()){
        Intent intent = new Intent(Cardume.this, ModoManual.class);
        startActivity(intent);
        intent.putExtra("serverIP", "192.168.0.175");
        intent.putExtra("serverPort", "80");
        intent.putExtra("cardume", "Cardume de tilápias");

    }

}
}

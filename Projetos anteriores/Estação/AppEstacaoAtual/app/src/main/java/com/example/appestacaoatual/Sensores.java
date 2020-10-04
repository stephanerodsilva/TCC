package com.example.appestacaoatual;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.UnknownHostException;

public class Sensores extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    String serverIP = "192.168.0.107";
    int serverPort = 80;
    volatile Thread runner;
    String mensagem = null;
    Socket clientSocket = null;
    private volatile boolean stop = false;
    Intent intent;
    String pacote="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sensores);

        if (savedInstanceState == null) {
            Bundle extras = getIntent().getExtras();
            if(extras == null) {
                pacote= null;
            } else {
                pacote= extras.getString("PACOTE");
            }
        } else {
            pacote= (String) savedInstanceState.getSerializable("PACOTE");
        }



        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        if (runner != null)
            return;
        runner = new Thread(this::funcloop);
        runner.start();



    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            Intent intent = new Intent(Sensores.this, MainActivity.class);
            startActivity(intent);
        } else if (id == R.id.nav_gallery) {
            Intent intent = new Intent(Sensores.this, DadosTanque.class);
            startActivity(intent);
        } else if (id == R.id.nav_slideshow) {
            Intent intent = new Intent(Sensores.this, DadosEstacao.class);
            startActivity(intent);
        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void funcloop()  {
        int cont=0;


        while((runner == Thread.currentThread()) && stop != true)
        {
            try {
                clientSocket = new Socket(serverIP, serverPort);//making the socket connection
                final String x = ClasseSocket(pacote);

                Thread.currentThread().sleep(5000);

                Log.i("Teste","Teste");

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        TextView t = findViewById(R.id.textView3);
                        t.setText(""+ x);
                    }
                });



            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }}





    public String ClasseSocket(final String pacote) {

        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {


                try {

                    Log.i("Entrou aqui", "2");


                    DataOutputStream outToServer = new DataOutputStream(clientSocket.getOutputStream());
                    BufferedReader inFromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));//testing DataInputStream


                    outToServer.writeBytes(pacote + "\n");
                    mensagem = inFromServer.readLine();


                } catch (IOException ex) {

                    Sensores.this.ClasseSocket(pacote);
                }
            }
        });
        t.start();
        return mensagem;
    }


/*
    public void onBackPressed() {

        stop=true;
        Intent  intent = new Intent(Sensores.this, DadosTanque.class);
        startActivity(intent);
        finish();
    }*/

}

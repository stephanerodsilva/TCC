package com.example.android.apppiscicultura;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.ToggleButton;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.text.DecimalFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by stephane on 26/02/2018.
 */

public class Tanque extends AppCompatActivity {
    String serverIP;
    String porta;
    boolean inicia=false;
    int serverPort;
    private volatile Thread runner;
    int freqDiaria;
    String periodo[];
    String dataInicial="";
    String deslPeriodos="";
    String periodos="";

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.tanque);

        Intent intent = getIntent();
        serverIP = intent.getStringExtra("dispositivo0");
        porta = intent.getStringExtra("dispositivo1");
        serverPort=Integer.parseInt(porta);



        if (runner != null)
            return;
        runner = new Thread(this::funcloop);
        runner.start();


        Button btED = (Button)findViewById(R.id.btEnviarDados);
        btED.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {

                EditText et1 = (EditText) findViewById(R.id.horarioInicial);
                String hInicial=et1.getText().toString();
                String vetHInicial[] = hInicial.split(":");
                int tempoInicial =(Integer.parseInt(vetHInicial[0])*3600) +(Integer.parseInt(vetHInicial[1])*60);

                EditText et2 = (EditText) findViewById(R.id.horarioFinal);
                String hFinal=et2.getText().toString();
                String vetHFinal[] = hFinal.split(":");
                int tempoFinal =(Integer.parseInt(vetHFinal[0])*3600) +(Integer.parseInt(vetHFinal[1])*60);

                EditText et3 = (EditText) findViewById(R.id.numeroAlimentacoes);
                String pacote=tempoInicial+","+tempoFinal+","+et3.getText().toString();

                try {
                   ClasseSocket(pacote, serverIP, serverPort);

                } catch (IOException ex) {
                    Logger.getLogger(Tanque.class.getName()).log(Level.SEVERE, null, ex);
                } catch (InterruptedException ex) {
                    Logger.getLogger(Tanque.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });

   }


    private void funcloop() {
        while (runner == Thread.currentThread()) {

            try {
                ClasseSocket("pacote", serverIP, serverPort);
                Thread.currentThread().sleep(10000);
            } catch (IOException ex) {
                Logger.getLogger(Tanque.class.getName()).log(Level.SEVERE, null, ex);

            } catch (InterruptedException ex) {
                Logger.getLogger(Tanque.class.getName()).log(Level.SEVERE, null, ex);

            }
        }
    }

    public void mensagemRecebida(final String mensagem)
    {

        runOnUiThread(new Runnable() {

            @Override
            public void run() {
                DecimalFormat df =  new DecimalFormat("0");
                String message[] = mensagem.split(",");


                int NAlimentacoes=Integer.parseInt(message[7]);

                if(NAlimentacoes==0) {
                    System.out.println("Mensagem nula");}
                else{
                    TextView tv7 = (TextView) findViewById(R.id.caixa7);
                    tv7.setText("Horário da última leitura: "+message[1]);

                float hInicialR=Float.parseFloat(message[2])/3600;
                int hIR=(int) hInicialR;
                float hIRR=(hInicialR-hIR)*60;

                TextView tv8 = (TextView) findViewById(R.id.caixa8);
                if(hIRR<10.0) { tv8.setText("Horário Inicial de Alimentação: "+hIR+":0"+df.format(hIRR));   }
                else{ tv8.setText("Horário Inicial de Alimentação: "+hIR+":"+df.format(hIRR)); }

                float hFinalR=Float.parseFloat(message[3])/3600;
                int hFR= (int) hFinalR;
                float hFRR=(hFinalR-hFR)*60;
                TextView tv2 = (TextView) findViewById(R.id.caixa2);
                if(hFRR<10.0) { tv2.setText("Horário Final de Alimentação: "+hFR+":0"+df.format(hFRR));   }
                else{ tv2.setText("Horário Final de Alimentação: "+hFR+":"+df.format(hFRR)); }


                float hUltimaAR=Float.parseFloat(message[4])/3600;
                int hUAR= (int) hUltimaAR;
                float hUARR=(hUltimaAR-hUAR)*60;
                TextView tv3 = (TextView) findViewById(R.id.caixa3);
                 if(hUARR<10.0) { tv3.setText("Horário da Última Alimentação: "+hUAR+":0"+df.format(hUARR));   }
                 else{   tv3.setText("Horário da Última Alimentação: "+hUAR+":"+df.format(hUARR)); }

                float hProxAR=Float.parseFloat(message[5])/3600;
                int hPAR= (int) hProxAR;
                float hPARR=(hProxAR-hPAR)*60;
                TextView tv4 = (TextView) findViewById(R.id.caixa4);
                if(hProxAR>hFinalR)
                {
                    tv4.setText("Período de alimentação completo!");
                }

                else{
                    if(hPARR<10.0) { tv4.setText("Horário da Próxima Alimentação: "+hPAR+":0"+df.format(hPARR));   }
                    else{   tv4.setText("Horário da Próxima Alimentação: "+hPAR+":"+df.format(hPARR)); }
                }

                int Nvezes=Integer.parseInt(message[6]);
                TextView tv5 = (TextView) findViewById(R.id.caixa5);
                     tv5.setText("Número de vezes que já alimentou: "+Nvezes);

                TextView tv6 = (TextView) findViewById(R.id.caixa6);
                    tv6.setText("Número de Alimentações ao longo do dia: "+NAlimentacoes);

                TextView tv11 = (TextView) findViewById(R.id.textView14);
                tv11.setText(message[8]);

            } }
        });






    }



    public void ClasseSocket(final String pacote, final String serverIP, final int serverPort) throws IOException, InterruptedException
    {
        Log.i("Pacote: ",""+pacote);
        Log.i("serverIP: ",""+serverIP);
        Log.i("serverPort: ",""+serverPort);


        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                try {

                   Socket clientSocket = new Socket(serverIP, serverPort);//making the socket connection
                    //  Thread.sleep(1);
                    DataOutputStream outToServer = new DataOutputStream(clientSocket.getOutputStream());
                    DataInputStream inFromServer = new DataInputStream(clientSocket.getInputStream());//testing DataInputStream

                    outToServer.writeBytes(pacote);

                    String mensagem=inFromServer.readLine();
                    if(mensagem==null)
                    {
                        System.out.println("¨¨¨¨¨¨Mensagem: "+mensagem);

                    }
                    else{
                    String leitura[] = mensagem.split(",");
                    if(leitura[0].equals("L"))
                    {
                      Log.i("$$$$$$$$$$$",mensagem);
                      mensagemRecebida(mensagem);
                    }
                    else{
                        System.out.println("Mensagem recebida: " + mensagem);//print the answer
                    }}
                } catch (UnknownHostException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

            }
        });
        t.start();
    }












}

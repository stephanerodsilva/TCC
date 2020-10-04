#include <DS1302.h>

#include <ESP8266WiFi.h> 
#include <DS1302.h>   
#include <Math.h>


const char* ssid = "Rede Casa"; 
const char* password = "radiante";
int i=0;
double intervalo = 0;
int horaAtual=0;
 int ultimaAlimentacao=0; 
int proxAlimentacao=0;
String horarioInicial = "";
String horarioFinal = "";
String nAlimentacoes = "0";
String dataInicial="";
String periodos="";
int vetPeriodo[]={0,0,0,0,0,0,0,0,0}; 
float vetReg[]={0,0,0,0,0,0,0,0,0}; 
String regProt="";
int diasQueFaltam=0;
String dataAlimentacao;
float hF=0;
int hThreadPxAlm=0;
int hThreadPAlm=0;
 String dados = "No Message";
    float hI=0;
    float nAlim=0;
int contAlimentacao=0;

//DEFINIÇÃO DE IP FIXO PARA O NODEMCU
IPAddress ip(192,168,0,175); 
IPAddress gateway(192,168,0,1); 
IPAddress subnet(255,255,255,0); 
WiFiServer server(80); 
DS1302 rtc( D0, D1, D2);   

void setup() {
Serial.begin(115200);
delay(10); 
rtc.halt(false);          // Liga módulo
rtc.writeProtect(false);
//rtc.setTime(16, 53, 00);     // Seta hora para 23:59:50 (formato 24hr)
//rtc.setDate(28, 8, 2018);   // Seta a data para 17 de outubro de 2014

WiFi.begin(ssid, password);
WiFi.config(ip, gateway, subnet); 
while (WiFi.status() != WL_CONNECTED) { 
delay(500);
Serial.print("."); 

}

Serial.println(""); 
server.begin(); 
Serial.println("Servidor iniciado na rede sem fio: ");
Serial.println(ssid); 
Serial.print("IP para se conectar ao NodeMCU: "); //ESCREVE O TEXTO NA SERIAL
Serial.println(WiFi.localIP()); 
}


void loop() {
int p=0;
String dadosAtuais=rtc.getTimeStr();
String data=rtc.getDateStr(FORMAT_SHORT);
String hora = getValue(dadosAtuais, ':', 0); //do rtc
String minuto = getValue(dadosAtuais, ':', 1);
String segundo = getValue(dadosAtuais, ':', 2);
String dia = getValue(data, '.', 0);
String mes = getValue(data, '.', 1) ;
String ano = getValue(data, '.', 2);
String dataAtual=dia+"/"+mes+"/"+ano;

if(Serial.read()=='a')
{
rtc.addDay(1);  
rtc.addMin(-2);
 for(int i=0;i<9;i++)
    {
    if(vetPeriodo[i]!=0)
   {
    data=rtc.getDateStr(FORMAT_SHORT);  
    dia = getValue(data, '.', 0);
    mes = getValue(data, '.', 1) ;
    ano = getValue(data, '.', 2);
    dataAlimentacao=dia+"/"+mes+"/"+ano;
    vetPeriodo[i]-=1;
    p=i;
    diasQueFaltam=vetPeriodo[i];
    break;  
    }
   }
}


Serial.println("\n");
 horaAtual=(hora.toInt()*3600)+(minuto.toInt()*60)+(segundo.toInt());
Serial.println("---------- Relógio: ----------");
Serial.println("         "+hora+" : "+minuto+" : "+segundo);
Serial.println("---------- Data: ----------");
Serial.println("         "+dia+" / "+mes+" / "+ano);
Serial.println("---------- Data da prox Alimentacao: ----------");
Serial.println("         "+dataAlimentacao);

  Serial.println("Mensagem Recebida do servidor: ");
  float HInicial=hI/3600;
 int iTruncI=trunc(HInicial);
 float iFracI=(HInicial -iTruncI)*60;

  
  Serial.print("H Inicial: "); 
  if(iTruncI<10)
  {
  Serial.print("0");   
  }
  
  Serial.print(iTruncI); 
  
  Serial.print(": "); 
  if(iFracI<10)
  {
  Serial.print("0");   
  }
  Serial.print(iFracI,0); 
  Serial.print("   H Final: ");
  float HFinal=hF/3600;
 int iTruncF=trunc(HFinal);
 float iFracF=(HFinal -iTruncF) *60;
 if(iTruncF<10)
  {
  Serial.print("0");   
  }
  Serial.print(iTruncF); 
  Serial.print(": "); 
   if(iFracF<10)
  {
  Serial.print("0");   
  }
  Serial.print(iFracF,0); // sem casas decimais 
  Serial.println("   N alimentações: "+nAlimentacoes);
   
  Serial.print("Intervalo: ");   Serial.println(intervalo) ;
  
  delay (1000);

// se estiver próximo da hora de alimentar não pode enviar resposta porque atrapalha a alimentação
if(contAlimentacao==0)
{
hThreadPAlm = hI-horaAtual; }
if(hThreadPAlm<0)
{
hThreadPAlm=hThreadPAlm*(-1);  
}
if(contAlimentacao==1)
{
hThreadPAlm=0;
hThreadPxAlm = proxAlimentacao-horaAtual;
}
if(contAlimentacao>1){ 
hThreadPxAlm = proxAlimentacao-horaAtual;
}
if(hThreadPxAlm<0)
{
hThreadPxAlm=hThreadPxAlm*(-1);  
}



if(dataAtual.equals(dataAlimentacao))   
{
  if(hI==horaAtual)
  {
  ultimaAlimentacao=horaAtual;  
  Serial.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  1º alimentação  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"); 
  contAlimentacao=1; 
  proxAlimentacao=hI+intervalo;
  }
if((contAlimentacao<nAlim)&&(contAlimentacao!=0))
{
if(proxAlimentacao==horaAtual)
{
  ultimaAlimentacao=horaAtual;
  proxAlimentacao=proxAlimentacao+intervalo;
  contAlimentacao++;
  Serial.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Alimentou novamente  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");    
}
}
if(contAlimentacao==nAlim)
{
 contAlimentacao=0;
 proxAlimentacao=0;
}


}


WiFiClient client = server.available(); 
String conteudo="";
if (!client) { 
return; 
}
Serial.println("\n\n Novo cliente se conectou!");
if(!client.available()){ 
delay(1); 
}

for(int i=0;i<9;i++)
    {
    if(vetPeriodo[i]!=0)
    {
    diasQueFaltam=vetPeriodo[i];   
    p=i;
    break;
    }
    }

if((hThreadPAlm>9)or(hThreadPxAlm>9))  // condição não pega valores menores que horario atual
 {
     if(client.available()) {
    dados = client.readStringUntil('\n');
    Serial.println("\n\n&&&&& Novo cliente se conectou!");
    Serial.println("\n");
    Serial.println(dados);

    
 if(dados.equals("pacote"))
    {
    client.print("L");  
    client.print(",");  
    client.print(hora+":"+minuto);
    client.print(",");  
    client.print(hI);
    client.print(",");  
    client.print(hF);
    client.print(",");
    client.print(ultimaAlimentacao);
    client.print(",");
    client.print(proxAlimentacao);
    client.print(",");
    client.print(contAlimentacao);
    client.print(",");
    client.print(nAlimentacoes);
    client.print(",");
    client.print(dataAtual);
    client.print(",");
    client.print(diasQueFaltam);
    client.print(",");
    client.print(p);
    client.println("");
   
   }
   else{
    horarioInicial = getValue(dados, ',', 0);
    horarioFinal = getValue(dados, ',', 1);
    nAlimentacoes = getValue(dados, ',', 2);
    dataInicial = getValue(dados, ',', 3);
    periodos = getValue(dados, ',', 4);
    regProt = getValue(dados, ',', 5);
    hF=StrToFloat(horarioFinal);
    hI=StrToFloat(horarioInicial);
    nAlim=StrToFloat(nAlimentacoes);
    intervalo=(hF-hI)/(nAlimentacoes.toInt()-1);
    dataAlimentacao=dataInicial;
    for(int i=0;i<9;i++)
    {
    vetPeriodo[i] =getValue(periodos, '#', i).toInt();
   vetReg[i] =StrToFloat(getValue(regProt, '#', i));
    }
   
client.print("Mensagem recebida com sucesso!"); 
    client.stop();
   }
   }
   
}}

float StrToFloat(String str)
{
     char carray[str.length() + 1]; 
     str.toCharArray(carray, sizeof(carray));
    return atof(carray);
}


String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

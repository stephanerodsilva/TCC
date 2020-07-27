#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"
 
//const char* ssid = "ste";
//const char* password =  "123456678";
const char* ssid = "_:MARCO:_";
const char* password =  "Marco1213";
#define DHTPIN 4 /*sensor de temperatura DHT na porta D4 do node 32s*/
#define DHTTYPE DHT11
DHT dht(4 /*sensor de temperatura DHT na porta D4 do node 32s*/, 11 /**< DHT TYPE 11 */);
int httpResponseCode = 0; 
float vetCorrente[300];
float valor_medio;

HTTPClient http;  
   
void setup() {
  
  Serial.begin(115200);
  delay(4000);   //Delay needed before calling the WiFi.begin
  dht.begin();
  WiFi.begin(ssid, password); 
 
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
  }

 
}
 
void loop() {
 
 if(WiFi.status()== WL_CONNECTED)
 {
   int luminosidade = analogRead(36 /*sensor de luz na porta VP do node32s   */);   
   int gas = analogRead(39 /*sensor de gás na porta VN do node 32s*/);
   int h = dht.readHumidity();
   int t = dht.readTemperature();
   double maior_Valor = 0;
   double valor_Corrente = 0;
   float tensao = 5;
   int somaTotal = 0;
   for(int i = 0; i < 300; i++)
   {
      vetCorrente[i] = analogRead(34 /*sensor de corrente na porta D5 do node 32s*/);
      delayMicroseconds(600);
   }


  for(int i = 0; i < 300; i++)
  {
    somaTotal = vetCorrente[i] + somaTotal;
  }
  valor_medio = somaTotal / 300;
  valor_medio = valor_medio * 0.001220703; // 5v/4096 (resolução)
  valor_Corrente = (valor_medio * 66)/5; //sensibilidade : 66mV/A para ACS712 30A / 185mV/A para ACS712 5A

   //String url = "http://192.168.0.150:3003/api/tanques/"; 
   String url = "http://192.168.0.150:3003/api/tanques/";   
   String httpCode = "";
   httpCode += "id_tanque="+ (String)random(5);
   httpCode += "&id_placa="+(String)random(5);
   httpCode += "&s_acelerometro="+(String)random(5);
   httpCode += "&s_temperatura_a="+(String)random(5);
   //httpCode += "&s_temperatura_p="+(String)t;
   httpCode += "&s_temperatura_p="+(String)random(5);
   httpCode += "&s_tensao="+(String)random(5);
   httpCode += "&s_luminosidade="+(String)random(5);
   httpCode += "&s_gas="+(String)random(5);
   //httpCode += "&s_tensao="+(String)valor_medio;
   //httpCode += "&s_luminosidade="+(String)luminosidade;
   //httpCode += "&s_gas="+(String)gas;  
   envioHTTP(url,httpCode); 
   url = "http://192.168.0.150:3003/api/tanques/atu"; 
   httpCode = "";
   envioHTTP(url,httpCode);   
   delay(1000);  //Send a request every 10 seconds 
 }
 else
 {
  WiFi.reconnect();
 }
 }

 void envioHTTP(String url,String httpCode)
 {
   http.begin(url);  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/x-www-form-urlencoded");             //Specify content-type header 
   Serial.println(httpCode);
   httpResponseCode = http.POST(httpCode);     
   if(httpResponseCode>0)
   {
    String response = http.getString();                       //Get the response to the request
    Serial.println(httpResponseCode);   //Print return code
    Serial.println(response);           //Print request answer
   }
   else{ 
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode); 
   }
 }
 

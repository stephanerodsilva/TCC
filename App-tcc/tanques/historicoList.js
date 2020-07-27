import React, { Component } from 'react';
import { Dimensions, StyleSheet,Text, View, ScrollView, Button } from 'react-native';
//import { Table, TableWrapper, Row } from 'react-native-table-component';
import {PieChart,LineChart, Grid,XAxis, YAxis} from 'react-native-svg-charts';
import { Circle, Path } from 'react-native-svg'
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Loading from './loading'
import LoadingView from 'react-native-loading-view'

export default props => {

    // props.state = {
    //            tableHead: ['ID Tanque', 'ID Placa', 'Acelerômetro', 'Temp. Água', 'Temp. Placa', 'Tensão', 'Gás', 'Luminosidade'],
    //            widthArr: [50, 60, 100, 80, 80, 70, 60, 100]
    //          }
 
    const temperatura_p = [];   
    const tensao = [];   
    const gas = [];  
    const gas2 = [];
    const acelerometro = [];  
    const temperatura_a = []; 
    const luminosidade = [];    
    const createdAt = [];
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10  }
    const xAxisHeight = 40
    const screenWidth = Dimensions.get('window').width



    function leftPad(value, totalWidth, paddingChar) {
      var length = totalWidth - value.toString().length + 1;
      return Array(length).join(paddingChar || '0') + value;
    };
    
    const renderRows = () => {
        const data = []      
        const list = props.list || [];
        const time1 = props.time1 || 0;
        const time2 = props.time2 || 0;
        const combo = props.combo || 0;
        const combograf = props.combograf || 0;
        const datac  = ''; 

        if(combo != 1)
        {
        const datas1 = time1.split('/');   
        const texto1 = datas1[2]+'-'+datas1[1]+'-'+datas1[0];  
        var timer1 = Date.parse(texto1);
        const datas = time2.split('/');   
        const texto2 = datas[2]+'-'+datas[1]+'-'+datas[0];  
        var timer2 = Date.parse(texto2);
        }
        var date = new Date().getDate(); //To get the Current Date
        var month = new Date().getMonth() + 1; //To get the Current Month
        var year = new Date().getFullYear(); //To get the Current Year
        var mes = leftPad(parseInt(`${month}`),2);
        var dia = leftPad(parseInt(`${date}`),2);
        var dataatual = Date.parse(year+'-'+mes+'-'+dia);  
      
        list.map(tanques => {
          if(combo == 1)
          {
            if(Date.parse(`${tanques.createdAt}`) >= dataatual )        
            {
             <View key={tanques._id}  >         
              {temperatura_p.push(parseInt(`${tanques.s_temperatura_p}`))};
              {tensao.push(parseInt(`${tanques.s_tensao}`))};          
              {acelerometro.push(parseInt(`${tanques.s_acelerometro}`))};  
              {temperatura_a.push(parseInt(`${tanques.s_temperatura_a}`))}; 
              {luminosidade.push(parseInt(`${tanques.s_luminosidade}`))};   
              {createdAt.push(`${tanques.createdAt}`)};  
              {gas.push(parseInt(`${tanques.s_gas}`))}; 
              </View>
            }
          } 
          if(combo == 2)
          {
            if(Date.parse(`${tanques.createdAt}`) > timer1 &&  Date.parse(`${tanques.createdAt}`) < timer2 )        
            {
             <View key={tanques._id}  >         
              {temperatura_p.push(parseInt(`${tanques.s_temperatura_p}`))};
              {tensao.push(parseInt(`${tanques.s_tensao}`))};          
              {acelerometro.push(parseInt(`${tanques.s_acelerometro}`))};  
              {temperatura_a.push(parseInt(`${tanques.s_temperatura_a}`))}; 
              {luminosidade.push(parseInt(`${tanques.s_luminosidade}`))};   
              {createdAt.push(`${tanques.createdAt}`)};  
              {gas.push(parseInt(`${tanques.s_gas}`))}; 
              </View>
            }
          } 
         if(combo == 0)
          { 
          if( parseInt(`${tanques.s_gas}`) > props.time1 &&  parseInt(`${tanques.s_gas}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {gas.push(parseInt(`${tanques.s_gas}`))}; 
            </View>
          }
          if( parseInt(`${tanques.s_temperatura_p}`) > props.time1 &&  parseInt(`${tanques.s_temperatura_p}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {temperatura_p.push(parseInt(`${tanques.s_temperatura_p}`))}; 
            </View>
          }
          if( parseInt(`${tanques.s_tensao}`) > props.time1 &&  parseInt(`${tanques.s_tensao}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {tensao.push(parseInt(`${tanques.s_tensao}`))}; 
            </View>
          }
          if( parseInt(`${tanques.s_acelerometro}`) > props.time1 &&  parseInt(`${tanques.s_acelerometro}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {acelerometro.push(parseInt(`${tanques.s_acelerometro}`))}; 
            </View>
          }
          if( parseInt(`${tanques.s_temperatura_a}`) > props.time1 &&  parseInt(`${tanques.s_temperatura_a}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {temperatura_a.push(parseInt(`${tanques.s_temperatura_a}`))}; 
            </View>
          }
          if( parseInt(`${tanques.s_luminosidade}`) > props.time1 &&  parseInt(`${tanques.s_luminosidade}`) < props.time2)        
          {
           <View key={tanques._id}  >      
            {createdAt.push(`${tanques.createdAt}`)};                        
            {luminosidade.push(parseInt(`${tanques.s_luminosidade}`))}; 
            </View>
          }
            
          }
       //   console.log("&&&");
       //   console.log(Foo2(gas,createdAt));
        }

        
        ) 
  



        { renderGas() }
    }

    function Foo (vetor,createdAt) {   
      var dicionario = {};
      var data = {};
      var ultima = 0;
      var ultimadata = '';
      var repeticao = 0;

      for (var i = 0; i < vetor.length; i++) {
          
        if((vetor[i] == vetor[i+1]))
          {          
            if(repeticao == 0)
              {
                dicionario[i] = vetor[i];
                data[i] = createdAt[i];
                repeticao = repeticao +1;
              }
              else
              {  
                ultima = vetor[i];              
                ultimadata = createdAt[i];
                repeticao = repeticao +1;
              }         
          }
          else
          {
              if(repeticao > 0)
              {
                dicionario[i] = ultima;
                data[i] = ultimadata;  
                repeticao = 0;
              }
              dicionario[i] = vetor[i];
              data[i] = createdAt[i];
          }
        }     
      var novoVetor = [];
      for (var chave in dicionario) {      
          novoVetor.push(dicionario[chave]);
        //  console.log(dicionario[chave]);
      }
      return novoVetor;
  }


  
  function Foo2 (vetor,createdAt) {   
    var dicionario = {};
    var data = {};
    var ultima = 0;
    var ultimadata = '';
    var repeticao = 0;

    for (var i = 0; i < vetor.length; i++) {
        
      if((vetor[i] == vetor[i+1]))
        {          
          if(repeticao == 0)
            {
              dicionario[i] = vetor[i];
              data[i] = createdAt[i];
              repeticao = repeticao +1;
            }
            else
            {  
              ultima = vetor[i];              
              ultimadata = createdAt[i];
              repeticao = repeticao +1;
            }         
        }
        else
        {
            if(repeticao > 0)
            {
              dicionario[i] = ultima;
              data[i] = ultimadata;  
              repeticao = 0;
            }
            dicionario[i] = vetor[i];
            data[i] = createdAt[i];
        }
      }     
    var novoVetor = [];
    for (var chave in dicionario) {      
        novoVetor.push(data[chave]);
       // console.log(data[chave]);
    }
    return novoVetor;
}

   const keyHandler = (e) => {
      if (e.key === 'Enter') {
          e.shiftKey ? props.handleSearch() : props.handleAdd()
      } else if (e.key === 'Escape') {
          props.handleClear()
      }
  }


     const handlePress = () => {
       console.log("teste");
       props.handleSearch(); 

     }

     const contentInset = { top: 20, bottom: 20 }


     const Decorator = ({ x, y, data }) => {
         return data.map((value, index) => (
             <Circle
                 key={ index }
                 cx={ x(index) }
                 cy={ y(value) }
                 r={ 4 }
                 stroke={ 'rgb(134, 65, 244)' }
                
                
             />            
         ))
     }
     


 const Decorator2 = ({ x, y, data }) => {     

  var vetor = [];
  for (var i = 0; i < data.length; i++) {
    if(data[i] == data[i+1])
    {
    vetor.push(data[i]);
    vetor.push(data[i+1]);
    }
    else
    {
    vetor.push("-4");  
    }   
  }


  return vetor.map((value, index) =>  
  ( 
  <Circle
    key={ index }
    cx={ x(index) }
    cy={ y(value) }
    r={ 5 }
    stroke={ 'rgb(134, 65, 244)' }
    fill={ 'rgb(134, 65, 244)' } 
/>)
  ) 
}

     const renderGas= () => {
        return ( 
        <ScrollView> 
            <View>
            <Text style={{ width:358 }}></Text>         

            <View>    
                <Text  style={{textAlign:'center'}} >Sensor de Gás</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(gas,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{ width:Foo(gas,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{ width:Foo(gas,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(gas,createdAt) }                  
                    width={Dimensions.get('window').width  }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{width:Foo(gas,createdAt).length*15, height: 85, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(gas,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(gas,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View> 

            </View>       
         </ScrollView> 
         
         )  
     }
     const renderTempP= () => {
      return ( 
      <ScrollView> 
          <View>
          <Text style={{ width:358 }}></Text>         

          <View style={{  height: 20 }}></View>
            <View>    
                <Text  style={{textAlign:'center'}} >Sensor de Temperatura da Placa</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(temperatura_p,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{ width:Foo(temperatura_p,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{ width:Foo(temperatura_p,createdAt).length*15 , height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(temperatura_p,createdAt) }                  
                    width={Dimensions.get('window').width }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                 
                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{ width:Foo(temperatura_p,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(temperatura_p,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(temperatura_p,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View> 

          </View>       
       </ScrollView> 
       
       )  
   }

   const renderTempA= () => {
    return ( 
    <ScrollView> 
        <View>
        <Text style={{ width:358 }}></Text>         

        <View style={{  height: 20 }}></View>
            <View>    
                <Text  style={{textAlign:'center'}} >Sensor de Temperatura da água</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(temperatura_a,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(temperatura_a,createdAt) }                  
                    width={Dimensions.get('window').width }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                 
                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(temperatura_a,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(temperatura_a,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View> 


        </View>       
     </ScrollView> 
     
     )  
 }

 const renderAce= () => {
  return ( 
  <ScrollView> 
      <View>
      <Text style={{ width:358 }}></Text>         

      < View style={{  height: 20 }}></View>
            <View>    
                <Text  style={{textAlign:'center'}} >Acelerômetro</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(acelerometro,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{width:Foo(acelerometro,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{width:Foo(acelerometro,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(acelerometro,createdAt) }                  
                    width={Dimensions.get('window').width }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                 
                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{width:Foo(acelerometro,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(acelerometro,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(acelerometro,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View> 


      </View>       
   </ScrollView> 
   
   )  
}

const renderTen= () => {
  return ( 
  <ScrollView> 
      <View>
      <Text style={{ width:358 }}></Text>         

      <View style={{  height: 20 }}></View>
            <View>    
                <Text  style={{textAlign:'center'}} >Tensão</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(tensao,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{width:Foo(tensao,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{width:Foo(tensao,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(tensao,createdAt) }                  
                    width={Dimensions.get('window').width }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                 
                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{width:Foo(tensao,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(tensao,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(tensao,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View>


      </View>       
   </ScrollView> 
   
   )  
}

const renderLum= () => {
  return ( 
  <ScrollView> 
      <View>
      <Text style={{ width:358 }}></Text>         

      <View style={{  height: 20 }}></View>
            <View>    
                <Text  style={{textAlign:'center'}} >Luminosidade</Text>                   
                <ScrollView horizontal={true}>
                <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
                <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
                <YAxis
                    data={Foo(luminosidade,createdAt)}
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
               <View style={{width:Foo(luminosidade,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
                <View style={{width:Foo(luminosidade,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                    <LineChart
                    style={{ flex: 1, marginLeft:5}}
                    data={ Foo(luminosidade,createdAt) }                  
                    width={Dimensions.get('window').width }
                    svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                    contentInset={ contentInset }
                    >                 
                      
                    <Grid/>
                    <Decorator/>
                    <Decorator2/>
                </LineChart>
                </View>
                <View style={{width:Foo(luminosidade,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
                <XAxis
                            style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                            data={Foo2(luminosidade,createdAt)}                           
                            formatLabel={value => {
                              //const param = Foo(gas,createdAt)[value];
                              const data = Foo2(luminosidade,createdAt)[value].split('-');
                              const dia =  data[2].split('T');
                              const hora = dia[1].split(':');
                              const min = hora[2].split('.');
                               
                              const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                                 return "" + texto;
                               }                              
                             }
                             contentInset={verticalContentInset}                            
                             svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                             y: 28 }}
                            />

              
                </View></View>
                </View>
            </View>
             </ScrollView>                
            </View>

      </View>       
   </ScrollView> 
   
   )  
}


   const renderRows2 = () => {
    const varload = props.varload || false;

    return ( 
   <LoadingView loading={varload}>
    <ScrollView> 
        
        <View>
        <Text style={{ width:358 }}></Text>         

        <View>    
            <Text  style={{textAlign:'center'}} >Sensor de Gás</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(gas,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{ width:Foo(gas,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(gas,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(gas,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                                      
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(gas,createdAt).length*15, height: 85, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(gas,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(gas,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View> 

        <View style={{  height: 20 }}></View>
        <View>    
            <Text  style={{textAlign:'center'}} >Sensor de Temperatura da Placa</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(temperatura_p,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{width:Foo(temperatura_p,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(temperatura_p,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(temperatura_p,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                 
                  
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(temperatura_p,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(temperatura_p,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(temperatura_p,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View> 

        <View style={{  height: 20 }}></View>
        <View>    
            <Text  style={{textAlign:'center'}} >Sensor de Temperatura da água</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(temperatura_a,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(temperatura_a,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                 
                  
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(temperatura_a,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(temperatura_a,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(temperatura_a,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View> 

< View style={{  height: 20 }}></View>
        <View>    
            <Text  style={{textAlign:'center'}} >Acelerômetro</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(acelerometro,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{width:Foo(acelerometro,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(acelerometro,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(acelerometro,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                 
                  
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(acelerometro,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(acelerometro,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(acelerometro,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View> 

        <View style={{  height: 20 }}></View>
        <View>    
            <Text  style={{textAlign:'center'}} >Tensão</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(tensao,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{width:Foo(tensao,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(tensao,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(tensao,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                 
                  
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(tensao,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(tensao,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(tensao,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View>


        <View style={{  height: 20 }}></View>
        <View>    
            <Text  style={{textAlign:'center'}} >Luminosidade</Text>                   
            <ScrollView horizontal={true}>
            <View  style={{ paddingRight: 20,height: 290,padding: 0,flexDirection: "row" }}>    
            <View style={{ height: 200,marginLeft:5,marginRight:5, flexDirection: 'row' }}>
            <YAxis
                data={Foo(luminosidade,createdAt)}
                contentInset={ contentInset }
                svg={{
                    fill: 'grey',
                    fontSize: 10,
                }}
                numberOfTicks={ 10 }
                formatLabel={ value => `${value}` }
            />
           <View style={{width:Foo(luminosidade,createdAt).length*15, height: 290, paddingRight: 20, padding: 0, marginHorizontal: 0 }}>  
            <View style={{width:Foo(luminosidade,createdAt).length*15, height: 200, padding: 0, marginHorizontal: 0 , marginLeft:0}}>               
                <LineChart
                style={{ flex: 1, marginLeft:5}}
                data={ Foo(luminosidade,createdAt) }                  
                width={Dimensions.get('window').width }
                svg={{ stroke: 'rgb(134, 65, 244)',strokeWidth: 0, }}
                contentInset={ contentInset }
                >                 
                  
                <Grid/>
                <Decorator/>
                <Decorator2/>
            </LineChart>
            </View>
            <View style={{width:Foo(luminosidade,createdAt).length*15, height: 90, padding: 0, marginHorizontal: 0 }}>   
            <XAxis
                        style={{ marginHorizontal: 0, height: xAxisHeight+70}}
                        data={Foo2(luminosidade,createdAt)}                           
                        formatLabel={value => {
                          //const param = Foo(gas,createdAt)[value];
                          const data = Foo2(luminosidade,createdAt)[value].split('-');
                          const dia =  data[2].split('T');
                          const hora = dia[1].split(':');
                          const min = hora[2].split('.');
                           
                          const texto = ''+dia[0]+'/'+data[1]+'/'+data[0]+" "+hora[0]+":"+hora[1]+":"+min[0];                           
                             return "" + texto;
                           }                              
                         }
                         contentInset={verticalContentInset}                            
                         svg={{ fill: 'black', rotation: 90, fontSize: 7, originY: 35,
                         y: 28 }}
                        />

          
            </View></View>
            </View>
        </View>
         </ScrollView>                
        </View>



        </View>       
     </ScrollView>
     </LoadingView>
     )  
 }


    const functionButton = () => {
      console.log('Pressed!');
    }
    
    const escolherfuncao = () => {
   
      if(props.combograf == 1)
      {
      return renderRows2();
      }
      if(props.combograf == 2)
      {
      return renderGas();
      }
      if(props.combograf == 3)
      {
      return renderTempP();
      }
      if(props.combograf == 4)
      {
      return renderTempA();
      }
      if(props.combograf == 5)
      {
      return renderAce();
      }
      if(props.combograf == 6)
      {
      return renderTen();
      }
      if(props.combograf == 7)
      {
 
      return renderLum();
  
      }
    }
   
    
    return (
         <View>         
                    
         <View>         
              {             
              renderRows()          
              }  
         </View>
         <View>         
              { escolherfuncao()} 

         </View>
         </View>
 /* 
          <View >
         <ScrollView horizontal={true}>
           <View>
             <Table borderStyle={{borderColor: '#C1C0B9'}}>
     { <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text}/> }
             </Table>
             <ScrollView >
               <Table borderStyle={{borderColor: '#C1C0B9'}}>
                 {
                   renderRows()
                 }
               </Table>
             </ScrollView>
           </View>
         </ScrollView>
       </View>
*/
       )
       } 


const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30, 
      backgroundColor: '#ffffff' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#6F7BD9' 
    },
    text: { 
      textAlign: 'center', 
      fontWeight: '200' 
    },
    dataWrapper: { 
      marginTop: -1 
    },
    row: { 
      height: 40, 
      backgroundColor: '#F7F8FA' 
    }
  });

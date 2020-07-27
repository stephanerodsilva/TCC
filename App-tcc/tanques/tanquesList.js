import React, { Component } from 'react';
import { StyleSheet,Text, View,Image, ScrollView, Button } from 'react-native';
//import { Table, TableWrapper, Row } from 'react-native-table-component';
import {PieChart,LineChart, Grid,XAxis, YAxis} from 'react-native-svg-charts';

export default props => {

    // props.state = {
    //            tableHead: ['ID Tanque', 'ID Placa', 'Acelerômetro', 'Temp. Água', 'Temp. Placa', 'Tensão', 'Gás', 'Luminosidade'],
    //            widthArr: [50, 60, 100, 80, 80, 70, 60, 100]
    //          }
 
    const temperatura_p = [];   
    const tensao = [];   
    const gas = [];  
    const acelerometro = [];  
    const temperatura_a = []; 
    const luminosidade = [];    
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    

    const renderRows = () => {
        const data = []      
        const list = props.list || [];
        list.map(tanques => (             
            <View key={tanques._id}  >
            {temperatura_p.push(parseInt(`${tanques.s_temperatura_p}`))}; 
            {tensao.push(parseInt(`${tanques.s_tensao}`))};  
            {gas.push(parseInt(`${tanques.s_gas}`))}; 
            {acelerometro.push(parseInt(`${tanques.s_acelerometro}`))};  
            {temperatura_a.push(parseInt(`${tanques.s_temperatura_a}`))}; 
            {luminosidade.push(parseInt(`${tanques.s_luminosidade}`))};     
            </View>
        
        ))
        { renderRows2() }
    }

 
     const renderRows2 = () => {
        return ( 
        <ScrollView  > 
         <View>

         <Text style={{ width:358 }}></Text>          
         <View >
         <Text style={{ width:358 }}></Text>          
         <Text  style={{textAlign:'center'}} >Temperatura da Água</Text>
         <View style={{ height: 90, padding: 5, flexDirection: 'row' }}>
             <View style={{ flex: 1, marginLeft: 5 , alignItems: "center", justifyContent: "center"}}>                                     
                       <Text style={{ width: 140, height: 100 }}>                    
                       <Image 
                         source={require('../image/temp_agua.png')}
                         style={{ width: 75, height: 75, marginLeft: 5}}
                       />                             
                        {"  "+temperatura_a[0]+"ºC"}                         
                       </Text>                                 
             </View>
         </View>
         </View>

         <View style={{ marginTop:40 }} >
         <Text style={{ width:358 }}></Text>          
         <Text  style={{textAlign:'center'}} >Acelerômetro</Text>
         <View style={{ height: 90, padding: 5, flexDirection: 'row' }}>
             <View style={{ flex: 1, marginLeft: 5 , alignItems: "center", justifyContent: "center"}}>                                     
                       <Text style={{ width: 140, height: 100 }}>                    
                       <Image 
                         source={require('../image/acelerometro.png')}
                         style={{ width: 75, height: 75, marginLeft: 5}}
                       />                             
                        {" XYZ: "+acelerometro[0]}   
                      
                       </Text>                                 
             </View>
         </View>
         </View>



         <View style={{ marginTop:40 }} >
         <Text style={{ width:358 }}></Text>          
         <Text  style={{textAlign:'center'}} >Luminosidade</Text>
         <View style={{ height: 90, padding: 5, flexDirection: 'row' }}>
             <View style={{ flex: 1, marginLeft: 5 , alignItems: "center", justifyContent: "center"}}>                                     
                       <Text style={{ width: 140, height: 100 }}>                    
                       <Image 
                         source={require('../image/luminosidade.png')}
                         style={{ width: 75, height: 75, marginLeft: 5}}
                       />                             
                        {"  "+luminosidade[0]+" ohms"}   
                      
                       </Text>                                 
             </View>
         </View>
         </View>

         </View> 
         </ScrollView> )  
     }

    
    const functionButton = () => {
      console.log('Pressed!');
    }
    
    return (
         <View>         
                    
         <View>         
              {             
              renderRows()          
              }  
         </View>
         <View>         
              {             
              renderRows2()          
              }  
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

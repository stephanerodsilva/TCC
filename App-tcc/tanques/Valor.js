import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { View,Button, Text, Picker, TouchableOpacity, TextInput, StyleSheet,AppRegistry } from 'react-native'
 
export default class Valor extends Component {

   state = {  
      choosenIndex: 0, choosenIndexgraf: 1
  };   
  render() {
    return (
      <View  >
        {/* <Text>Home Screen</Text> */}

        <View style = {{paddingTop: 23}} >
        <View style = {styles.container}>   
           <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.language}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({language: itemValue, choosenIndex: itemPosition})}  
                    >           
                    <Picker.Item label="Dados por valor" value="0" />  
               
            </Picker>  
            </View>     
            
            <View style = {styles.container}>         
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Inicial"
               placeholderTextColor = "#1E90FF"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({input1: text})}
               />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Final"
               placeholderTextColor = "#1E90FF"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({input2: text})}
               />
              </View>
              <View style = {styles.container}>       
              <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.language}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({language: itemValue, choosenIndexgraf: itemPosition+1})}  
                    >  
                   
                    <Picker.Item label="Gráfico completo" value="1" />  
                    <Picker.Item label="Gráfico do sensor de gás" value="2" />  
                    <Picker.Item label="Gráfico da temperatura da placa" value="3" />  
                    <Picker.Item label="Gráfico da temperatura da água" value="4" />  
                    <Picker.Item label="Gráfico do acelerômetro" value="5" />  
                    <Picker.Item label="Gráfico de tensão" value="6" />
                    <Picker.Item label="Gráfico de luminosidade" value="7" />
            </Picker>
            </View>
             
         
         <View style = {{paddingTop: 23}} >
         <View style = {styles.container}>            
          <Button 
          title="Carregar Dados"
          style = {styles.submitButton}
          onPress={() => this.props.navigation.navigate('Historico',{time1:this.state.input1, time2:this.state.input2,combo:this.state.choosenIndex,combograf:this.state.choosenIndexgraf})}
           />
          </View>
          </View>
    
      </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
       
       flexDirection: 'row',
       justifyContent: 'center'
  
 
    },
    input: {
       margin: 15,
       height: 40,
       width:120,
       borderColor: '#1E90FF',
       borderWidth: 1,
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       width: 270,
       height: 40,
       flexDirection: 'row',
       justifyContent: 'center'
    },
    submitButtonText:{
       color: 'white'
    },
    pickerStyle:{  
      height: 150,  
      width: "80%",  
      flex: 1,  
      padding: 10,
       marginLeft: 40,
       marginRight: 20,
       width: 270,
       height: 40,
       flexDirection: 'row',
       justifyContent: 'center',  
      color: '#1E90FF',  
      borderColor: '#1E90FF',
  }  
 })
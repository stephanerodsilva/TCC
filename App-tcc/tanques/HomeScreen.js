import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { View,Button, Text, Picker, TouchableOpacity, TextInput, StyleSheet,AppRegistry } from 'react-native'
 
export default class Homescreen extends Component {

   state = {  
      choosenIndex: 0  
  };   
  render() {
    return (
      <View  >
        {/* <Text>Home Screen</Text> */}

        <View style = {{paddingTop: 23}} >
    
         <View style = {{paddingTop: 23}} >
         <View style = {styles.container}>            
          <Button 
          title="Carregar Dados por período"
          style = {styles.submitButton}
          onPress={() => this.props.navigation.navigate('Periodo')}
           /></View>
            <View style = {styles.container}> 
           <Button 
          title="Carregar Dados por valor"
          style = {styles.submitButton}
          onPress={() => this.props.navigation.navigate('Valor')}
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
       justifyContent: 'center',

       padding: 10,
        marginLeft: 10,
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
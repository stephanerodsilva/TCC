import {createAppContainer } from "react-navigation";
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,AppRegistry } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';
import Acesse from './usuarios/PaginaInicial';
//import AboutScreen from './AboutScreen';
import Usuarios from './AppInicial';



export default class App2 extends React.Component {
   static navigationOptions =
  {
     title: 'MainActivity',
  };
  
  state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
     // alert('email: ' + email + ' password: ' + pass)

   }

   
  render() {  
   return (           
     <AppContainer /> 
    );
  }
}

const AppNavigator = createStackNavigator({
    Acesse: {
    screen: Acesse,
    navigationOptions: {
      headerStyle:{backgroundColor:'#FF9800'},
      headerTintColor:'white',
      gesturesEnabled:false
  }, 
  },
  Usuarios: {
    screen: Usuarios,
    navigationOptions: {
        header: null,
    }, 
  },
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
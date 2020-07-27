import {createAppContainer } from "react-navigation";
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,AppRegistry } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';

import Selecione from './HomeScreen';
//import AboutScreen from './AboutScreen';
import Periodo from './Periodo';
import Valor from './Valor';
import Historico from './historico';

export default class App extends React.Component {
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
  Selecione: {
    screen: Selecione
  },
  Periodo: {
    screen: Periodo
  },
  Valor: {
    screen: Valor
  },
  Historico: {
    screen: Historico
  }
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
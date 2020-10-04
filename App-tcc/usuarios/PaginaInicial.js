import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { View,Button, Text, Picker, TouchableOpacity, TextInput, StyleSheet,AppRegistry } from 'react-native'
import axios from 'axios'
const URL = 'http://192.168.0.150:3003/api/users'

export default class PaginaInicial extends Component {

   state = {  
      choosenIndex: 0 ,
      username:'' ,
      password:'',
      input1:'',
      input2:''
  };   
  render() {
    return (
      <View  >
        {/* <Text>Home Screen</Text> */}

        <View style = {{paddingTop: 23}} >
         <View style = {{paddingTop: 23}} >
         <Text  style={{textAlign:'center'}} >Usuário:</Text>   
         <View style = {styles.container}>    
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Usuario"
               placeholderTextColor = "#1E90FF"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({input1: text})}
               />      
            </View>
            <Text  style={{textAlign:'center'}} >Senha:</Text>  
            <View style = {styles.container}>  
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Senha"
               placeholderTextColor = "#1E90FF"
               autoCapitalize = "none"
               onChangeText={(text) => this.setState({input2: text})}
               />
               </View>
         <View style = {styles.container}>           
          <Button 
          title="Acessar"
          style = {styles.submitButton}
          onPress={() => fazerlogin(this.props.navigation,this)}
           /></View>
            <View style = {styles.container}> 
          </View>
          </View>
    
      </View>
      </View>
    )
  }
}

function fazerlogin(props,p)
{
    //alert('login');
    //props.navigate('Usuarios')

    axios.get(`${URL}?sort=-createdAt${p.input1}`)
    .then(response => {
      for (var index = 0; index < response.data.length; ++index) {
      var x = response.data[index].username;
      var y = response.data[index].password;
     
      if(p.state.input1.localeCompare(x) === 0)
      {
         if(p.state.input2.localeCompare(y) == 0)
         { 
            props.navigate('Usuarios');
         }
         else{
            alert('Senha inválida');  
         }
      }
      else{
      alert('Usuário não cadastrado');  
      }}    
             
  });
       

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
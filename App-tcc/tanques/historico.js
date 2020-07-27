
import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, FlatList,StyleSheet } from "react-native";
import EstacaoList from './historicoList'
import LoadingView from 'react-native-loading-view'
import Spinner from 'react-native-loading-spinner-overlay';

var socket = require('socket.io-client')('http://192.168.0.150:3000');

const URL = 'http://192.168.0.150:3003/api/tanques/?sort=-createdAt'


export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = { spinner: false, id_tanque: '', id_placa: '', acelerometro: '',temperatura_a: '', temperatura_p:'',
        loading: true,isLoading: true,tensao:'',gas:'',luminosidade:'',   list: [], time1: 0, time2:0, combo:0,response: false, endpoint: "http://192.168.0.150:3000" }

        this.handleChangeid_tanque = this.handleChangeid_tanque.bind(this)
        this.handleChangeid_placa = this.handleChangeid_placa.bind(this)
        this.handleChangeaceler = this.handleChangeaceler.bind(this)
        this.handleChangetemp_a = this.handleChangetemp_a.bind(this)
        this.handleChangetemp_p = this.handleChangetemp_p.bind(this)
        this.handleChangetens = this.handleChangetens.bind(this)
        this.handleChangegas = this.handleChangegas.bind(this)
        this.handleChangelum = this.handleChangelum.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        //this.handleRemove = this.handleRemove.bind(this)
        this.handleChangeList()

        this.refresh() 
        
      
    
    }

    refresh(id_placa = '') {   
        const search = id_placa ? `&id_placa__regex=/${id_placa}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, id_placa, list: resp.data})) 
    }

        
    componentDidMount() {
        const getStars = () => new Promise((resolve) => {
            const FIVE_SECONDS = 15000
            console.log('promiseUsers iniciada');
            console.log(!this.state.spinner);

                this.setState({
                  spinner: !this.state.spinner
                });

            setTimeout(() => resolve(1234), FIVE_SECONDS)   
                
          })

        const fetchData = async () => {
            const stars = await getStars()
            console.log('promiseUsers resolvida');      
            this.setState({
                spinner: false
              });
            this.refresh()
        }
         
          console.log (fetchData());
    }


    
    handleSearch() {
       
        this.refresh(this.state.id_placa)

    }
              
    handleChangeList() {
             //socket.on('FromAPI', function(data){ 
             socket.on('FromAPI', data => {
             axios.get(`${URL}`)
             .then(resp => this.refresh())


           
             });
                
    }


    handleChangeid_tanque(e) {
        this.setState({...this.state, id_tanque: e.target.value })
    }
    handleChangeresp(e) {
        this.setState({...this.state, id_tanque: e.target.value })
    }
    handleChangeid_placa(e) {
        this.setState({...this.state, id_placa: e.target.value })
    }
    handleChangeaceler(e) {
        this.setState({...this.state, acelerometro: e.target.value })
    }
    handleChangetemp_a(e) {
        this.setState({...this.state, temperatura_a: e.target.value })
    }
    handleChangetemp_p(e) {
        this.setState({...this.state, temperatura_p: e.target.value })
    }
    handleChangetens(e) {
        this.setState({...this.state, tensao: e.target.value })
    }
    handleChangegas(e) {
        this.setState({...this.state, gas: e.target.value })
    }
    handleChangelum(e) {
        this.setState({...this.state, luminosidade: e.target.value })
    }


    handleAdd() {

        axios.post(URL, 
            { 
                id_tanque: this.state.id_tanque,
                id_placa: this.state.id_placa,
                s_acelerometro: this.state.acelerometro,
                s_temperatura_a: this.state.temperatura_a, 
                s_temperatura_p: this.state.temperatura_p, 
                s_tensao: this.state.tensao, 
                s_gas: this.state.gas, 
                s_luminosidade: this.state.luminosidade, 

            })
            .then(resp => this.refresh(this.state.id_placa))
           // console.log('ax', axios);
    }

    handleMarkAsDone() {
        /*const search = id_placa ? `&id_placa__regex=/${id_placa}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({...this.state, id_placa, list: resp.data}))*/
     
        
        /*const search = id_placa ? `&id_placa__regex=/${id_placa}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, id_placa, list: resp.data}))*/
    }

    handleClear() {
        this.refresh()
    }

    handleSubmit(e) {
        e.preventDefault();

        const newUser = {
            id_tanque: this.state.id_tanque,
            id_placa: this.state.id_placa,
            s_acelerometro: this.state.acelerometro,
            s_temperatura_a: this.state.temperatura_a, 
            s_temperatura_p: this.state.temperatura_p, 
            s_tensao: this.state.tensao, 
            s_gas: this.state.gas, 
            s_luminosidade: this.state.luminosidade, 
        };

        axios.post(URL, newUser)
            .then(response => {
             
            });

           
    }

    render() {
      const time1 = this.props.navigation.getParam('time1');
      const time2 = this.props.navigation.getParam('time2');
      const combo = this.props.navigation.getParam('combo');
      const combograf = this.props.navigation.getParam('combograf');


      //  console.log('lista', this.state.list);
        return (
            <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <EstacaoList  
            list={this.state.list} 
            time1={time1} 
            time2={time2} 
            combo = {combo}
            combograf = {combograf}
            varload = {this.props.loading}
            handleSearch={this.handleSearch}               
            />
           </View>
           </View>
            
        )
    }


}

socket.on('connect', function()
{           
console.log('Socket conectado no frontend no app');      
});
// socket.on('FromAPI', function(data){ 
// console.log('Buscou o tanque');    
// socket.off;
// });
socket.on('disconnect', function(){

}); 

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });
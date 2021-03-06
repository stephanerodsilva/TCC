
import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, FlatList } from "react-native";
import TanquesList from './tanquesList'
var socket = require('socket.io-client')('http://192.168.0.150:3000');

const URL = 'http://192.168.0.150:3003/api/tanques'


export default class Tanques extends Component {
    constructor(props) {
        super(props)
        this.state = { id_tanque: '', id_placa: '', acelerometro: '',temperatura_a: '', temperatura_p:'',
        tensao:'',gas:'',luminosidade:'',   list: [], response: false, endpoint: "http://192.168.0.150:3000" }

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
      /* const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => this.setState({ ...this.state, id_placa, list: resp.data}));*/
        //this.setState({ chatMessages: [...this.state.chatMessages, msg]   
        this.refresh()
  
    }


    
    handleSearch() {
       
        this.refresh()

    }
              
    handleChangeList() {
             //socket.on('FromAPI', function(data){ 
             socket.on('FromAPI', data => {
             axios.get(`${URL}`)
             .then(resp => this.refresh())

             console.log('Entrou aqui 3 ');  
           
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
        console.log("teste aqui");
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
                console.log('Saved');
                console.log(response.data);
                console.log(this.state.firstName);
            });

           
    }

    render() {
      
        //console.log('lista', this.state.list);
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TanquesList  
            list={this.state.list}                
            />
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
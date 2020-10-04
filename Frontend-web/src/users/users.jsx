import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './usersForm'
import TodoList from './usersList'

const URL = 'http://192.168.0.150:3003/api/users'

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', list: [] }

        this.handleChangeu = this.handleChangeu.bind(this)
        this.handleChangep = this.handleChangep.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    refresh(username = '') {
        const search = username ? `&username__regex=/${username}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, username, list: resp.data}))
    }

    handleSearch() {
        this.refresh(this.state.username)
        this.refresh(this.state.password)
    }

    handleChangeu(e) {
        this.setState({...this.state, username: e.target.value })
    }
    handleChangep(p) {
        this.setState({...this.state, password: p.target.value })
    }

    handleAdd() {
        const username = this.state.username
        const password = this.state.password
        axios.post(URL, { username: username, password:password})
            .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.username))
    }
    

    handleClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Cadastro de Usuários' ></PageHeader>
                <TodoForm 
                    username={this.state.username}
                    password={this.state.password}
                    handleChangeu={this.handleChangeu}
                    handleChangep={this.handleChangep}
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                     <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove} />
               
            </div>
        )
    }
}
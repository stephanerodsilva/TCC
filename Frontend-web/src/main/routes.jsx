import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Todo from '../todo/todo'
import About from '../about/about'
import Users from '../users/users'
import Tanque from '../tanques/tanques'


export default props => (
    <Router history={hashHistory}>
        <Route path='/todos' component={Todo} />
        <Route path='/about' component={About} />
        <Route path='/users' component={Users} />
        <Route path='/tanques' component={Tanque} />

        
        <Redirect from='*' to='/todos' />
    </Router>
)
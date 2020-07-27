const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // TODO Routes
    const todoService = require('../api/todo/todoService')
    todoService.register(router, '/todos')
    const usuarioService = require('../api/users/userService')
    usuarioService.register(router, '/users')
    const tanquesService = require('../api/tanques/tanquesService')
    tanquesService.register(router, '/tanques')
}
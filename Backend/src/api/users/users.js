  
const restful = require('node-restful')
const mongoose = restful.mongoose

const todoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    userAdmin: { type: Boolean, required: true, default: false}
})

module.exports = restful.model('Users', todoSchema)
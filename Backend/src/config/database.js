const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/todo')
var Message = mongoose.model('Message',{ name : String, message : String})
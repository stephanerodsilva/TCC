const Users = require('./users')

Users.methods(['get', 'post', 'put', 'delete'])
Users.updateOptions({new: true, runValidators: true})

module.exports = Users
const Tanques = require('./tanques')

Tanques.methods(['get', 'post', 'put', 'delete'])
Tanques.updateOptions({new: true, runValidators: true})

module.exports = Tanques
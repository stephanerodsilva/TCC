  
const restful = require('node-restful')
const mongoose = restful.mongoose

const todoSchema = new mongoose.Schema({
    id_tanque: { type: String, required: true },
    id_placa: { type: String, required: true },
    s_acelerometro: { type: String, required: true },
    s_temperatura_a: { type: String, required: true },
    s_temperatura_p: { type: String, required: true },
    s_tensao: { type: String, required: true },
    s_gas: { type: String, required: true },
    s_luminosidade: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports = restful.model('Tanques', todoSchema)
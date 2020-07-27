const express = require('express')
const axios = require("axios");


const server = express()
const port = 3003
const portsoc = 3000

const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const bodyParser = require('body-parser')
const allowCors = require('./cors')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(expressLogger);

var io = require('socket.io').listen(portsoc);

server.listen(port, function() { 
    logger.info('Server running on port %d', port);
})


let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  //interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

  const getApiAndEmit = async socket => {
    try {
      const res = await axios.get(
        "http://localhost:3003/api/tanques/"
        ); 
      socket.emit("FromAPI", res.json); // Emitting a new message. It will be consumed by the client
      console.log("Emissão com sucesso");
    } catch (error) {
      console.error(`Erro no envio: ${error.code}`);
    }
  };


/*
io.on('connection', function (socket) {
    console.log('Socket iniciado no backend');
  
        socket.emit('at_tanque', { hello: 'atualizacao dos tanques' });

     
    socket.on('my other event', function (data) {
    console.log(data);
        //io.sockets.emit('message', msg); emite para todos os clientes
    });
});
*/


/*
const { join } = require('path')
server.get('/',(req,res) => {
    // res.send('BACKEND is running on port ${res.json({})}.')
       //res.send('BACKEND is running on port ')
       //console.log ( '% O' , req );
       logger.info('Server running on port');
      
       //logger.debug('Calling res.send');
      
 })
 */

// rota de atualização dos dados
 server.post('/api/tanques/atu', (req, res) => {
        const result = axios.get(
        "http://localhost:3003/api/tanques/"
        ); 
      io.emit('FromAPI', result.json);
      res.sendStatus(200);
  })

 



module.exports = server
const http = require('http');
const app = require('./app');
require('dotenv').config();
const PORT=process.env.PORT;
const server = http.createServer(app);


const {startMongo} = require('./services/mongo');
const {loadAlltours} = require('../src/models/tours.model');

async function startServer() { 
  await startMongo();
  await loadAlltours();
  server.listen(PORT , () => {
    console.log('server is running');
  })
}

startServer();

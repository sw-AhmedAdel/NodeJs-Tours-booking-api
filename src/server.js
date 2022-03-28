const http = require('http');
const app = require('./app');
require('dotenv').config();
const PORT=process.env.PORT;
const server = http.createServer(app);

//const {loadToursData} = require('./models/tours.models');
const {startMongo} = require('./services/mongo');
const {loadToursData} = require('../src/models/tours.models')

async function startServer() { 
  await startMongo();
  await loadToursData();
  server.listen(PORT , () => {
    console.log('server is running');
  })
}

startServer();

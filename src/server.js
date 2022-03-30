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
// handel all async promise rejections that i did not handle it,
process.on('unhandledRejection' , err=> {
  console.log(err.name , err.message);

  //wait tell the server finishes all the request that are still pending or being handled at the time,
  server.close(() => {
    process.exit(1)
  });
})
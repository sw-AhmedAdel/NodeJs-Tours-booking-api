const http = require('http');
const app = require('./app');
require('dotenv').config();
const PORT=process.env.PORT;

process.on('uncaughtExceptions' , err=> {
  console.log('uncaught Exceptions')
  console.log(err.name , err.message);
  process.exit(1)
  
})

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
  console.log('unhandled Rejection')
  console.log(err.name , err.message);
  //wait tell the server finishes all the request that are still pending or being handled at the time,
  server.close(() => {
    process.exit(1)
  });
})

/* not 

try use this code
app.use((req , res , next) => {
  console.log(x);
  next();
})

you will get the err if you are in dev mode you will get the all error coz no error handel will catch it in dev
but in production the all error handel will will not catch it but the user will get readable message
*/


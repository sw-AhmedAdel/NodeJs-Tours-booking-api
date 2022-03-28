const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;


mongoose.connection.once('open', () =>{
  console.log('mongodb is running')
})

mongoose.connection.on('error', () => {
  console.log('can not connect to mong')
})

async function startMongo() {
  await mongoose.connect(MONGO_URL);
}

async function disconnectMongo(){
  await mongoose.disconnect(MONGO_URL);
}

module.exports={
  startMongo,
  disconnectMongo,
}


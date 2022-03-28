const express = require('express');
const app = express();
const api = require('./routes/api')
app.use(express.json());

app.use('/v1' , api);
 
module.exports = app;
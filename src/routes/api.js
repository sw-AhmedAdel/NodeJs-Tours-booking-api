const express = require('express');
const api = express.Router();
const toursRtoure = require('./tours/tours.routes');

api.use('/tours' , toursRtoure);
module.exports= api;
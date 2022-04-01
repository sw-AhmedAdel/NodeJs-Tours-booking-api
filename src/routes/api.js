const express = require('express');
const api = express.Router();
const toursRtoure = require('./tours/tours.routes');
const userRoute = require('./users/users.routes');

api.use('/users' , userRoute);
api.use('/tours' , toursRtoure);
module.exports= api;
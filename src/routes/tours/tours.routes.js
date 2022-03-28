 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpPostNewTour,
 } = require('./tours.controller');

 toursRoutes.post('/' , httpPostNewTour);
 module.exports = toursRoutes;
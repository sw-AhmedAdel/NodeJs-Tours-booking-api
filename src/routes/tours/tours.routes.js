 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpPostNewTour,
 } = require('./tours.controller');

 toursRoutes.get('/', httpGetALLTours);
 toursRoutes.post('/' , httpPostNewTour);
 module.exports = toursRoutes;
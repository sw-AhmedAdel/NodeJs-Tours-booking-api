 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpPostNewTour,
  httpUpdateTour
 } = require('./tours.controller');

 toursRoutes.get('/', httpGetALLTours);
 toursRoutes.post('/' , httpPostNewTour);
 toursRoutes.patch('/:id', httpUpdateTour)
 module.exports = toursRoutes;
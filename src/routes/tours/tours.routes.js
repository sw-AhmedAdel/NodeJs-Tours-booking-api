 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpPostNewTour,
  httpUpdateTour,
  httpDeleteTour
 } = require('./tours.controller');

 toursRoutes.get('/', httpGetALLTours);
 toursRoutes.post('/' , httpPostNewTour);
 toursRoutes.patch('/:id', httpUpdateTour)
 toursRoutes.delete('/:id' , httpDeleteTour);

 module.exports = toursRoutes;
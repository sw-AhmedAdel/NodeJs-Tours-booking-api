 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpCreateNewTour,
  httpUpdateTour,
  httpDeleteTour,
  httpdeleteAllData
 } = require('./tours.controller');

 toursRoutes.get('/', httpGetALLTours);
 toursRoutes.post('/' , httpCreateNewTour);
 toursRoutes.patch('/:id', httpUpdateTour)
 toursRoutes.delete('/:id' , httpDeleteTour);
 toursRoutes.delete('/', httpdeleteAllData)

 module.exports = toursRoutes;
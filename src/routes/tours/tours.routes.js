 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpCreateNewTour,
  httpUpdateTour,
  httpDeleteTour,
  httpdeleteAllData,
  httpGetToursStates,
  httpGetToursForEachMonth
 } = require('./tours.controller');

const {
  getTopTours,
} =require('../../services/query');


 toursRoutes.get('/', httpGetALLTours);
 toursRoutes.get('/top-tours' , getTopTours , httpGetALLTours);// use it to get this ?limit=5&sort=price,ratingsAverage
 toursRoutes.post('/' , httpCreateNewTour);
 toursRoutes.patch('/:id', httpUpdateTour)
 toursRoutes.delete('/:id' , httpDeleteTour);
 toursRoutes.delete('/', httpdeleteAllData)
 toursRoutes.get('/tours.stats', httpGetToursStates);
 toursRoutes.get('/monthly.plan/:year' , httpGetToursForEachMonth);
 module.exports = toursRoutes;
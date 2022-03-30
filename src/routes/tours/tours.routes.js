 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetOneTour,
  httpGetALLTours,
  httpCreateNewTour,
  httpUpdateTour,
  httpDeleteTour,
  httpdeleteAllData,
  httpGetToursStates,
  httpGetToursForEachMonth,
 } = require('./tours.controller');

const {
  getTopTours,
} =require('../../services/query');

const {
  catchAsync
} = require('../../services/query')


toursRoutes.get('/:id' , catchAsync(httpGetOneTour));
 toursRoutes.get('/', catchAsync( httpGetALLTours));
 toursRoutes.get('/top-tours' , getTopTours ,catchAsync( httpGetALLTours));// use it to get this ?limit=5&sort=price,ratingsAverage
 toursRoutes.post('/' , catchAsync( httpCreateNewTour));
 toursRoutes.patch('/:id',catchAsync( httpUpdateTour))
 toursRoutes.delete('/:id' ,catchAsync( httpDeleteTour));
 toursRoutes.delete('/',catchAsync( httpdeleteAllData))
 toursRoutes.get('/tours.stats',catchAsync( httpGetToursStates));
 toursRoutes.get('/monthly.plan/:year' ,catchAsync( httpGetToursForEachMonth));

 module.exports = toursRoutes;
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

const auth = require('../../middleware/auth');
const admim = require('../../middleware/admin');

toursRoutes.get('/top-tours'  , getTopTours ,catchAsync( httpGetALLTours));// use it to get this ?limit=5&sort=price,ratingsAverage
toursRoutes.get('/tours.stats' ,catchAsync( httpGetToursStates));
toursRoutes.get('/monthly.plan/:year' ,catchAsync(auth) ,catchAsync( httpGetToursForEachMonth));

 toursRoutes.get('/:id' , catchAsync(httpGetOneTour));
 toursRoutes.get('/', catchAsync(auth) ,catchAsync( httpGetALLTours));
 toursRoutes.post('/' , catchAsync( httpCreateNewTour));
 toursRoutes.patch('/:id',catchAsync( httpUpdateTour))
 toursRoutes.delete('/:id' , catchAsync(auth) ,admim('admin','lead-guide') ,catchAsync( httpDeleteTour));
 toursRoutes.delete('/',catchAsync( httpdeleteAllData))




 module.exports = toursRoutes;
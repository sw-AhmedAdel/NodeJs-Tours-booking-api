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
  httpGetAllToursWithin
 } = require('./tours.controller');

const {
  getTopTours,
} =require('../../services/query');

const {
  catchAsync
} = require('../../services/query')

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

toursRoutes.get('/', catchAsync( httpGetALLTours));
toursRoutes.get('/top/tours'  , getTopTours ,catchAsync(auth)  ,catchAsync( httpGetALLTours));// use it to get this ?limit=5&sort=price,ratingsAverage
toursRoutes.get('/tours/stats' ,catchAsync(auth)  ,catchAsync( httpGetToursStates));

toursRoutes.use(auth);
toursRoutes.get('/:id' , catchAsync(httpGetOneTour));
toursRoutes.get('/monthly.plan/:year' ,catchAsync( httpGetToursForEachMonth));
toursRoutes.get('/within/:distance/center/:latlng/unit/:unit' , httpGetAllToursWithin);

toursRoutes.use(restrictTo('admin','lead-guide'));
toursRoutes.post('/' , catchAsync( httpCreateNewTour));
toursRoutes.patch('/:id',catchAsync( httpUpdateTour))
toursRoutes.delete('/:id' ,catchAsync( httpDeleteTour));
toursRoutes.delete('/',catchAsync( httpdeleteAllData))




 module.exports = toursRoutes;
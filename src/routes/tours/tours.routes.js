 const express = require('express');
 const toursRoutes = express.Router();
 const {
  httpGetALLTours,
  httpCreateNewTour,
  httpUpdateTour,
  httpDeleteTour,
  httpdeleteAllData
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

 module.exports = toursRoutes;
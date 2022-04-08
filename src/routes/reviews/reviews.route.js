const express = require('express');
const reviewsRoute = express.Router();

const {
 httpGetAllReviews,
 httpCreateReview,
 httpUpdateReview,
 httpDeleteReview
} = require('./reviews.controllers');

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

const {
  catchAsync
} = require('../../services/query');

reviewsRoute.get('/' , catchAsync(auth) , catchAsync(httpGetAllReviews));
reviewsRoute.get('/:tourid/review' , catchAsync(auth), catchAsync(httpGetAllReviews) );
reviewsRoute.post('/:tourid/review' , catchAsync(auth) , restrictTo('user') , catchAsync(httpCreateReview));
reviewsRoute.patch('/:reviewid/review', catchAsync(auth) , catchAsync(httpUpdateReview));
reviewsRoute.delete('/:reviewid/review', catchAsync(auth) , catchAsync(httpDeleteReview));



module.exports= reviewsRoute;

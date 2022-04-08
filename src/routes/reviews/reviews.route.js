const express = require('express');
const reviewsRoute = express.Router();

const {
 httpGetAllReviews,
 httpCreateReview,
 httpUpdateReview,
} = require('./reviews.controllers');

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

const {
  catchAsync
} = require('../../services/query');

reviewsRoute.get('/' , catchAsync(auth) , catchAsync(httpGetAllReviews));
reviewsRoute.get('/:tourid/review' , catchAsync(auth), catchAsync(httpGetAllReviews) );
reviewsRoute.post('/:tourid/review' , catchAsync(auth) , restrictTo('user') , catchAsync(httpCreateReview));
reviewsRoute.patch('/:tourid/review', catchAsync(auth) , catchAsync(httpUpdateReview));

module.exports= reviewsRoute;

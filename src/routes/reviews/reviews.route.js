const express = require('express');
const reviewsRoute = express.Router();

const {
 httpGetAllReviews,
 httpCreateReview
} = require('./reviews.controllers');

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

const {
  catchAsync
} = require('../../services/query');

reviewsRoute.get('/' , catchAsync(auth) , catchAsync(httpGetAllReviews));
reviewsRoute.post('/:tourid/review' , catchAsync(auth) , restrictTo('user') , catchAsync(httpCreateReview));

module.exports= reviewsRoute;

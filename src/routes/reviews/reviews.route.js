const express = require('express');
const reviewsRoute = express.Router();

const {
  httpCreateReview,
  httpGetAllReviews
} = require('./reviews.controllers');

const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

const {
  catchAsync
} = require('../../services/query');

reviewsRoute.get('/' , catchAsync(auth) , catchAsync(httpGetAllReviews));
reviewsRoute.post('/add/review' , catchAsync(auth) , restrictTo('user') , catchAsync(httpCreateReview));

module.exports= reviewsRoute;

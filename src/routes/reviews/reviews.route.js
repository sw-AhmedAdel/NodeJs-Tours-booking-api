const express = require('express');
const reviewsRoute = express.Router();

const {
  httpCreateReview,
  httpGetAllReviews
} = require('./reviews.controllers');

const auth = require('../../middleware/auth');
const {
  catchAsync
} = require('../../services/query');

reviewsRoute.get('/' , catchAsync(auth) , catchAsync(httpGetAllReviews));
reviewsRoute.post('/add/review' , catchAsync(auth) , catchAsync(httpCreateReview));

module.exports= reviewsRoute;

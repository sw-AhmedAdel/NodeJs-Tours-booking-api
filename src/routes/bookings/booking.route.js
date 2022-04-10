const express = require('express');
const bookingRoute = express.Router();
const auth = require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');

const {
     catchAsync,
} = require('../../services/query');

const {
  getCheckoutSession,
  httpGetAllBooking
} = require('./booking.controller');

bookingRoute.get('/checkout/:tourid' , catchAsync(auth) , catchAsync( getCheckoutSession));
bookingRoute.get('/' , catchAsync(auth) , restrictTo('admin','lead-guide') ,catchAsync( httpGetAllBooking));

module.exports = bookingRoute;
const express = require('express');
const bookingRoute = express.Router();
const auth = require('../../middleware/auth');
const {
     catchAsync
} = require('../../services/query');

const {
  getCheckoutSession,
} = require('./booking.controller');

bookingRoute.get('/checkout/:tourid' , catchAsync(auth) , catchAsync( getCheckoutSession));

module.exports = bookingRoute;
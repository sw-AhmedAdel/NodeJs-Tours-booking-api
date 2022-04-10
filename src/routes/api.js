const express = require('express');
const api = express.Router();
const toursRtoure = require('./tours/tours.routes');
const userRoute = require('./users/users.routes');
const reviewsRoute =require('./reviews/reviews.route');
const bookingRoute = require('./bookings/booking.route');

api.use('/users' , userRoute);
api.use('/tours' , toursRtoure);
api.use('/reviews', reviewsRoute)
api.use('/bookings' , bookingRoute);

module.exports= api;
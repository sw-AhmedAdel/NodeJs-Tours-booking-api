const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const {catchAsync} = require('../../services/query');
const {
  httpCreateUser,
} = require('./users.controllers');

userRoute.post('/', catchAsync(httpCreateUser));

module.exports = userRoute;
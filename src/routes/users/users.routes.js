const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const {catchAsync} = require('../../services/query');
const {
  httpCreateUser,
  httpGetMyProfile,
  httpLoginUser,
} = require('./users.controllers');

userRoute.post('/', catchAsync(httpCreateUser));
userRoute.get('/my/profile' , catchAsync( auth ), catchAsync(httpGetMyProfile));
userRoute.post('/login' , catchAsync(httpLoginUser));

module.exports = userRoute;
const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const {catchAsync} = require('../../services/query');

const {
  httpCreateUser,
  httpGetMyProfile,
  httpLoginUser,
  httpDeleteMyAccount,
  httpLogOut
} = require('./users.controllers');

userRoute.post('/', catchAsync(httpCreateUser));
userRoute.get('/my/profile' , catchAsync( auth ), catchAsync(httpGetMyProfile));
userRoute.post('/login' , catchAsync(httpLoginUser));
userRoute.delete('/',  catchAsync(auth) ,catchAsync(httpDeleteMyAccount));
userRoute.get('/logout', catchAsync(auth) , catchAsync(httpLogOut) );
module.exports = userRoute;
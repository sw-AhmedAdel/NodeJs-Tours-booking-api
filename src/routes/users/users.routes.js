const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const {catchAsync} = require('../../services/query');

const {
  httpCreateUser,
  httpGetMyProfile,
  httpUpdateUSer,
  httpLoginUser,
  httpDeleteMyAccount,
  httpLogOut,
  httpLogOutAll
} = require('./users.controllers');

userRoute.post('/signup', catchAsync(httpCreateUser));
userRoute.get('/my/profile' , catchAsync( auth ), catchAsync(httpGetMyProfile));
userRoute.patch('/' , catchAsync(auth) , catchAsync(httpUpdateUSer) );
userRoute.post('/login' , catchAsync(httpLoginUser));
userRoute.delete('/',  catchAsync(auth) ,catchAsync(httpDeleteMyAccount));
userRoute.get('/logout', catchAsync(auth) , catchAsync(httpLogOut) );
userRoute.get('/logoutall', catchAsync(auth) , catchAsync(httpLogOutAll) );

module.exports = userRoute;
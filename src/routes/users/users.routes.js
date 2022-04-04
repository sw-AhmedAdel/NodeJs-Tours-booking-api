const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {catchAsync} = require('../../services/query');

const {
  httpGetAllUsers,
  httpCreateUser,
  httpGetMyProfile,
  httpUpdateUSer,
  httpLoginUser,
  httpDeleteMyAccount,
  httpLogOut,
  
} = require('./users.controllers');

const {
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../../password/password');


userRoute.get('/' , catchAsync(auth) , admin('admin','lead-guide') , catchAsync(httpGetAllUsers));
userRoute.post('/signup', catchAsync(httpCreateUser));
userRoute.get('/my/profile' , catchAsync( auth ), catchAsync(httpGetMyProfile));
userRoute.patch('/updateme' , catchAsync(auth) , catchAsync(httpUpdateUSer) );
userRoute.post('/login' , catchAsync(httpLoginUser));
userRoute.delete('/deleteme',  catchAsync(auth) ,catchAsync(httpDeleteMyAccount));
userRoute.get('/logout', catchAsync(auth) , catchAsync(httpLogOut) );

userRoute.post('/forgotpassword' ,  catchAsync(forgotPassword));
userRoute.patch('/resetpassword/:token' , catchAsync(resetPassword) );
userRoute.patch('/updatepassword',  catchAsync( auth ), catchAsync(updatePassword)  )

module.exports = userRoute;
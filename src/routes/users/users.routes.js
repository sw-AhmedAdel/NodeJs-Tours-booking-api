const express = require('express');
const userRoute = express.Router();
const auth =  require('../../middleware/auth');
const restrictTo = require('../../middleware/admin');
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


userRoute.post('/signup' ,catchAsync(httpCreateUser));
userRoute.post('/login' , catchAsync(httpLoginUser));
userRoute.post('/forgotpassword' ,  catchAsync(forgotPassword));
userRoute.patch('/resetpassword/:token' , catchAsync(resetPassword) );

userRoute.use(catchAsync(auth));
userRoute.get('/my/profile' , catchAsync(httpGetMyProfile));
userRoute.patch('/updateme' , catchAsync(httpUpdateUSer) );
userRoute.delete('/deleteme',  catchAsync(httpDeleteMyAccount));
userRoute.get('/logout' , catchAsync(httpLogOut) );
userRoute.patch('/updatepassword',   catchAsync(updatePassword)  )


userRoute.use(restrictTo('admin'));
userRoute.get('/', catchAsync(httpGetAllUsers));


module.exports = userRoute;
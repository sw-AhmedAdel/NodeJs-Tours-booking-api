const users = require('../models/users.mongo');
const jwt = require('jsonwebtoken');
const {promisify}= require('util')
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const appError = require('../services/class.err.middleware');

async function auth (req , res , next ) {
   
   const token = req.header('Authorization').replace('Bearer ', '');
   if(!token) {
    return next(new appError('you are not loged in, please log in to have access', 401))
   }

   const decoded = await promisify( jwt.verify)(token , secret );
   const user = await users.findOne({
     _id : decoded._id,
     //'tokens.token': token,
   })
   if(!user) {//test that by post new user and take his token and delete it and put the token in postman 
     return next( new appError('the user belonging to this token does not exits' , 401));
   }

  if( user.changePasswordAfter (decoded.iat)) {
    return next(new appError('user recently changed password, please login again', 401))
   }
 
  

   req.user = user;
   req.token = token;
   next();
}

module.exports= auth;

 
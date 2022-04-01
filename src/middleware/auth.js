const users = require('../models/users.mongo');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const appError = require('../services/class.err.middleware');

async function auth (req , res , next ) {
   const token = req.header('Authorization').replace('Bearer ', '');
   const decoded = jwt.verify(token , secret );
   const user = await users.findOne({
     _id : decoded._id,
     'tokens.token': token,
   })
   if(!user) {
     return new appError('please authenticate' , 401);
   }

   req.user = user;
   req.token = token;
}
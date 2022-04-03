
const users = require('../models/users.mongo');
const appError = require('../services/class.err.middleware');

async function forgetPassword (req , res , next) {
  if(!req.body.email) {
    return next(new appError('please provide your emai' , 400));
  }
   const user = await users.findOne({
     email : req.body.email,
   })
   
   if(!user) {
    return next(new appError('this user is not exits' , 404));
   }
   const resetToken = user.createPasswordResetToken();
   await user.save();
   return res.status(200).json({
     user,
     resetToken
   })
}

module.exports = {
  forgetPassword,
}
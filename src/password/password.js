
const users = require('../models/users.mongo');
const appError = require('../services/class.err.middleware');
const sendEmail = require('../services/emails');

async function forgotPassword (req , res , next) {
  if(!req.body.email) {
    return next(new appError('please provide your emai' , 400));
  }
   const user = await users.findOne({
     email : req.body.email,
   })
   
   if(!user) {
    return next(new appError('this user is not exits' , 404));
   }
   const resetToken = await user.createPasswordResetToken();
   const resetUrl=`${req.protocol}://${req.get('host')}/v1/users/resetPassword/${resetToken}`;
   console.log(resetUrl);
   const message =`Forgot your password? Submit a PATCH request with your new password 
   and passwordConfirm to ${resetUrl}, if you didn't forget your password, please ignore this email.`
   
   try{
   await sendEmail({
     email : user.email,
     subject: 'your password reset token (valid for 10mins)',
     message,
   })
   return res.status(200).json({
     status:'success',
     message:'Token send to email'
   })
  } catch(err) {
    user.passwordResetToken=undefined;
    user.passwordResetExpires= undefined;
    await user.save();

    return next(new appError('there was an error sending the email, please try again later'));
  }
} 
module.exports = { 
  forgotPassword,
}
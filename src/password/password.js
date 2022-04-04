
const users = require('../models/users.mongo');
const appError = require('../services/class.err.middleware');
const sendEmail = require('../services/emails');
const crypto  = require('crypto');
const  sendTokenViaCookie = require('../services/cookie');

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

async function resetPassword (req , res , next) {

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await users.findOne({
    passwordResetToken : hashedToken,
    passwordResetExpires: {
      $gt : Date.now(),
    }
  })
  if(!user){
    return next(new appError('Invalid token or token is expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm =req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires=undefined;//if i modefied the password using the same token will not work
  
  await user.save();
  //when i change the password the time of passwordCreatedAt will be determined like at 100
  //after that i will give the user new token and this will be ate 101 so when user want to do any actions
  //using auth function i will check if jwt time < passwordCreatedAt ? if it is not user can do actions   
 //but here when user forgot password anc resert it i change the passwordCreatedAt using middleware after that
 //creating new token but sometimes creating new token happend first like at 200 after that passwordCreatedAt at 201
 //so user can not make any action and he need to log in again  so when i create passwordCreatedAt i add -1sec so i 
 //make user storing passwordCreatedAt in db will happen first  
 const token =  user.getAuthToken();
 sendTokenViaCookie(token , res)
  return res.status(200).json({
    status:'success',
    token
  })
}


async function updatePassword (req , res , next) {


  const user = await users.findById(req.user._id)
  if(!await user.comparePassword(req.body.currentpassword , user.password)){
    return next (new appError('Your current password is wrong', 401));// unauthorized
  }
  if(!req.body.password || !req.body.passwordConfirm){
    return next(new appError('new password and passwordConfirm are required', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const token = user.getAuthToken();
  sendTokenViaCookie(token , res);
  return res.status(200).json({
    status:'success',
    token
  })

}
module.exports = { 
  forgotPassword,
  resetPassword,
  updatePassword 
}
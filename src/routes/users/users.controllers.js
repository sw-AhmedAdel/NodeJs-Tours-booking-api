const {
  CreateUser,
  findByrCedenitals
} = require('../../models/users.models');

const appError = require('../../services/class.err.middleware');

async function httpCreateUser(req , res , next) {
   const user_info = req.body;
   const user = await CreateUser(user_info);
   const token = await user.getAuthToken();
   return res.status(201).json({
     user,
     token,
   })
}

async function httpGetMyProfile (req , res , next) {
  const user = req.user;
  if(!user) {
    return next(new appError('something went wrong', 400));
  }
  return res.status(200).json({
    status:'success',
    data : user
  })
}

async function httpLoginUser (req , res , next) {
  const user = await findByrCedenitals (req.body.email , req.body.password);
  if(!user) {
   return next(new appError('unable to login', 400));
  }
  const token = await user.getAuthToken();
  return res.status(201).json({
    user,
    token,
  })
}

async function httpDeleteMyAccount (req , res , next) {
  await req.user.remove();
  return res.status(200).json({
    status:'success',
    message:'your account has been deleted'
  })
}

async function httpLogOut (req , res , next) {
  const user = req.user;
  user.tokens = user.tokens.filter((token) => req.token !== token.token);
  await user.save();

  return res.status(200).json({
    status:'success',
    message:'you have loged out'
  })
}

module.exports = {
  httpCreateUser,
  httpGetMyProfile,
  httpLoginUser,
  httpDeleteMyAccount,
  httpLogOut
}
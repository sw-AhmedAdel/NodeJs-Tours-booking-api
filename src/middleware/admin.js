
const appError = require('../services/class.err.middleware');

const admim = (...role) => {
  return (req , res , next) =>{
  if(!role.includes(req.user.role)){
    return next(new appError('You do not have permisssion to preform this action' , 403))
   }
   next();
  }

}

module.exports = admim;
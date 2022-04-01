
const appError = require('../../src/services/class.err.middleware');

function handleInvalidId (err) {
 const message = `Invalid ${err.path}: ${err.value}`;
 return new appError(message , 400);
}

function handlingDuplicateDatabase  (err) {

  const value = Object.values(err.keyValue);
  const message = `${value} is already exits,`;
  return new appError(message , 400);
}

function handleMongoosError (err) {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data ${errors.join('. ')}`;
  return new appError(message , 400);
}

//i want to see error while i am dev 
function sendErrorDev (err , res) {
  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
    error : err,
    stack : err.stack,
  })
}
 
// limit the erro and make it more readable to the user 
function sendErrorProd (err , res) {
  //isOperational means there is an error happend i tracked it using appError
  if(err.isOperational) {
  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
  })
  //any type of error i did not track it or unexpexted error, unkown error
} else {
  console.error('ERROR', err);
  return res.status(500).json({
    error:"something went wrong"
  })
}
 
}
 
function handlingErrorMiddleware (err , req , res , next)  {
  err.statusCode = err.statusCode || 500 ; // 500 > internal server error
  err.status = err.status || 'fail';

  if( process.env.NODE_ENV === 'development'){
    sendErrorDev(err ,res);
   } 
   else  if( process.env.NODE_ENV === 'production'  ){
     let error = Object.assign(err); 
  
     if( error.name ==='CastError') {
      error = handleInvalidId (error);
     }
     if(error.code === 11000) {
      error = handlingDuplicateDatabase(error);
    }

    if(error.name === "ValidationError") {
      error = handleMongoosError (error)
    }
    
    sendErrorProd(error, res);    
   } 
}

module.exports = {
  handlingErrorMiddleware,
};
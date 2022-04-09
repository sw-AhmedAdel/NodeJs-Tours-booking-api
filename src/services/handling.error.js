
const appError = require('../../src/services/class.err.middleware');

function handleInvalidId (err) { // invalid id 
 const message = `Invalid ${err.path}: ${err.value}`;
 return new appError(message , 400);
}

function handlingDuplicateDatabase  (err) {

  const value = Object.values(err.keyValue);
  const message = `${value} is already exits,`;
  return new appError(message , 400);
}

function handleMongoosError (err) {//errir i set in required [true, 'error her ' ]
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data ${errors.join('. ')}`;
  return new appError(message , 400);
}

function handelJwtExpired () {//change expired to 5s
  const message = 'your token has been expired, please login again';
  return new appError(message , 401);
}

function handelInvalidToken() {//to test that make auth in postman bearertoken and put any token 
  const message = 'Invalid token, please login again';
  return new appError(message , 401);
}

function handelGeoLocation() {
  const message ='Can not extract geo location from startLocation, please determine the start location in scheam'
  return new appError(message , 401);
}

//i want to see error while i am dev 
function sendErrorDev (err , res) {
  let error = Object.assign(err);
  if(error.code === 16755) { 
    error = handelGeoLocation()
  }

  return res.status(err.statusCode).json({
    status : error.status,
    message : error.message,
    error : error,
    stack : error.stack,
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
  
     if( error.name ==='CastError') {// invalid id
      error = handleInvalidId (error);
     }
     if(error.code === 11000) {// dublicate like emails
      error = handlingDuplicateDatabase(error);
    }

    if(error.name === "ValidationError") {// erros in the mongo
      error = handleMongoosError (error)
    }
    if(error.name ==='TokenExpiredError') {
      error = handelJwtExpired ()
    }

    if(error.name ==='JsonWebTokenError') {
      error = handelInvalidToken();
    }
  
    sendErrorProd(error, res);    
   } 
}

module.exports = {
  handlingErrorMiddleware,
};

 
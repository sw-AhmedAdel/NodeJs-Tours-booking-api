

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

  if( process.env.NODE_ENV === 'development' ){
    sendErrorDev(err ,res);
   } else  if( process.env.NODE_ENV === 'production' ){
    sendErrorProd(err ,res);
   } 

}

module.exports = {
  handlingErrorMiddleware,
};
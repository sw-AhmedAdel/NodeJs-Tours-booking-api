
 
function handlingErrorMiddleware (err , req , res , next)  {
  err.statusCode = err.statusCode || 500 ; // 500 > internal server error
  err.status = err.status || 'fail';

  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
  })
}

module.exports = {
  handlingErrorMiddleware,
};
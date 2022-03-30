const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit; 
 
  return {
    skip,
    limit,
  };
}

function getTopTours (req , res , next) {
  req.query.limit=5;
  req.query.sort ='price,ratingsAverage';
  req.query.fileds ='name,price,ratingsAverage,difficulty,summary,description,maxGroupSize';
  next();
}


 
function handlingErrorMiddleware (err , req , res , next)  {
  err.statusCode = err.statusCode || 500 ; // 500 > internal server error
  err.status = err.status || 'fail';

  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
  })
}
module.exports = {
  getPagination,
  getTopTours,
  handlingErrorMiddleware,
};
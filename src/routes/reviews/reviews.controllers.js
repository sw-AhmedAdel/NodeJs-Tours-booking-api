const {
  GetAllReviews,
  CreateReview,
  FindTour,
} = require('../../models/reviews.models');
 const appError = require('../../services/class.err.middleware');

async function httpGetAllReviews(req , res , next) {
  let filter = {};
  if(req.params.tourid){
    const tour = await FindTour(req.params.tourid);
    if(!tour) {
      return next(new appError('No tour was found', 404));
    }
    filter.tour = req.params.tourid
  }
   const reviews = await GetAllReviews(filter);
   return res.status(200).json({
     status:'success',
     data: reviews,
   })
}

async function httpCreateReview(req , res , next) {
 /* first approcah  
 if(!req.body.tour) req.body.tour = req.params.tourid;
  if(!req.body.user) req.body.user = req.user._id;
  and pass the body to createtour
*/
  const review = req.body;
  const user_id = req.user._id;
  const tour_id= req.params.tourid;
  const tour = await FindTour(tour_id);
  if(!tour) {
    return next(new appError('No tour was found', 404));
  }
  const newReview = await CreateReview(review , user_id , tour_id);
  return res.status(201).json({
    status:'success',
    data: newReview,
  })
}

 

module.exports = {
  httpCreateReview,
  httpGetAllReviews,
   
}
const {
  GetAllReviews,
  CreateReview,
  FindTour,
  UpdateReview,
  findReview
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
if(!req.params.tourid){
  return next(new appError('please provide us with tour id, 404'));
}
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

async function httpUpdateReview(req , res ,next) {
  if(!req.params.reviewid){
    return next(new appError('please provide us with review id, 404'));
  }
  const review = await findReview(req.params.reviewid);
  if(!review) {
    return next(new appError('No review was found', 404));
  }
  
  const newReview = await UpdateReview(req.body , req.params.reviewid);
  return res.status(200).json({
    status:'success',
    data:newReview
  })
}


async function httpDeleteReview(req , res ,next) {
  if(!req.params.reviewid){
    return next(new appError('please provide us with review id, 404'));
  }
  const review = await findReview(req.params.reviewid);
  if(!review) {
    return next(new appError('No review was found', 404));
  }
  await review.remove();
  return res.status(200).json({
    status:'success',
    message:'your review has been deleted'
  })
}
 

module.exports = {
  httpCreateReview,
  httpGetAllReviews,
  httpUpdateReview,
  httpDeleteReview
}
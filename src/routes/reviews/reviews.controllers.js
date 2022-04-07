const {
  GetAllReviews,
  CreateReview
} = require('../../models/reviews.models');

async function httpGetAllReviews(req , res , next) {
   const reviews = await GetAllReviews();
   return res.status(200).json({
     status:'success',
     data: reviews,
   })
}

async function httpCreateReview(req , res , next) {
  const review = req.body;
  const newReview = await CreateReview(review);
  return res.status(201).json({
    status:'success',
    data: newReview,
  })
}


module.exports = {
  httpCreateReview,
  httpGetAllReviews
}
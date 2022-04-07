const reviews = require('./reviews.mongo');

async function GetAllReviews () {
  return await reviews.find();
}

async function CreateReview (review ) {
   const newReview  = new reviews(review);
   await newReview.save();
   return newReview;
}

module.exports = {
  GetAllReviews,
  CreateReview
}
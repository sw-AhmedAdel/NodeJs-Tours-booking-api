const reviews = require('./reviews.mongo');
const tours = require('./tours.mongo');

async function GetAllReviews (filter) {
  return await reviews.find(filter)
}

async function FindTour(id) {
  return await tours.findById(id);
}


async function CreateReview (reviewBody , user_id , tour_id ) {
 // const newReview = await reviews.create(review)
   const review = Object.assign(reviewBody, {
     tour:tour_id,
     user:user_id,
   })
   const newReview  = new reviews(review);
   await newReview.save();
   return newReview;
}

async function UpdateReview(review , id) {
    const newReview = await reviews.findByIdAndUpdate(id , review , {
    new:true,
    runValidators:true,
  })
  return newReview
}

async function findReview(id) {
  return await reviews.findOne({
    _id : id
  })
}
 
module.exports = {
  GetAllReviews,
  CreateReview,
  FindTour,
  UpdateReview,
  findReview
 }
 
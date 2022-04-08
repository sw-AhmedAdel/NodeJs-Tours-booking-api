const mongoose = require('mongoose');
const  reviewsScheam = new mongoose.Schema({
  review: {
    type : String,
    required:[true,'Review can not be empty'],
    minlength:[5,'Review length must be over than 5 chars']
  },
  rating : {
    type: Number,
    min:[1 ,'Rating must be bigger than or equal 1'],
    max :[5 ,'Rating must be less then or equal 5']
  },
  //reivew will have the tour id and the user id coz user will write his review about the tour
  tour : 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref :'tour',
      required:[true, 'Review must belong to a tour']
    }
  ,
  user : 
    {
      type : mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:[true, 'Review must belong to a user']
    }
  
}, {
  timestamps:true,
  toJSON:{virtuals: true},
  toObject:{virtuals: true},
})
//populate the all users for the all reivew mean show me each review has been made by user 
// this is a middleware so any middle ware use find this will make it populate so when i get one tour
//i will get the all data about review
reviewsScheam.pre(/^find/ , function(next) {
 this.populate({
  path:'user',
  select:'name photo'
})/*.populate({
  path:'tour',
  select:'-guides _id name'
})here if i want to get the name of tour for each review but when i get the tour i want to get the reivew but
coz if here i populate the tour i will get it inside the review then i get the tour */
  next();
})

const reviews = mongoose.model('review' , reviewsScheam);
module.exports = reviews;
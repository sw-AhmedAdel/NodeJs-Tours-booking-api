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

reviewsScheam.pre(/^find/ , function(next) {
 this.populate({
  path:'user',
  select:'name photo'
}).populate({
  path:'tour',
  select:'-guides _id name'
})
  next();
})

const reviews = mongoose.model('review:' , reviewsScheam);
module.exports = reviews;
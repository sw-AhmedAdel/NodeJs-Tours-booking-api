const mongoose = require('mongoose');
const toursSchema = new mongoose.Schema({
  name :{
    type: String,
    required: [true , 'tour must have a name'],
    unique: true,
  },
  price :{
    type:Number,
    required: [true, 'tour must have a price'],
  },
  ratingAverage : {
    type:Number,
    default:0
  },
  ratingQuantity : {
    type:Number,
    default:0
  },
  duration: {
    type:Number,
    required:[true , 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required:[true , 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required:[true , 'A tour must have a difficulty'],
  },
  summary : {
    type: String,
    trim:true,
    required:[true , 'A tour must have a summary'],
  },
  description:{
    type:String
  }
  ,
  priceDiscount :{
    type:Number,
  },
   
  imageCover : {
    type : String,
    required:[true , 'A tour must have a cover image'],
  },

  images : {
    type: [String],
  },
  
  startDates : {
    type : [Date],
  }

}, {
  timestamps: true,
});

const tours = mongoose.model('Tour' , toursSchema);
module.exports = tours;
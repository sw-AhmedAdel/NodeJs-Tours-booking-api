const mongoose = require('mongoose');
const toursSchema = new mongoose.Schema({
  name :{
    type: String,
    required: [true , 'tour must have a name'],
    unique: true,
    trim:true,
  },
  price :{
    type:Number,
    required: [true, 'tour must have a price'],
  },
  ratingsAverage : {
    type:Number,
    default:0
  },
  ratingsQuantity : {
    type:Number,
    default:0
  },
  duration: { // number of days
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
  toJSON : {virtuals : true},
  toObject : {virtuals : true}
});
/*
i could have added createdAt like filed 
createdAt : {
  type: Date,
  default : Date.now,
  select : false >> means do not show it to users
}
*/ 

toursSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
  //if tour is 7 days, so 7 /7 = 1 this is one week
})


// use middleware to modify the data before saving it in mongo
toursSchema.pre('save', function(next) {
  next();
})

//use middleware to do some actions after saving the data
toursSchema.post('save', function(next){
  next();
})

const tours = mongoose.model('Tour' , toursSchema);
module.exports = tours;
const mongoose = require('mongoose');
//const users = require('./users.mongo'); used to embeded

const toursSchema = new mongoose.Schema({
  name :{
    type: String,
    required: [true , 'tour must have a name'],
    unique: true,
    trim:true,
    maxlength:[40 ,'A tour name must have less or equal than 40 chars'],
    minlength:[10 ,'A tour name must have more or equal than 10 chars'],
   
  },
  price :{
    type:Number,
    required: [true, 'tour must have a price'],
  },
  ratingsAverage : {
    type:Number,
    min:[1 , 'Rating must be above 1'],
    max:[5 ,'Rating must be bellow or equal 5.0'],
    set: val => Math.round(val * 10) / 10 // 4.7
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
    enum: {
      values : ['easy' ,'medium', 'difficult'],
      message:'difficulty is either : easy , medium , difficult',
    }
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
    validate:{
      //this works for only create new tour, if i want to update this will not work 
      validator: function(val) {
        return val < this.price;
      },
      message :'Discount price ({VALUE}) should be below original price'
    }
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
  },
  startLocation: {
    type :{
      type: String,
      default:'Point',
       enum:{
         values: ['Point'],
         message:' value must be Point'
       },
    },
    coordinates :[Number],
    address:String,
    description:String,
  }
  ,
  locations :[
    {
      type :{
        type: String,
        default:'Point',
        enum:{
          values: ['Point'],
          message:' value must be Point'
        },
      },
      coordinates :[Number],
      address:String,
      description:String,
      day: Number,
    },
  ],
 // guides: Array, used for embeded coz for each tour i want to store the guide or lead guide on it
 //this is called as child ref means out the user id here
 guides : [
   {
     type: mongoose.Schema.Types.ObjectId,
     ref:'user',// here stor user id as a ref 
   }
 ]
 } ,
  {
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
//here each review has user id and tour id, so i want each review for each tour so populate the reivew depends on
//the tour id in it and do that when i request one tour
//the all data i want to get will come from the review depends on populate the reviews using find
//to make this work to get the all reivew for each tour i must use in review middleware which is find 
//to populate the all review and here i use virtuals to get all review and in get one tour controller populate it
toursSchema.virtual('reviews' , {
 ref: 'review',
 localField:'_id',
 foreignField:'tour',
})

toursSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
  //if tour is 7 days, so 7 /7 = 1 this is one week
})


//using embeded to add user to tour model  by adding there id in  guides filed
//and use save to get there data but it is not goog approcah coz if i want to update the user like email
//i need to check if this user is in a tour ? if it yes so update the data in this tour so this is a lot of work
// and use ref it best approcah
/*toursSchema.pre('save' , async function (next) {
  const guidesPromisify = this.guides.map( async (id) =>  await users.findById(id));//this will return promise for each result
  this.guides = await Promise.all(guidesPromisify);
  next();
})
*/


toursSchema.index({ // compained index
  price:1 , ratingsAverage: -1
})

toursSchema.index({slug : 1})

// use middleware to modify the data before saving it in mongo
toursSchema.pre('save', function(next) {
  this.start = Date.now();
  next();
})

//use middleware to do some actions after saving the data and it does not work for update
toursSchema.post('save', function(doc, next){
 //console.log(doc);
 console.log(`saved doc took ${Date.now() - this.start } milsec` )
  next();
})

//use middleware on query , /^find/ means any query starts with find will run this code,use to like  execlude some data
toursSchema.pre(/^find/ , function( next) {
 // this.find( { price: { $ne :1497} } )
  //means if i want to get all tours but there are many secret tours for vip customers use this midlleware 
  
  this.populate({
    path:'guides',
    select:'-__v'
  })
  next();
})

toursSchema.post(/^find/ , function(docs , next) {
  //console.log(docs)
  next();
})

//here i execluded tour has price 1497 but if i want to see the all grouping tours using aggregate 
//this tour will be there so i will use middleware aggregate to remove it

 //aggregate is array will have the all document object so i can delete any thing from this array using unshift and match
toursSchema.pre('aggregate', function(next) {
  //pipelin is array has all object that i get using aggregate on grouping so in this array remove the tour using unshift
  //this.pipeline().unshift({ $match : { price: { $ne :1497}  } })
  next();

})

const tours = mongoose.model('tour' , toursSchema);
module.exports = tours;


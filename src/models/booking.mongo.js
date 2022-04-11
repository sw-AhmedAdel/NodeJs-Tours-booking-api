const mongoose  = require('mongoose');
const bookingSchema = new mongoose.Schema({

  tour : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'tour',
    required:[true ,' Booking must belong to a tour']
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:[true ,' Booking must belong to a user']
  },
  price:{
    type: Number,
    required: [true, 'Booking must have a price']
  },
}, {
  timestamps: true,
})
//to populate the tours that users have
bookingSchema.virtual('tours' , {
  ref:'tour',
  foreignField:'tour',
  localField:'_id'
})

bookingSchema.pre(/^find/ , function(next) {
  this.populate({
    path:'user',
  }).populate({
    path:'tour',
    select:'name , price -guides'
  })
  next();
})

const bookings = mongoose.model('booking' , bookingSchema);
module.exports = bookings;
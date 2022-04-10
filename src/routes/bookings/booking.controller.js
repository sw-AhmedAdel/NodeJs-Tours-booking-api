require('dotenv').config();
const tours = require('../../models/tours.mongo');
const stripe = require('stripe')(process.env.STRIPTE_SECRET_KEY);
const appError = require('../../services/class.err.middleware');
const bookings = require('../../models/booking.mongo');

const {
  GetALLBookings,
  CreateBooking,
} = require('../../models/booking.models');

async function getCheckoutSession (req , res , next) {
  const tour = await tours.findById(req.params.tourid);
  if(!tour) {
    return next(new appError('Tour is not exits'));
  }

  try{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });
  const book = {
    tour : tour._id,
    user:req.user._id,
    price: tour.price,
  }
  await CreateBooking(book);
  return  res.status(200).json({
    status: 'success',
    session
  });
} catch(err) {
  return next(new appError('Could not make the booking, please try again later'));
}

 
}


async function httpGetAllBooking(req , res, next) {
  const bookings = await GetALLBookings();
  return res.status(200).json({
    status:'success',
    data : bookings
  })
}


module.exports = {
getCheckoutSession,
httpGetAllBooking
}
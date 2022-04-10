const bookings = require('./booking.mongo');

async function GetALLBookings() {
  return await bookings.find();
}

async function CreateBooking(book) {
  const newBook = new bookings(book);
  newBook.save();

}



module.exports= {
  GetALLBookings,
  CreateBooking,
}
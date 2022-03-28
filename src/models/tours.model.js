const tours = require('./tours.mongo');

//get all tours
async function  GetALLTours () {
  return await tours.find();
} 

// post new tour
async function PostNewTour (tour) {
  const NewTour = await tours(tour);
  await NewTour.save();
  return NewTour;
}


module.exports = {
  PostNewTour,
  GetALLTours
}
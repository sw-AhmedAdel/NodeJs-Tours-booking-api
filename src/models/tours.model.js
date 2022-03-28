const tours = require('./tours.mongo');

async function PostNewTour (tour) {
  const NewTour = await tours(tour);
  await NewTour.save();
  return NewTour;
}


module.exports = {
  PostNewTour,
}
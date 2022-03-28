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

async function findTour (id ){
  return await tours.findOne({
    _id : id
  })
}

async function UpdateTour (id , tour) {
  const NewTour = await tours.findByIdAndUpdate(id , tour , {
    new: true,
    runValidators:true,
  })
  return NewTour;
} 

module.exports = {
  PostNewTour,
  GetALLTours,
  findTour,
  UpdateTour
}
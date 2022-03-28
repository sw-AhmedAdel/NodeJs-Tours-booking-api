const tours = require('./tours.mongo');
const fs = require('fs');
const path = require('path');

// read tours from the file 
async function readTours () {
  const allTours = JSON.parse( fs.readFileSync(path.join(__dirname,'..','..','data','tours-simple.json')));
  for(const tour of allTours) {
    await CreateNewTour(tour);
  }
}

//load all tours 
async function loadAlltours () {
  const firstTour = await  tours.findOne({
    name: "The Forest Hiker",
  })
  if(firstTour) {
    console.log('all data already exits')
  }
  else {
    console.log('inserting all tours');
   await readTours();
  }
}

//get all tours
async function  GetALLTours () {
  return await tours.find();
} 

// post new tour
async function CreateNewTour (tour) {

  const NewTour = await tours(tour);
  await NewTour.save();
   
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

async function deleteAllData() {
  const data = await tours.deleteMany();
  return data.acknowledged === true && data.deletedCount > 0
}

module.exports = {
  CreateNewTour,
  GetALLTours,
  findTour,
  UpdateTour,
  deleteAllData,
  loadAlltours
}
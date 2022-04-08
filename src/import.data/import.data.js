const users = require('../models/users.mongo')
const tours = require('../models/tours.mongo')
const reviews = require('../models/reviews.mongo')
const fs = require('fs');
const path = require('path');

async function saveAllData () {
  const allTours = JSON.parse( fs.readFileSync(path.join(__dirname,'..','..','data','tours.json')));
  const allUsers = JSON.parse( fs.readFileSync(path.join(__dirname,'..','..','data','users.json')));
  const allReviews = JSON.parse( fs.readFileSync(path.join(__dirname,'..','..','data','reviews.json')));
  
  try{
  await tours.create(allTours); 
  await users.create(allUsers , {
    validateBeforeSave: false
  }); 
  await reviews.create(allReviews); 
  console.log('Data successfully loaded')
  }
  catch(err) {
    console.log(err,'Could not loead data')
  }

}

async function loadAllData () {
  const firstTour = await  tours.findOne({
    name: "The Forest Hiker",
  })
  if(firstTour) {
    console.log('all data already exits')
  }
  else {
    console.log('inserting all tours');
   await saveAllData();
  }
}

async function DeleteAllData() {
  try{
  await tours.deleteMany()
  await reviews.deleteMany()
  await users.deleteMany()
  console.log('Data was removed successfully')
  }
  catch(err) {
    console.log('Could not remove data')
  }
}



module.exports= {
  loadAllData,
  DeleteAllData
}
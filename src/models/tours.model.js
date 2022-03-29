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
async function  GetALLTours (filter  , skip , limit , sortBy , fields) {
  return await tours.find(filter)
  .skip(skip)
  .limit(limit)
  .sort(sortBy)
  .select(fields);
  
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


async function GetToursStates () {
  const stats = await tours.aggregate([
    //first choose the filed that i want the all tours have in coomen
    // Stage number 1
    {
      $match : {
        ratingsAverage : {
          $gte : 4.5
        }
      }
    }
    ,  // Stage number 2
    {
      $group: {
        _id: { $toUpper : '$difficulty'}, //group each tours depends on difficulty and get the all rresults
       // _id: '$ratingsAverage', 
        numTours : {$sum: 1}, // each document add 1 to get the sum of all documents
        numRatings : {$sum :'$ratingsQuantity'},//number of all ratinfs
        avgRatings :{$avg : '$ratingsAverage'},//get the average of all avg ratings
        avgPrice : {$avg : '$price'},
        maxPrice : { $max : '$price' },
        minPrice : {$min : '$price' },
      }
    }
    ,  // Stage number 3
    {

     $sort : {
      avgPrice : 1
      }
    }
    ,  // Stage number 4 optional , means execlude this group depoends on the _id which is difficulty
    /*{
     $match : {
       _id : {
         $ne :'EASY'
       }
     }
    }*/
  ])

  return stats;
}

module.exports = {
  CreateNewTour,
  GetALLTours,
  findTour,
  UpdateTour,
  deleteAllData,
  loadAlltours,
  GetToursStates
}
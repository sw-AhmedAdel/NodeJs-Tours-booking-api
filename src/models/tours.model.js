const tours = require('./tours.mongo');



//get all tours
async function  GetALLTours (filter  , skip , limit , sortBy , fields) {
  return await tours.find(filter , {
    '__v': 0
  })
  .skip(skip)
  .limit(limit)
  .sort(sortBy)
  .select(fields)

  
} 

// post new tour
async function CreateNewTour (tour) {

  const NewTour = await tours(tour);
  await NewTour.save();
  return NewTour;
   
}

async function findTour (id ){
  return await tours.findOne({
    _id : id
  },)/*.populate({
    path:'guides',
    select:'-__v'
  }) i can use find middleware to apply it for the all find */
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
  //aggregate is array will have the all document object
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

async function GetToursForEachMonth (year) {
  const monthlyTours = await tours.aggregate([
   
    {
    // stage number 1 means git the document from startDates to do some operations
    $unwind :'$startDates'
    }
    ,
    // stage number 2  use match to get the dates between 2021
    {
      $match: {
        startDates : {
          $gte:new Date(`${year}-01-01`),
          $lte:new Date(`${year}-12-31`)
        }
      }
    }
    ,

    {
      $group: {
        _id: {$month: '$startDates'},//means get me each tour in the same month and put it in group
        numToursStart:{$sum: 1}, // count each tour in group
        tours: {$push : '$name'},
      }
    }
    , 
    {
      $addFields: {month :'$_id'}
    }
    ,
    {
     $project:{
        _id : 0
      }
    }
    ,
    {
      $sort : {
        numToursStart: -1
      }
    }
  ])

  return monthlyTours;
}

module.exports = {
  CreateNewTour,
  GetALLTours,
  findTour,
  UpdateTour,
  deleteAllData,
  GetToursStates,
  GetToursForEachMonth
}



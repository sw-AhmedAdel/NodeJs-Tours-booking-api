 const {
   GetALLTours,
   CreateNewTour,
   findTour,
   UpdateTour,
   deleteAllData,
   GetToursStates,
   GetToursForEachMonth
} = require('../../models/tours.model');

const {
  getPagination ,
} = require('../../services/query');

const filterFeatures = require('../../services/class.filters');
const appError = require('../../services/class.err.middleware');



async function httpGetOneTour (req , res , next) {
  const id = req.params.id;
  const tour = await findTour(id);
  
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }
  return res.status(200).json({
    status:'success',
    data : tour,
  })
}

async function httpGetALLTours(req , res , next) {
  const filter = {...req.query};
  const {skip , limit} = getPagination(filter);

  const execludeFileds = ['page','sort','limit','fields'];
  execludeFileds.forEach((el) => delete filter[el]);
  const features = new filterFeatures(req.query , filter);

  const finalFilter = features.filterFun();
  const sortBy = features.sortBy();
  const fields =features.filterFileds();
 
 const tours = await GetALLTours(finalFilter , skip , limit , sortBy , fields)
  return res.status(200).json({
    success:true,
    results: tours.length,
    tours ,
  }) ;
}



  async function  httpCreateNewTour  (req , res , next)  {
   const tour = req.body;
   await CreateNewTour(tour);
   return res.status(201).json(tour);

 }

async function httpUpdateTour (req , res , next) {
  const id = req.params.id;
  const tour = await findTour(id);
 
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }

   const NewTour = await UpdateTour(id , req.body);
   return res.status(200).json(NewTour);
}


async function httpDeleteTour (req , res , next) {
 
  const id = req.params.id;
  const tour = await findTour(id);
 
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }

  await tour.remove();
  return res.status(200).json(tour);

}

async function httpdeleteAllData(req , res , next) {
  const data = await deleteAllData();
  
  if(!data) {
    return  next(new appError('there is no data to be deleted', 200));
  }

  return res.status(200).json({
    ok : true,
  })
}

async function httpGetToursStates(req , res , next ) {
  const stats = await GetToursStates();
 
  if(!stats) {
    return  next(new appError('something went wrong', 404));
  }

  return res.status(200).json({
    status :'success',
    data : stats
  })
}

async function httpGetToursForEachMonth (req , res , next) {
  const year = Number(req.params.year);
  const tours = await GetToursForEachMonth(year);
  if(!tours) {
    return  next(new appError('something went wrong', 404));
  }
  return res.status(200).json({
    status :'success',
    data : tours
  })
}


 module.exports = {
   httpGetOneTour ,
   httpCreateNewTour,
   httpGetALLTours,
   httpUpdateTour,
   httpDeleteTour,
   httpdeleteAllData,
   httpGetToursStates,
   httpGetToursForEachMonth
 }
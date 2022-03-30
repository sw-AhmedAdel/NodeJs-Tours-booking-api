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
    return res.status(400).json({
      error:'tour is not find'
    })
  } 
   const NewTour = await UpdateTour(id , req.body);
   return res.status(200).json(NewTour);
}


async function httpDeleteTour (req , res , next) {
 
  const id = req.params.id;
  const tour = await findTour(id);
  if(!tour) {
    return res.status(400).json({
      error:'tour is not find'
    })
  } 
   
  await tour.remove();
  return res.status(200).json(tour);

}

async function httpdeleteAllData(req , res , next) {
  const data = await deleteAllData();
  if(!data) {
    return res.status(400).json({
      error:"there is no data to delete",
    })
  }
  return res.status(200).json({
    ok : true,
  })
}

async function httpGetToursStates(req , res , next ) {
  const stats = await GetToursStates();
  if(!stats){
    return res.status(400).json({
      error:'something went wrong'
    })
  }

  return res.status(200).json({
    status :'success',
    data : stats
  })
}

async function httpGetToursForEachMonth (req , res , next) {
  const year = Number(req.params.year);
  const tours = await GetToursForEachMonth(year);
  if(!tours){
    return res.status(400).json({
      error:'something went wrong'
    })
  }

  return res.status(200).json({
    status :'success',
    data : tours
  })
}


 module.exports = {
   httpCreateNewTour,
   httpGetALLTours,
   httpUpdateTour,
   httpDeleteTour,
   httpdeleteAllData,
   httpGetToursStates,
   httpGetToursForEachMonth
 }
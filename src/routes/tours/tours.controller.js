 const {
   GetALLTours,
   CreateNewTour,
   findTour,
   UpdateTour,
   deleteAllData,
} = require('../../models/tours.model');

const {getPagination} = require('../../services/query');


async function httpGetALLTours(req , res) {
  const filter = {...req.query};
 
  // 1) pagination , use it for testing ?page=2&limit=2
  const {skip , limit} = getPagination(filter);
  const execludeFileds = ['page','sort','limit','fields'];

  execludeFileds.forEach((el) => delete filter[el]);
 
  //2)  advanced filter use it for testing ?duration[gte]=7&price[gte]=497 use it to test
  let modifyFilter = JSON.stringify(filter);
  modifyFilter = modifyFilter.replace(/\b(gte|gt|lt|lte)\b/g , match => `$${match}`) ;
  const finalFilter = JSON.parse(modifyFilter);

  // 3) sort , ust it for testing ?sort=price,ratingsAverage
  let sortBy;
  if(req.query.sort) {
    console.log(req.query.sort)
     sortBy =req.query.sort.split(',').join(' ');
    console.log(sortBy);
  }
  else {
    sortBy ='-createdAt';// sort by the newest
  }
 
 
 //4) select fileds
 //use it for testing ?fields=name,price
 let fields;
 if(req.query.fields) {
  fields = req.query.fields.split(',').join(' ');
 } else {
  fields ='-__V';
 }
 const tours = await GetALLTours(finalFilter , skip , limit , sortBy , fields)
  return res.status(200).json({
    success:true,
    results: tours.length,
    tours ,
  }) ;
}

 async function httpCreateNewTour (req , res) {
   try {
   const tour = req.body;
   await CreateNewTour(tour);
   return res.status(201).json(tour);

   }catch (err) {
    return res.status(400).json({
      message: err
    });
   }
 }

async function httpUpdateTour (req , res) {

 try {
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
  catch(err) {
    return res.status(400).json({
      message:err,
    })
  }
}

async function httpDeleteTour (req , res) {
  try {
  const id = req.params.id;
  const tour = await findTour(id);
  if(!tour) {
    return res.status(400).json({
      error:'tour is not find'
    })
  } 
   
  await tour.remove();
  return res.status(200).json(tour);

  }catch(err) {
    return res.status(400).json({
      message : err,
    })
  }
}

async function httpdeleteAllData(req , res) {
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

 module.exports = {
   httpCreateNewTour,
   httpGetALLTours,
   httpUpdateTour,
   httpDeleteTour,
   httpdeleteAllData
 }
 const {
   PostNewTour,
   GetALLTours,
   findTour,
  UpdateTour
} = require('../../models/tours.model');


async function httpGetALLTours(req , res) {
  return res.status(200).json(await GetALLTours());
}

 async function httpPostNewTour (req , res) {
   try {
   const tour = req.body;
   await PostNewTour(tour);
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

 module.exports = {
   httpPostNewTour,
   httpGetALLTours,
   httpUpdateTour
 }
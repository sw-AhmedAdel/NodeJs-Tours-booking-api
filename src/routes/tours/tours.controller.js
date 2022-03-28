 const {
   PostNewTour,
   GetALLTours
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

 module.exports = {
   httpPostNewTour,
   httpGetALLTours
 }
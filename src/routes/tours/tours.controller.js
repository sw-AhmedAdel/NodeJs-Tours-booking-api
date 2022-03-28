 const {PostNewTour} = require('../../models/tours.model');

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
 }
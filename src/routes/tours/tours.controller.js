const {getAllTours} = require('../../models/tours.models');

function httpGetAllTours (req , res) {
  return res.status(200).json( {
    status: "success"
    ,
    data :{
    tours : getAllTours()
  }})
}

module.exports = {
  httpGetAllTours,
}
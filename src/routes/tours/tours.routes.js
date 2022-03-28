const express = require('express');
const toursRtoure = express.Router();
const {
  httpGetAllTours,
} = require('./tours.controller');

toursRtoure.get('/' , httpGetAllTours);

module.exports= toursRtoure;
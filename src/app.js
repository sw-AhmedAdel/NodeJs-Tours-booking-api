const express = require("express");
const app = express();
const api = require("./routes/api");
const appError = require('../src/services/class.err.middleware');
const {handlingErrorMiddleware} = require('../src/services/handling.error');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const limiter = rateLimit({
  max: 100 ,
  windowMs: 60 * 60 * 1000, // 1 hour
  message:'To many requests from this api/ please try again an hour'
})
app.use(limiter) // limit request
app.use(helmet()); // secure http headers
app.use(express.json());

// try to login using this email "email":{"$gt": ""}, it will work so we need to 
// data sanitization against nosql query injection  >  npm i express-mongo-sanitize
app.use(mongoSanitize());
//Imagine that an attacker would try to insert some malicious HTML code with some JavaScript code attached to it.

//If that would then later be injected into our HTML site, it could really create some damage then.

//Using this middleware, we prevent that basically by converting all these HTML symbols.
app.use(xss());
//using these to remove the dublicate query like  if i used sort twice like sort=price$sort=price
//here i will get error coz i get values form sort using split and it works on string but getting 2 sort
//this will put them in array so i get error coz split does not work in array so hpp to take the last sort
//and use whitelist to allows dublicate coz these are not use split 
app.use(hpp({
  whitelist:['difficulty','price','duration','maxGroupSize','ratingsQuantity','ratingsAverage']
}))
app.use("/v1", api);

app.all("*", (req, res , next) => {

  /* use it for test with out using the class appError
  const err = new Error(`can't find ${req.originalUrl} on this server`);
  err.status='fail';
  err.statusCode=404;
  next(err);*/
  
 next(new appError(`can't find ${req.originalUrl} on this server` ,404))
});

app.use(handlingErrorMiddleware);

/*
// Implementing a Global Error Handling Middleware
app.use((err , req , res , next) => {
  err.statusCode = err.statusCode || 500 ; // 500 > internal server error
  err.status = err.status || 'fail';

  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
  })
})*/

module.exports = app;



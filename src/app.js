const express = require("express");
const app = express();
const api = require("./routes/api");
const appError = require('../src/services/class.err.middleware');
const {handlingErrorMiddleware} = require('../src/services/handling.error');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100 ,
  windowMs: 60 * 60 * 1000, // 1 hour
  message:'To many requests from this api/ please try again an hour'
})
app.use(limiter)
app.use(express.json());
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

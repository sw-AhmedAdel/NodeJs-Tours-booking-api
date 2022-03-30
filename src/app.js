const express = require("express");
const app = express();
const api = require("./routes/api");
app.use(express.json());

app.use("/v1", api);


app.all("*", (req, res , next) => {

  const err = new Error(`can't find ${req.originalUrl} on this server`);
  err.status='fail';
  err.statusCode=404;
  next(err);
});

//  Implementing a Global Error Handling Middleware
app.use((err , req , res , next) => {
  err.statusCode = err.statusCode || 500 ; // 500 > internal server error
  err.status = err.status || 'fali';

  return res.status(err.statusCode).json({
    status : err.status,
    message : err.message,
  })
})

module.exports = app;

const express = require("express");
const app = express();
const api = require("./routes/api");
app.use(express.json());

app.use("/v1", api);
app.all("*", (req, res) => {
  return res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;

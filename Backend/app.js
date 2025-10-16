const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose')

const postsRoute = require('./routes/posts');
const userRoutes = require("./routes/user")

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/MEAN-STACK")
.then(() => {
    console.log("Connected To Database!");
})
.catch(() => {
    console.log("Connection Failed");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

 
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use("/api/posts", postsRoute);
app.use("/api/user", userRoutes);

module.exports = app;
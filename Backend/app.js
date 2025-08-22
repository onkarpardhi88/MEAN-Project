const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose')

const postsRoute = require('./routes/posts')

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

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Request-Wth, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use("/api/posts", postsRoute);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://pardhionkar88:Wy6B2PvrARBp2JSW@cluster0.7a52saz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts",(req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: "Post Added Successfully"
    });
})

app.get('/api/posts',(req,res,next) =>{
    const posts = [
        {
            id:"vgdgh22bhje3by",
            title: "First server-side Post",
            content: "This is coming from the server"
        },
        {
            id:"ebfhj6u4t3gu467",
            title: "Second server-side Post",
            content: "This is coming from the server!!"
        },
        {
            id:"vbhjb4ryg53ug",
            title: "Third server-side Post",
            content: "This is coming from the server!"
        }
    ];
    res.status(200).json({
        message: 'Post Fetched Successfully',
        posts:posts
    });
});

module.exports = app;
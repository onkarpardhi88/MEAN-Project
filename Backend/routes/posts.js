const express = require("express");
const Post = require('../models/post');
const multer = require("multer");
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post Added Successfully",
      post:{
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
    });
  });
});

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) => {
  if (req.file) {
    let imagePath = req.body.imagePath;
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath 
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: 'Update successful!'});
    })
})

router.get("", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuerry = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuerry
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuerry.find().then((documents) => {
    fetchedPosts = documents;
    return Post.countDocuments();
  }).then(count => {
    res.status(200).json({
      message: "Post Fetched Successfully",
      posts: fetchedPosts,
      maxPosts: count 
    });
  })
});
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(400).json({message: 'Post not Found!'});
        }
    })
})


router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = router;
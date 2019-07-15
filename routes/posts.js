const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('', (req, res) => {
    Post.find()
    .then(documents => {
        res.json({
            message:'Posts fetched Successfully.',
            posts:documents
        });
    });
    
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(documents => {
        res.json({
            message:'Posts fetched Successfully.',
            posts:documents
        });
    });
    
})


router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post added Successfully',
            postId: result._id
        });
    });
    
})

router.delete(':id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted Successfully.'
        })
    });
})

router.put(':id', (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post updated Successfully',
            postId: 0
        });
    });
    
})

module.exports = router;
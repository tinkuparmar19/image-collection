const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const requirelogin = require('../middleware/requirelogin')
const Post = mongoose.model('Post')

router.post('/upload', requirelogin, (req, res) => {
    const { title, pic } = req.body
    if (!title || !pic) {
        return res.status(400).json({ error: 'please add all the fields' })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        photo: pic,
        postedBy: req.user
    })
    post.save()
        .then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/mypost', requirelogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate('postedBy', '_id name')
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(e => {
            console.log(e)
        })
})

module.exports = router
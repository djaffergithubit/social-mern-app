const express = require('express')
const { createNewPost, getAllPosts, removePost, likeDislikePost } = require('../controllers/postControllers')
const isAuth = require('../middleware/isAuth')
const router = express.Router()

router.get('', isAuth, getAllPosts)
router.post('/create-post', isAuth, createNewPost)
router.post('/like-dislike-post', isAuth, likeDislikePost)
router.delete('/delete-post', isAuth, removePost)
    

module.exports = router
const { Post } = require("../models/posts")
const { Comment } = require("../models/comments")

const createNewPost = async (req, res) => {
    try {
        const { userId } = req.user
        const { content } = req.body

        const newPost = new Post({
            content,
            postOwner: userId,
            postImage: req.file ? req.file.filename : ''
        })

        await newPost.save()
        const sendPost =  await newPost.populate('postOwner', 'firstName lastName')

        return res.status(201).json({ 'message': 'new post created successfully', 'newPost': sendPost})

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('postOwner', 'firstName lastName userName picture')

        if (!posts) {
            return res.status(404).json({ 'message': 'No posts found' })
        }

        return res.status(201).json(posts)
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const removePost = async (req, res) => {
    try {
         const { postId } = req.body
         const postToDelete = await Post.findById(postId)

         if (!postToDelete) {
            return res.status(404).json({ 'message': 'Post not found' })
         }

         await Post.findByIdAndDelete(postId)
         await Comment.deleteMany({commentedPost: postId})
         
         return res.status(201).json({ 'message': 'Post deleted successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const likeDislikePost = async (req, res) => {
    try {
        const { userId } = req.user
        const { postId } = req.body
        const postFind = await Post.findById(postId)

        if (!postFind) {
            return res.status(404).json({ 'message': 'Post not found' })
        }

        if (postFind.likes.includes(userId)) {
            const newLikes = postFind.likes.filter(like => like.toString() !== userId.toString())
            postFind.likes = newLikes
            await postFind.save()

            return res.status(201).json({ 'message': 'Post disliked successfully' })
        }

        postFind.likes.push(userId)
        await postFind.save()

        return res.status(201).json({ 'message': 'Post liked successfully'})

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { createNewPost, getAllPosts, removePost, likeDislikePost }
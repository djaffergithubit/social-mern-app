const { Comment } = require("../models/comments")
const { Post } = require("../models/posts")

const addComment = async (req, res) => {
    try {
        const { userId } = req.user
        const { content, postId } = req.body
        const postFound = await Post.findById(postId)

        if (!postFound) {
            return res.status(404).json({ 'message': 'No post found' })
        }

        const newComment = new Comment({
            content,
            commentOwner: userId,
            commentedPost: postId
        })

        await newComment.save()
        return res.status(201).json({ 'message': 'new comment added' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()

        if (!comments) {
            return res.status(404).json({ 'message': 'No comments found' })
        }

        return res.status(200).json(comments)        
    } catch (error) {
        return res.status(500).json({ 'message': error.message })        
    }
}

module.exports = { addComment, getComments }
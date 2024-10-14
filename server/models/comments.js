const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    commentOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    commentedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},
{
    timestamps: true    
}
)

exports.Comment = mongoose.model('Comment', commentSchema)
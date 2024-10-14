const  {mongoose, Schema} = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required']
    },

    postOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'postOwner is required']
    },

    postImage: {
        type: String
    },

    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
},
{
    timestamps: true
}
)

exports.Post = mongoose.model('Post', postSchema)
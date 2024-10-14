const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
    },

    picture: {
        type: String
    },

    messageSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
})

exports.Message = mongoose.model('Message', messageSchema)
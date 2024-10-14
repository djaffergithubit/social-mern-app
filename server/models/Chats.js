const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    isGroupChat: {
        type: Boolean,
        required: true
    },

    participants: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },

    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    chatName: {
        type: String
    },

    lastMessage: {
        type: String
    }
})

exports.Chat = mongoose.model('Chat', chatSchema)
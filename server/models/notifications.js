const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    isMessageNotification:{
        type: Boolean,
        required: true
    },

    notificationSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
},
{
    timestamps: true
})

exports.Notification = mongoose.model('Notification', notificationSchema)
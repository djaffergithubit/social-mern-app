const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },

    lastName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },
    picture: {
        type: String,
    },

    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },

    followees: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
},{
    timestamps: true
})

exports.User = mongoose.model('User', userSchema)
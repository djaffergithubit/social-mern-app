const { Message } = require("../models/messages")

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('messageSender', 'userName picture')

        if (!messages) {
            return res.status(400).json({ 'message': 'no messages' })
        }

        return res.status(201).json(messages)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { getMessages }
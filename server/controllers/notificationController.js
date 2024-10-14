const { Notification } = require("../models/notifications")

const getNotifications = async (req, res) =>{
    try {
        const notifications = await Notification.find().populate('chat', 'participants')

        if (!notifications) {
            return res.status(400).json({ 'message': 'no notifications' })
        }

        return res.status(201).json(notifications)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { getNotifications }
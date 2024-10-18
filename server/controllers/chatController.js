const { Chat } = require("../models/Chats")
const { Message } = require("../models/messages")

const addNewChat = async (req, res) => {
    try {
        const { userId } = req.user
        const { isGroupChat, participants, chatName } = req.body
        const chatFind = await Chat.findOne({ participants: [...participants, userId] || [userId, ...participants]  })

        if (chatFind) {
            return res.status(400).json({ 'message': 'chat already exist' })
        }

        if (isGroupChat) {
            const newGroupChat = new Chat({
                isGroupChat,
                participants: [...participants, userId],
                groupAdmin: userId,
                chatName
            })

            await newGroupChat.save()
            return res.status(201).json({ 'message': 'new group chat has been created' })
        }

        const newChat = new Chat({
            isGroupChat,
            participants: [...participants, userId],
            chatName
        })

        await newChat.save()
        return res.status(201).json({ 'message': 'new chat has been created' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find().populate('participants', 'firstName lastName userName picture')

        if (!chats) {
            return res.status(404).json({ 'message': 'no chats found' })
        }

        return res.status(201).json(chats)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const removeChatController = async (req, res) => {
    try {
        const { chatId } = req.params
        const chatMessages = await Message.find({ chat: chatId })
        await Chat.findByIdAndDelete(chatId)
        
        if (chatMessages) {
            chatMessages.forEach( async (msg) => {
                await Message.findByIdAndDelete(msg._id)
            })

            return res.status(201).json({ 'message': 'chat deleted successfully' })
        }else{
            return res.status(201).json({ 'message': 'chat deleted successfully' })
        }

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const blockChat = async(req, res) => {
    try {
        const { userId } = req.user
        const { chat } = req.body
        const chatFind = await Chat.findById(chat)

        if (!chatFind) {
            return res.status(404).json({ 'message': 'No chat found' })
        }

        else if (chatFind.participants.includes(userId)) {
            chatFind.blocked = !chatFind.blocked
            await chatFind.save()

            return res.status(201).json({ 'message': 'chat blocked/deblocked successfully' })
        }else{
            return res.status(400).json({ 'message': 'user cannot block this chat' })
        }

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { 
    addNewChat, 
    getChats, 
    removeChatController,
    blockChat
}
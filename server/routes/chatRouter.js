const express = require('express')
const isAuth = require('../middleware/isAuth')
const { addNewChat, getChats, removeChatController } = require('../controllers/chatController')
const router = express.Router()

router.post('/add-chat', isAuth, addNewChat)
router.delete('/remove-chat/:chatId', isAuth, removeChatController)
router.get('', isAuth, getChats)

module.exports = router
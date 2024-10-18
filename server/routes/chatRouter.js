const express = require('express')
const isAuth = require('../middleware/isAuth')
const { addNewChat, getChats, removeChatController, blockChat } = require('../controllers/chatController')
const router = express.Router()

router.post('/add-chat', isAuth, addNewChat)
router.delete('/remove-chat/:chatId', isAuth, removeChatController)
router.post('/block-chat', isAuth, blockChat)
router.get('', isAuth, getChats)

module.exports = router
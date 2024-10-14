const express = require('express')
const isAuth = require('../middleware/isAuth')
const { getMessages } = require('../controllers/messageController')
const router = express.Router()

router.get('', isAuth, getMessages)

module.exports = router
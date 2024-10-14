const express = require('express')
const isAuth = require('../middleware/isAuth')
const { getNotifications } = require('../controllers/notificationController')
const router = express.Router()

router.get('', isAuth, getNotifications)

module.exports = router
const express = require('express')
const isAuth = require('../middleware/isAuth')
const { addComment, getComments } = require('../controllers/commentController')
const router = express.Router()

router.post('/add-comment', isAuth, addComment)
router.get('', isAuth, getComments)

module.exports = router
const { 
    registerUser, 
    getAllUsers, 
    userAuth, 
    userLogout, 
    getCurrentUser, 
    updateUserProfile, 
    addRemoveFollower
} = require("../controllers/userControllers")
const express = require('express')
const isAuth = require("../middleware/isAuth")
const router = express.Router()

router.get('', getAllUsers)
router.get('/current-user',isAuth, getCurrentUser)
router.get('/logout', userLogout)
// router.post('/add-follower', isAuth, addFollower)
// router.post('/remove-follower',isAuth,  unFollowUser)
router.post('/add-remove-follower', isAuth, addRemoveFollower)
router.post('/user/edit-profile', isAuth, updateUserProfile )
router.post('/register', registerUser)
router.post('/login', userAuth)

module.exports = router
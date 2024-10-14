const { User } = require("../models/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Chat } = require("../models/Chats")

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password} = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ 'message': 'User already exists' })
        }

        const gelt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password, gelt)

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            picture: req.file ? req.file.filename : ''
        })

        await newUser.save()
        return res.status(201).json({ 'message': 'User created successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const userAuth = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ 'message': 'Invalid credentials' })
        }

        const verifyMatch = await bcrypt.compare(password, userExist.password)

        if (!verifyMatch) {
            return res.status(400).json({ 'message': 'Invalid credentials'})
        }

        const token = await jwt.sign({ userId: userExist._id }, process.env.SECRET_TOKEN, { expiresIn: '1h' })
        res.cookie('token', token , {
            httpOnly: true,
            secure: true
        })
        return res.status(200).json({ 'token': token, 'message': 'User logged in successfully', 'user': userExist })
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }

}

const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.user
        const { firstName, lastName, userName, description, email } = req.body
        const currentUser = await User.findById(userId)

        if (!currentUser) {
            return res.status(400).json('User not found')
        }

        currentUser.firstName = firstName
        currentUser.lastName = lastName
        currentUser.userName = userName
        currentUser.description = description
        currentUser.email = email
        currentUser.picture = req.file ? req.file.filename : currentUser.picture

        await currentUser.save()
        return res.status(201).json({ 'message': 'User updated successfully', 'updatedUser': currentUser })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const userLogout = (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ 'message': 'User logged out successfully' })
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()   
        if (users.length === 0) {
            return res.status(404).json({ 'message': 'No users found' })
        }

        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.user
        const currentUser = await User.findById(userId)

        if (!currentUser) {
            return res.status(404).json({ 'message': 'User not found' })
        }

        return res.status(201).json({'user': currentUser, message: 'User found'})

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const addRemoveFollower = async(req, res) => {
    try {
        const { userId } = req.user
        const { email } = req.body
        const userWithId = await User.findById(userId)
        const userWithEmail = await User.findOne({email})

        if(!userWithId || !userWithEmail){
            return res.status(404).json({ 'message': 'user not found' })
        }

        if (!userWithId.followees.includes(userWithEmail._id)) {
            userWithId.followees = [...userWithId.followees, userWithEmail._id]
            userWithEmail.followers = [...userWithEmail.followers, userWithId._id]
            await userWithId.save()
            await userWithEmail.save()
            return res.status(201).json({ 'message': 'follower added', 'user': userWithId, follow: true })
        }else{
            const newFollowees = userWithId.followees.filter(follower => follower.toString() !== userWithEmail._id.toString())
            const newFollowers = userWithEmail.followers.filter(follower => follower.toString() !== userWithId._id.toString())
            userWithEmail.followers = [...newFollowers]
            userWithId.followees = [...newFollowees]
            await userWithId.save()
            await userWithEmail.save()
            return res.status(201).json({ 'message': 'follower removed', 'user': userWithId, follow: false }) 
        }
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = 
{ 
    registerUser, 
    userAuth, 
    updateUserProfile, 
    userLogout, 
    getAllUsers, 
    getCurrentUser, 
    addRemoveFollower, 
} 
const User = require('../models/User')
const Note = require('../models/Note')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access private

const getAllUsers = asyncHandler(async (req, res) => {

// Get all users from MongoDB
const users = await User.find().select('-password').lean()

// If no users 
if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
}

res.json(users)

})

// @desc Create a user
// @route POST /users
// @access private

const createNewUser = asyncHandler(async (req, res) => {

    const { name, email, username, password, roles } = req.body

    //confirm data

    if(!name || !email || !username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    //check for duplicates

    const duplicateUserName = await User.findOne({username}).lean().exec()
    const duplicateUserEmail = await User.findOne({email}).lean().exec()
    
    if(duplicateUserName) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    if(duplicateUserEmail) {
        return res.status(409).json({ message: 'Duplicate user email' })
    }

     // Hash password 
     const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

     const userObject = { name, email, username, "password": hashedPwd, roles }
 
     // Create and store new user 
     const user = await User.create(userObject)
 
     if (user) { //created 
         res.status(201).json({ message: `New user ${username} created` })
     } else {
         res.status(400).json({ message: 'Invalid user data received' })
     }

})

// @desc Update a user
// @route PUT /users
// @access private

const updateUser = asyncHandler(async (req, res) => {

    const { id, name, email, username, password, roles, active } = req.body

    //confirm data

    // Confirm data 
    if (!id || !name || !email || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Check for the exact user
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.name = name
    user.email = email
    user.username = username
    user.roles = roles
    user.active = active
    
    if(password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access private

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)  

})

module.exports = {getAllUsers, createNewUser, updateUser, deleteUser}


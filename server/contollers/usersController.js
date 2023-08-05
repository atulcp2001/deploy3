const User = require('../models/User')
const Note = require('../models/Note')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const generateVerifyToken = require('../utils/generateVerifyToken')
const sendVerificationEmail = require('../utils/sendVerificationEmail')
const clientUrl = `${process.env.CLIENT_URL}` || 'http://localhost:3000/login'
// const clientUrl = 'https://deploy3-mu24.onrender.com'

// @desc Verify a user
// @route GET /users/verify/:verificationToken
// @access public - from an email link

const verifyCreatedUser = asyncHandler(async (req, res) => {

    // Extract verification token from the request
    const { verificationToken } = req.params

    // Check for the exact user
    const user = await User.findOne({ verificationToken }).exec()

    // If the user with the token is not found
    if (!user) {
        return res.status(400).json({ message: 'User not found. Incorrect Token' })
    }

    // If User with verificationToken is found then update user's account as verified
    user.isVerified = true;
    user.verificationToken = null; // Reset the verification token
    const verifiedUser = await user.save();

    if(verifiedUser) {
        const delayInSeconds = 5;
    return res.send(`
      <html>
        <head>
          <script>
          setTimeout(function() {
            window.location.href = "${clientUrl}";
          }, ${delayInSeconds * 1000}); // Convert seconds to milliseconds
          </script>
        </head>
        <body>
          <p>Verification successful. Redirecting...</p>
        </body>
      </html>
    `)
    }
})


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

// @desc Register a user
// @route POST /users
// @access public

const registerNewUser = asyncHandler(async (req, res) => {

    const { name, email, username, password } = req.body

    //confirm data

    if(!name || !email || !username || !password) {
        return res.status(400).json({message: 'Name, Email, Username and password are required'})
    }

    //check for duplicates

    const duplicateUserName = await User.findOne({username}).collation({ locale: 'en', strength: 2 }).lean().exec()
    const duplicateUserEmail = await User.findOne({email}).lean().exec()
    
    if(duplicateUserName) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    if(duplicateUserEmail) {
        return res.status(409).json({ message: 'Duplicate user email' })
    }

     // Hash password 
     const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

     // Verification Token
     const verificationToken = generateVerifyToken()

     const userObject = { name, email, username, "password": hashedPwd, verificationToken }                     
     
    // Create and store new user 
     const user = await User.create(userObject)
 
     if (user) { //created 
        sendVerificationEmail(user.email, user.verificationToken)
         res.status(201).json({ message: `New user ${username} created` })
     } else {
         res.status(400).json({ message: 'Invalid user data received' })
     }

})

// @desc Create a user
// @route POST /users
// @access private

const createNewUser = asyncHandler(async (req, res) => {

    const { name, email, username, password, roles } = req.body

    //confirm data

    if(!name || !email || !username || !password) {
        return res.status(400).json({message: 'Name, Email, Username and password are required'})
    }

    //check for duplicates

    const duplicateUserName = await User.findOne({username}).collation({ locale: 'en', strength: 2 }).lean().exec()
    const duplicateUserEmail = await User.findOne({email}).lean().exec()
    
    if(duplicateUserName) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    if(duplicateUserEmail) {
        return res.status(409).json({ message: 'Duplicate user email' })
    }

     // Hash password 
     const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

     // Verification Token
     const verificationToken = generateVerifyToken()

     const userObject = (!Array.isArray(roles) || !roles.length)
                        ? { name, email, username, "password": hashedPwd, verificationToken }
                        : { name, email, username, "password": hashedPwd, roles, verificationToken }    
     
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
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

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

module.exports = {verifyCreatedUser, getAllUsers, registerNewUser, createNewUser, updateUser, deleteUser}


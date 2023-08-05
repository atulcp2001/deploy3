const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc login 
// @route POST /auth
// @access Public

const login = asyncHandler(async (req, res) => {

    // extract the username and password from the request body
    const { username, password } = req.body

    //check for missing data in the request body 
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //find the matching user in the database - username field
    const foundUser = await User.findOne({ username }).exec()

    //if a matching user is not found or if the matching user is not active
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized. Ask your admin' })
    }

    //check for the right password for the found and active user
    const match = await bcrypt.compare(password, foundUser.password)

    //if password does not match with the password in the database
    if (!match) return res.status(401).json({ message: 'Unauthorized credentials' })

    //if the passwords match then create the access and refresh tokens
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
        // { expiresIn: '15s' } //for testing
        
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
        // { expiresIn: '30s' } //for testing
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })

})

// @desc refresh 
// @route GET /auth/refresh
// @access Public - when access token is expired

const refresh =  (req, res) => {
    
    //extract the cookie containing the refresh token from the client side request
    const cookies = req.cookies

    //if the cookie is not present or not signed jwt
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    //extract the refresh token from the cookie
    const refreshToken = cookies.jwt

    //verify the refresh token by using the refresh token secret and then generate a new access token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
                // { expiresIn: '15s' } //for testing
            )

            res.json({ accessToken })
        })
    )

}

// @desc logout 
// @route POST /auth/logout
// @access Public - to clear cookie

const logout = (req, res) => {
    //extract the cookie containing the refresh token from the client side request
    const cookies = req.cookies
    
    //if no cookie found or not the right one
    if (!cookies?.jwt) return res.sendStatus(204) //No content

    //if the right cookie is found, then clear the cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })


}

module.exports = { login, refresh, logout }
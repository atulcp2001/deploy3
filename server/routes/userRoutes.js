const express = require('express')
const router = express.Router();
const usersController = require('../contollers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT) // commenting this to creata a registerNewUser endpoint

router.route('/')
    .get(verifyJWT,usersController.getAllUsers)
    .post(usersController.registerNewUser)
    .post(verifyJWT,usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyJWT,usersController.deleteUser)

router.route('/verify/:verificationToken')
    .get(usersController.verifyCreatedUser)

module.exports = router

// 03 Aug 2023 - Add Register New User Logic to the controller. This should be a public route
// 04 Aug 2023 - Added Verification Route

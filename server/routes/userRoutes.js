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

router.route('/forgot-password')
    .post(usersController.verifyUserForPwdReset)

router.route('/reset/:resetToken')
    .get(usersController.verifyResetToken)

router.route('/reset')
    .post(usersController.resetUserPwd)

module.exports = router

// 03 Aug 2023 - Add Register New User Logic to the controller. This should be a public route
// 04 Aug 2023 - Added Verification Route
// 07 Aug 2023 - Added Reset Token Generation Route (forgot-password)
// 08 Aug 2023 - Added Route to verify the resetToken when the link in email is clicked

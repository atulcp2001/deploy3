const express = require('express')
const router = express.Router();
const note1Controller = require('../contollers/note1Controller')

router.route('/')
    .get(note1Controller.getAllNotes1)
    .post(note1Controller.createNewNote1)

module.exports = router
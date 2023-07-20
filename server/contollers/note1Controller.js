const Note1 = require('../models/Note1')
const asyncHandler = require('express-async-handler')

// @desc Get all notes1
// @route GET /notes1
// @access private

const getAllNotes1 = asyncHandler( async (req,res) => {
    const notes1 = await Note1.find().lean().exec()

    // If no notes 
    if (!notes1?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }
     res.json(notes1)
})

// @desc Create new note
// @route POST /notes1
// @access private

const createNewNote1 = asyncHandler( async (req,res) => {
    
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const note1 = await Note1.create({ user, title, text })

    if (note1) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }
})

module.exports = {
    getAllNotes1,
    createNewNote1
}


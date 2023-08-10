const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all notes
// @route GET /notes
// @access private

const getAllNotes = asyncHandler(async (req,res) => {
    // Get all notes from MongoDB
    const notes = await Note.find().lean()

    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }
    
    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        const username = user ? user.username : "Unknown User"; // Handle null user
        // return { ...note, username: user.username }
        return { ...note, username }
    }))

    res.json(notesWithUser)
    
})

// @desc Create a note
// @route POST /notes
// @access private

const createNewNote = asyncHandler(async (req,res) => {

    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if the provided user exists in the User model
  const existingUser = await User.findById(user);
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user,title, text })

//    // Retrieve the generated ticket and increment count
//   const { ticket, ticketNums } = await Note.findById(note._id).select('ticket ticketNums');

//   if (ticket && ticketNums) {
//     console.log(`Ticket value: ${ticket}`);
//     console.log(`Increment count: ${ticketNums}`);

//     return res.status(201).json({ message: 'New note created' });
//   } else {
//     return res.status(400).json({ message: 'Invalid note data received' });
//   }

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

// @desc Update a note
// @route PATCH /notes
// @access private

const updateNote = asyncHandler(async (req,res) => {

    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if the provided user exists in the User model
  const existingUser = await User.findById(user);
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' });
  }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)

})

// @desc Delete a note
// @route DELETE /notes
// @access private

const deleteNote = asyncHandler(async (req,res) => {

    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)

})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}

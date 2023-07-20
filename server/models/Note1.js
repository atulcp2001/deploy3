const mongoose = require('mongoose')
const User = require('../models/User')

const note1Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
},
{timestamps: true}
)

const Note1 = mongoose.model('Note1', note1Schema)

module.exports = Note1
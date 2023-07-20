const mongoose = require('mongoose')
const User = require('../models/User')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
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
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
)

// Define virtual fields for ticket and ticketNums
noteSchema.virtual('ticketValue').get(function () {
    return this.ticket;
  });
  
  noteSchema.virtual('incrementCount').get(function () {
    return this.ticketNums;
  });

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500,
    disable_hooks: {updatedAt: true},
})

module.exports = mongoose.model('Note', noteSchema)
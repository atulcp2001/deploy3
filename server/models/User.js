// server/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
      },
      resetPasswordToken: {
        type: String,
      },
      resetPasswordExpires: {
        type: Date,
      },
      roles: {
        type: [String],
        default: ["Guest"]
      },
      active: {
        type: Boolean,
        default: true
      }
    },
    { timestamps: true }
  );

const User = mongoose.model('User', userSchema);

module.exports = User;

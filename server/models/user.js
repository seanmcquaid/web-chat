const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTyping: {
    type: Boolean,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  friends: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = User;
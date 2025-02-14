const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 }, // XP field for leaderboard
  role: { type: String, default: 'user' }, // Role: 'user' or 'admin'
});

module.exports = mongoose.model('User', userSchema);

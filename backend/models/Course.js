const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  youtubeUrl: { type: String, required: false }, // YouTube video URL for the course
});

module.exports = mongoose.model('Course', courseSchema);

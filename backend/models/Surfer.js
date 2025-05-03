// backend/models/Surfer.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId:   { type: String, required: true }, // YouTube video ID
  title:     String,                           // Video title
  description: String,                         // Short description
});

const surferSchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  bio:      String,   // Summarized bio text
  insta:    String,   // e.g. https://instagram.com/…
  wikiLink: String,   // e.g. https://en.wikipedia.org/…
  videos:   [videoSchema],  // Array of up to 4 video picks
}, {
  timestamps: true,  // optional: adds createdAt/updatedAt
});

module.exports = mongoose.model('Surfer', surferSchema);

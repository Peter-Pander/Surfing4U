// scripts/cleanupSurfers.js
require('dotenv').config();
const mongoose = require('mongoose');
const Surfer   = require('../models/Surfer');
const valid    = require('../data/surfers.json'); // approved array of names

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const { deletedCount } = await Surfer.deleteMany({
    name: { $nin: valid }
  });
  console.log(`✅ Deleted ${deletedCount} invalid surfer${deletedCount === 1 ? '' : 's'}.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌ Cleanup failed:', err);
  process.exit(1);
});

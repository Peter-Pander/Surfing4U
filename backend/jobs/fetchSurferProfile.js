// backend/jobs/fetchSurferProfile.js

const Surfer = require('../models/Surfer');
const { getWikiBio, getTop4Videos } = require('./services');

async function fetchSurferProfile(name) {
  try {
    // 1. Fetch or summarize Wikipedia bio (and get a wikiLink)
    const { bio, wikiLink } = await getWikiBio(name);

    // 2. Build an Instagram URL as a simple fallback
    const instaHandle = name.replace(/\s+/g, '').toLowerCase();
    const insta = `https://instagram.com/${instaHandle}`;

    // 3. Fetch & pick top 4 career videos
    const videos = await getTop4Videos(name);

    // 4. Upsert into MongoDB
    await Surfer.findOneAndUpdate(
      { name },
      { name, bio, wikiLink, insta, videos },
      { upsert: true, new: true }
    );

    console.log(`✅ Upserted surfer profile for ${name}`);
  } catch (err) {
    console.error(`❌ Error fetching profile for ${name}:`, err);
  }
}

module.exports = fetchSurferProfile;

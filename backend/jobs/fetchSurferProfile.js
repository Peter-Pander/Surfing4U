const Surfer = require('../models/Surfer')
const { getWikiBio, getTop4Videos } = require('./services')

/**
 * Fetches and upserts a surfer’s profile data.
 * @param {string} name – Surfer’s full name.
 * @param {object} [opts]
 * @param {boolean} [opts.force=false] – If true, always re-fetch even if data exists.
 */
async function fetchSurferProfile(name, { force = false } = {}) {
  try {
    // 0. If not forcing, skip any surfer who already has bio + videos in DB
    if (!force) {
      const existing = await Surfer.findOne({ name }).lean()
      if (existing && existing.bio && Array.isArray(existing.videos) && existing.videos.length > 0) {
        console.log(`⏭️ Skipping ${name}, already fetched`)
        return
      }
    }

    // 1. Get Wikipedia bio + wikiLink
    const { bio, wikiLink } = await getWikiBio(name)

    // 2. Build fallback Instagram URL
    const instaHandle = name.replace(/\s+/g, '').toLowerCase()
    const insta = `https://instagram.com/${instaHandle}`

    // 3. Try to fetch top 4 YouTube videos; on error, log but continue
    let videos = []
    try {
      videos = await getTop4Videos(name)
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.error(`❌ YouTube API Forbidden for ${name}; check your key/quota`)
      } else {
        console.error(`❌ Error fetching videos for ${name}:`, err.message || err)
      }
      // leave videos as [] so we still upsert the rest of the profile
    }

    // 4. Upsert into MongoDB
    await Surfer.findOneAndUpdate(
      { name },
      { name, bio, wikiLink, insta, videos },
      { upsert: true, new: true }
    )

    console.log(`✅ Upserted surfer profile for ${name}`)
  } catch (err) {
    console.error(`❌ Error fetching profile for ${name}:`, err.message || err)
  }
}

module.exports = fetchSurferProfile

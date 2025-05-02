// backend/jobs/services.js

// You’ll need axios (or node-fetch), your OpenAI client, and the YouTube API client
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const OpenAI = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
// And set up your YouTube API client however you prefer…

/**
 * Try to get a 2-sentence bio + a wiki link.
 * 1) Attempt Wikipedia REST API summary
 * 2) If not found, ask OpenAI to summarize from public sources
 */
async function getWikiBio(name) {
  // TODO: implement Wikipedia API fetch:
  // const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
  // if (wikiRes.status === 200) { return { bio: wikiRes.data.extract, wikiLink: wikiRes.data.content_urls.desktop.page }; }
  // else, fallback to OpenAI:
  // const prompt = `Write a 2-sentence professional bio for professional surfer ${name}, and include a Wikipedia link if known.`;
  // const aiRes = await OpenAI.createCompletion({ /* … */ });
  // parse aiRes to get bio + wikiLink
  throw new Error('getWikiBio not implemented');
}

/**
 * Fetches ~8–10 surf videos on YouTube, then uses OpenAI to rank and pick the top 4.
 * Returns an array of { videoId, title, description }.
 */
async function getTop4Videos(name) {
  // TODO:
  // 1) Use YouTube Search API to fetch videos matching `${name} best surf moments`
  // 2) Use YouTube Videos API to get full descriptions
  // 3) Call OpenAI: “Here are these 10 videos (titles+descriptions). Rank the top 4 most iconic career highlights for surfer ${name}.”
  // 4) Return the chosen 4 as JS objects
  throw new Error('getTop4Videos not implemented');
}

module.exports = { getWikiBio, getTop4Videos };

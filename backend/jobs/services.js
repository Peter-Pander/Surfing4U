// backend/jobs/services.js

const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

// initialize OpenAI
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// helper to call Wikipedia’s summary endpoint
async function getWikiBio(name) {
  const title = encodeURIComponent(name);
  const url   = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;

  // 1) Try Wikipedia REST API
  try {
    const wikiRes = await axios.get(url);
    if (wikiRes.data.extract) {
      return {
        bio:      wikiRes.data.extract,
        wikiLink: wikiRes.data.content_urls.desktop.page
      };
    }
  } catch (err) {
    // page not found or other error: fall through to OpenAI
  }

  // 2) Fallback: ask OpenAI for a 2-sentence bio (including link if known)
  const prompt = `
Write a JSON object with keys "bio" and "wikiLink".
"bio" should be a concise, two-sentence professional bio for surfer ${name}.
If you know their Wikipedia URL, put it in "wikiLink"; otherwise set "wikiLink" to an empty string.
`;

  const chat = await openai.createChatCompletion({
    model:       'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens:  200,
    messages: [
      { role: 'system',  content: 'You are a helpful assistant that formats biographies as JSON.' },
      { role: 'user',    content: prompt.trim() }
    ]
  });

  const text = chat.data.choices[0].message.content.trim();
  try {
    const parsed = JSON.parse(text);
    return {
      bio:      parsed.bio,
      wikiLink: parsed.wikiLink || ''
    };
  } catch (err) {
    // if parsing fails, just return the raw text as bio
    return { bio: text, wikiLink: '' };
  }
}

// helper to fetch & pick the top 4 YouTube videos for a surfer
async function getTop4Videos(name) {
  const YT_KEY = process.env.YOUTUBE_API_KEY;
  // 1) Search for up to 10 “best surf moments”
  const searchRes = await axios.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      params: {
        key:        YT_KEY,
        part:       'snippet',
        q:          `${name} best surf moments`,
        type:       'video',
        maxResults: 10
      }
    }
  );

  const ids = searchRes.data.items.map(i => i.id.videoId).join(',');

  // 2) Fetch full snippet (incl. description)
  const videosRes = await axios.get(
    'https://www.googleapis.com/youtube/v3/videos',
    {
      params: {
        key:  YT_KEY,
        part: 'snippet',
        id:   ids
      }
    }
  );

  const candidates = videosRes.data.items.map(item => ({
    videoId:     item.id,
    title:       item.snippet.title,
    description: item.snippet.description
  }));

  // 3) Ask OpenAI to rank and pick the top 4
  const prompt = `
Here is an array of 10 videos for surfer ${name} (with videoId, title, description).
Select the 4 most iconic career-highlight clips and return them as a JSON array of objects
with the same keys. Do not include any other keys.
${JSON.stringify(candidates, null, 2)}
`;

  const chat = await openai.createChatCompletion({
    model:       'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens:  500,
    messages: [
      { role: 'system',  content: 'You are an expert surf historian selecting the best clips.' },
      { role: 'user',    content: prompt.trim() }
    ]
  });

  const text = chat.data.choices[0].message.content.trim();
  try {
    const picked = JSON.parse(text);
    if (Array.isArray(picked) && picked.length > 0) {
      return picked;
    }
  } catch (err) {
    // fall through to default
  }

  // 4) Fallback: just return the first 4 candidates
  return candidates.slice(0, 4);
}

module.exports = { getWikiBio, getTop4Videos };

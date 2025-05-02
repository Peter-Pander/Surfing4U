// backend/contestVideoJob.js
const axios  = require("axios");
const fs     = require("fs");
const path   = require("path");
const cron   = require("node-cron");
const OpenAI = require("openai");

const openai      = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const youtubeKey  = process.env.YOUTUBE_API_KEY;

// Use dynamic year label instead of scraping or hard-coding
const currentYear   = new Date().getFullYear();
const contestName   = `WSL ${currentYear}`;   // e.g. "WSL 2025"
const threeWeeksAgo = new Date(Date.now() - 21*24*60*60*1000).toISOString();

// 1️⃣ Fetch recent YouTube videos for this season’s highlights
async function fetchContestVideos() {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part:           "snippet",
      q:              `${contestName} highlight`,
      maxResults:     8,
      order:          "date",            // freshest first
      publishedAfter: threeWeeksAgo,     // only recent
      type:           "video",
      videoDuration:  "short",
      relevanceLanguage: "en",
      regionCode:     "US",
      key:            youtubeKey,
    },
  });

  return res.data.items.map(item => ({
    id:          item.id.videoId,
    title:       item.snippet.title,
    description: item.snippet.description,
    url:         `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

// 2️⃣ Let AI pick the very best clip
async function pickWithAI(videos) {
  const prompt = videos
    .map((v,i) => `${i+1}. "${v.title}" — ${v.description.slice(0,80)}...`)
    .join("\n");
  const chatRes = await openai.chat.completions.create({
    model:       "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a surf expert. Pick the clip most likely to show an epic wave-riding highlight." },
      { role: "user",   content: `Here are several videos for ${contestName}:\n\n${prompt}\n\nReply with the NUMBER only.` }
    ],
    temperature: 0.7,
    max_tokens: 4,
  });
  const choice = parseInt(chatRes.choices[0].message.content.trim(), 10);
  return videos[(choice>0 && choice<=videos.length) ? choice-1 : 0];
}

// 3️⃣ Run the job: fetch, pick, save
async function runContestJob() {
  try {
    const videos = await fetchContestVideos();
    if (!videos.length) throw new Error("No recent highlights found for " + contestName);

    const pick = await pickWithAI(videos);
    fs.writeFileSync(
      path.join(__dirname, "contestHighlight.json"),
      JSON.stringify({ contestName, ...pick }, null, 2)
    );
    console.log("✅ Contest highlight saved:", pick.title);
  } catch (err) {
    console.error("❌ Contest job error:", err.message);
  }
}

// Schedule at 6:05 AM every day
cron.schedule("5 6 * * *", runContestJob);

module.exports = { runContestJob };

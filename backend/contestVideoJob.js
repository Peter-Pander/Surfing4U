// backend/contestVideoJob.js
const axios  = require("axios");
const fs     = require("fs");
const path   = require("path");
const cron   = require("node-cron");
const { Configuration, OpenAIApi } = require("openai");

const youtubeKey = process.env.YOUTUBE_API_KEY;
const openai     = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// 1️⃣ Ask AI for the latest contest name
async function fetchLatestContest() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content:
          "You are a surf expert with up-to-date knowledge of professional surf contests." },
      { role: "user", content:
          `As of ${today}, what is the most recent major professional surf contest that took place? Reply with the contest name only.` }
    ],
    temperature: 0.0,
    max_tokens: 12,
  });

  return res.choices[0].message.content.trim();
}

// 2️⃣ Search YouTube for that contest’s highlights
async function fetchContestVideos(contestName) {
  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${contestName} surf contest highlight`,
        maxResults: 8,
        order: "viewCount",
        type: "video",
        videoDuration: "short",
        relevanceLanguage: "en",
        regionCode: "US",
        key: youtubeKey,
      }
    }
  );

  return res.data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    url: `https://www.youtube.com/embed/${item.id.videoId}`
  }));
}

// 3️⃣ Let AI pick the single best clip
async function pickWithAI(videos) {
  const lines = videos.map((v,i)=>
    `${i+1}. "${v.title}" — ${v.description.slice(0,80)}...`
  ).join("\n");

  const chatRes = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content:
          "You are a surf expert. Choose the one clip most likely to show an exciting wave-riding highlight." },
      { role: "user", content:
          `Here are several videos:\n\n${lines}\n\nReply with the NUMBER only.` }
    ],
    temperature: 0.7,
    max_tokens: 4,
  });

  const choice = parseInt(chatRes.choices[0].message.content.trim(), 10);
  const idx = choice > 0 && choice <= videos.length ? choice-1 : 0;
  return videos[idx];
}

// 4️⃣ Orchestrate it all
async function runContestJob() {
  try {
    const contestName = await fetchLatestContest();
    console.log("🏆 Latest contest:", contestName);

    const videos = await fetchContestVideos(contestName);
    if (!videos.length) throw new Error("No videos for " + contestName);

    const pick = await pickWithAI(videos);
    const out = { contestName, ...pick };

    fs.writeFileSync(
      path.join(__dirname, "contestHighlight.json"),
      JSON.stringify(out, null, 2)
    );
    console.log("✅ Contest highlight saved:", pick.title);
  } catch (err) {
    console.error("❌ Contest job error:", err);
  }
}

// Schedule at 6:05 AM local every day
cron.schedule("5 6 * * *", runContestJob);

module.exports = { runContestJob };

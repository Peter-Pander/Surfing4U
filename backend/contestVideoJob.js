// backend/contestVideoJob.js
const axios  = require("axios");
const fs     = require("fs");
const path   = require("path");
const cron   = require("node-cron");
const OpenAI = require("openai");

// Instantiate the OpenAI client directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const youtubeKey = process.env.YOUTUBE_API_KEY;

// Default contest if AI can’t answer
const DEFAULT_CONTEST = "Pipeline Masters";

// 1️⃣ Ask AI for the latest contest name, with fallback
async function fetchLatestContest() {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a surf expert with up-to-date knowledge of professional surf contests."
        },
        {
          role: "user",
          content: `As of ${today}, what is the most recent major professional surf contest that took place? Reply with the contest name only.`
        }
      ],
      temperature: 0.0,
      max_tokens: 12,
    });

    const name = res.choices[0].message.content.trim();
    // If the model refuses or returns generic apology, fallback:
    if (/sorry|cannot|apolog/i.test(name) || name.length > 30) {
      console.warn(`⚠️ AI refusal detected ("${name}"), falling back to default contest.`);
      return DEFAULT_CONTEST;
    }
    return name;
  } catch (err) {
    console.warn("⚠️ Error fetching latest contest from AI, falling back:", err.message);
    return DEFAULT_CONTEST;
  }
}

// 2️⃣ Search YouTube for that contest’s highlights
async function fetchContestVideos(contestName) {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
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
    },
  });

  return res.data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    url: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

// 3️⃣ Let AI pick the single best clip
async function pickWithAI(videos) {
  const lines = videos
    .map((v, i) => `${i + 1}. "${v.title}" — ${v.description.slice(0, 80)}...`)
    .join("\n");

  const chatRes = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a surf expert. Choose the one clip most likely to show an exciting wave-riding highlight."
      },
      {
        role: "user",
        content: `Here are several videos:\n\n${lines}\n\nReply with the NUMBER only.`
      }
    ],
    temperature: 0.7,
    max_tokens: 4,
  });

  const choice = parseInt(chatRes.choices[0].message.content.trim(), 10);
  const idx = choice > 0 && choice <= videos.length ? choice - 1 : 0;
  return videos[idx];
}

// 4️⃣ Orchestrate it all
async function runContestJob() {
  try {
    const contestName = await fetchLatestContest();
    console.log("🏆 Using contest:", contestName);

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

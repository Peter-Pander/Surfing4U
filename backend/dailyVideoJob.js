// backend/dailyVideoJob.js
const axios  = require("axios");
const fs     = require("fs");
const path   = require("path");
const cron   = require("node-cron");
const OpenAI = require("openai");

const youtubeKey = process.env.YOUTUBE_API_KEY;
const openai     = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchSurfVideos() {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  // Primary: popular, recent clips
  const primaryRes = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: "surfing barrel OR wave ride OR drop in OR surf line OR surf highlight OR surf edit",
        maxResults: 10,               // 🔥 larger pool
        order: "viewCount",
        publishedAfter: threeDaysAgo,
        type: "video",
        videoDuration: "any",         // 🔥 allow up to 4 minutes
        relevanceLanguage: "en",
        regionCode: "US",
        key: youtubeKey,
      },
    }
  );

  let items = primaryRes.data.items;
  if (!items || items.length === 0) {
    console.warn("⚠️ No recent popular videos found; falling back to latest uploads");
    // Fallback: just the latest videos (no recency filter), same pool size
    const fallbackRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: "surfing barrel OR wave ride OR drop in OR surf line OR surf highlight OR surf edit",
          maxResults: 10,
          order: "date",
          type: "video",
          videoDuration: "any",
          relevanceLanguage: "en",
          regionCode: "US",
          key: youtubeKey,
        },
      }
    );
    items = fallbackRes.data.items;
  }

  return items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishTime: item.snippet.publishTime,
    url: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

async function pickWithAI(videos) {
  const promptLines = videos.map(
    (v, i) =>
      `${i + 1}. Title: "${v.title}" — ${v.description.substring(0, 100)}...`
  );

  const prompt = `
Here are 10 short, fresh surf videos:

${promptLines.join("\n")}

Pick the one that most likely shows exciting wave riding — like barrels, turns, or drops — not people talking or paddling. Respond with the NUMBER only.
`;

  const chatRes = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a surf expert. Pick the video most likely to show someone riding a wave or performing a visually impressive maneuver. Avoid talking, SUP clips, or product reviews.",
      },
      { role: "user", content: prompt }
    ],
    max_tokens: 5,
    temperature: 0.7,
  });

  const reply  = chatRes.choices[0].message.content.trim();
  const choice = parseInt(reply, 10);

  return videos[(choice - 1) >= 0 && (choice - 1) < videos.length ? (choice - 1) : 0];
}

async function runDailyJob() {
  try {
    const videos = await fetchSurfVideos();

    if (!Array.isArray(videos) || videos.length === 0) {
      console.error("❌ Daily job error: No videos available from YouTube");
      return;
    }

    const pick = await pickWithAI(videos);
    if (!pick || typeof pick !== "object") {
      console.error("❌ Daily job error: AI pick was invalid", pick);
      return;
    }

    const outPath = path.join(__dirname, "videoOfTheDay.json");
    fs.writeFileSync(outPath, JSON.stringify(pick, null, 2));
    console.log("✅ Video of the Day updated:", pick.title);
  } catch (err) {
    console.error("❌ Daily job error:", err);
  }
}

// Schedule at 6 AM local time every day
cron.schedule("0 6 * * *", runDailyJob);

module.exports = { runDailyJob };

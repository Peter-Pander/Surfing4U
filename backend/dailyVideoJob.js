const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const { Configuration, OpenAIApi } = require("openai");

const youtubeKey = process.env.YOUTUBE_API_KEY;
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

async function fetchSurfVideos() {
  // Search for short recent surf videos
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      q: "surfing short",
      maxResults: 5,
      order: "date",
      type: "video",
      videoDuration: "short",
      key: youtubeKey,
    },
  });
  return res.data.items.map(item => ({
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
Here are 5 short, fresh surf videos:

${promptLines.join("\n")}

Which one would you feature as "Surf Video of the Day"? Reply with the NUMBER only.
  `;
  const aiRes = await openai.createCompletion({
    model: "gpt-4o-mini",
    prompt,
    max_tokens: 5,
    temperature: 0.7,
  });
  const choice = parseInt(aiRes.data.choices[0].text.trim());
  return videos[choice - 1] || videos[0];
}

async function runDailyJob() {
  try {
    const videos = await fetchSurfVideos();
    const pick = await pickWithAI(videos);

    // Save to JSON
    const outPath = path.join(__dirname, "videoOfTheDay.json");
    fs.writeFileSync(outPath, JSON.stringify(pick, null, 2));
    console.log("✅ Video of the Day updated:", pick.title);
  } catch (err) {
    console.error("❌ Daily job error:", err);
  }
}

// Schedule at 6 AM local time every day
cron.schedule("0 6 * * *", () => {
  runDailyJob();
});

module.exports = { runDailyJob };

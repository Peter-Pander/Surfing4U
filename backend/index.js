require("dotenv").config();
const mongoose         = require("mongoose");
const express          = require("express");
const cors             = require("cors");
const path             = require("path");
const fs               = require("fs");

const { runDailyJob }    = require("./jobs/dailyVideoJob");
const { runContestJob }  = require("./jobs/contestVideoJob");
const fetchSurferProfile = require("./jobs/fetchSurferProfile");
const Surfer             = require("./models/Surfer");

// ─── Load our one-off, community-sourced roster ───────────────────────────────
const surferNames = require("./data/surfers.json");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ─── Video and Contest Routes ─────────────────────────────────────────────────
app.get("/api/video-of-the-day", (req, res, next) => {
  const filePath = path.join(__dirname, "videoOfTheDay.json");
  fs.readFile(filePath, "utf-8", (err, raw) => {
    if (err) return next(err);
    try { res.json(JSON.parse(raw)); }
    catch (parseErr) { next(parseErr); }
  });
});
app.get("/api/contest-highlight", (req, res, next) => {
  const filePath = path.join(__dirname, "contestHighlight.json");
  fs.readFile(filePath, "utf-8", (err, raw) => {
    if (err) return next(err);
    try { res.json(JSON.parse(raw)); }
    catch (parseErr) { next(parseErr); }
  });
});

// ─── Surfers API Routes ───────────────────────────────────────────────────────
// GET list of all surfers (name, insta, wikiLink, bio, videos)
app.get("/api/surfers", async (req, res, next) => {
  try {
    const list = await Surfer.find()
      .select("name insta wikiLink bio videos")
      .sort("name");
    res.json(list);
  } catch (err) {
    next(err);
  }
});
// GET a single surfer's full profile by ID
app.get("/api/surfers/:id", async (req, res, next) => {
  try {
    const surfer = await Surfer.findById(req.params.id);
    if (!surfer) return res.status(404).json({ error: "Surfer not found" });
    res.json(surfer);
  } catch (err) {
    next(err);
  }
});

// ─── Start Server & Kick Off Jobs ────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);

  // kick off video jobs
  runDailyJob();
  runContestJob();

  // one-off seed from our scraped JSON of hundreds of names
  try {
    await Promise.all(
      surferNames.map(name =>
        fetchSurferProfile(name)
          .catch(err => console.error(`❌ Error upserting ${name}:`, err))
      )
    );
    console.log(`✅ Seeded ${surferNames.length} surfer profiles from JSON.`);
  } catch (err) {
    console.error("❌ Error seeding surfers from JSON:", err);
  }
});

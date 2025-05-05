// backend/index.js

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose           = require("mongoose");
const express            = require("express");
const cors               = require("cors");
const fs                 = require("fs");

const { runDailyJob }      = require("./jobs/dailyVideoJob");
const { runContestJob }    = require("./jobs/contestVideoJob");
const fetchSurferProfile   = require("./jobs/fetchSurferProfile");
const Surfer               = require("./models/Surfer");

// ─── Load our one‐off, community‐sourced roster ───────────────────────────────
const surferNames = require("./data/surfers.json");

const app = express();
app.use(cors());
// ─── Parse JSON bodies for admin patch/post routes ──────────────────────────
app.use(express.json());

const PORT = process.env.PORT || 4000;
// Only start video jobs if this flag is true in your .env
const ENABLE_JOBS_ON_START = process.env.ENABLE_JOBS_ON_START === "true";

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

// ─── Admin‐mode routes ────────────────────────────────────────────────────────
// edit basic fields (bio, insta, wikiLink)
app.patch("/api/surfers/:id", async (req, res, next) => {
  try {
    const { bio, insta, wikiLink } = req.body;
    const updates = {};
    if (bio !== undefined)     updates.bio     = bio;
    if (insta !== undefined)   updates.insta   = insta;
    if (wikiLink !== undefined) updates.wikiLink = wikiLink;

    const updated = await Surfer.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Surfer not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// add a new video URL
app.post("/api/surfers/:id/videos", async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing 'url' in body" });

    const surfer = await Surfer.findById(req.params.id);
    if (!surfer) return res.status(404).json({ error: "Surfer not found" });

    surfer.videos = surfer.videos || [];
    surfer.videos.push(url);
    await surfer.save();
    res.json(surfer);
  } catch (err) {
    next(err);
  }
});

// delete a video by index
app.delete("/api/surfers/:id/videos/:idx", async (req, res, next) => {
  try {
    const surfer = await Surfer.findById(req.params.id);
    if (!surfer) return res.status(404).json({ error: "Surfer not found" });

    const idx = Number(req.params.idx);
    if (isNaN(idx) || idx < 0 || idx >= (surfer.videos || []).length) {
      return res.status(400).json({ error: "Invalid video index" });
    }

    surfer.videos.splice(idx, 1);
    await surfer.save();
    res.json(surfer);
  } catch (err) {
    next(err);
  }
});

// ─── Serve the built frontend ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ─── Start Server & Kick Off Jobs ────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);

  // ─── kick off daily & contest video jobs if enabled ────────────────────────
  if (ENABLE_JOBS_ON_START) {
    try {
      runDailyJob();
    } catch (err) {
      console.error("❌ Daily job error:", err);
    }
    try {
      runContestJob();
    } catch (err) {
      console.error("❌ Contest job error:", err);
    }
  } else {
    console.log(
      "⏭️ Video jobs on start are disabled (set ENABLE_JOBS_ON_START=true to enable)"
    );
  }

  // ─── one-time seed from our scraped JSON of hundreds of names ────────────────
  if (process.env.SEED_SURFERS === "true") {
    try {
      await Promise.all(
        surferNames.map((name) =>
          fetchSurferProfile(name, { force: true }).catch((err) =>
            console.error(`❌ Error upserting ${name}:`, err)
          )
        )
      );
      console.log(`✅ Seeded ${surferNames.length} surfer profiles from JSON.`);
    } catch (err) {
      console.error("❌ Error seeding surfers from JSON:", err);
    }
  }
});

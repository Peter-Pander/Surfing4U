require("dotenv").config();
const mongoose             = require("mongoose");
const express              = require("express");
const cors                 = require("cors");
const path                 = require("path");
const fs                   = require("fs");

const { runDailyJob }      = require("./jobs/dailyVideoJob");
const { runContestJob }    = require("./jobs/contestVideoJob");
const fetchSurferProfile   = require("./jobs/fetchSurferProfile");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ─── Video-of-the-Day Route ───────────────────────────────────────────────────
app.get("/api/video-of-the-day", (req, res, next) => {
  const filePath = path.join(__dirname, "videoOfTheDay.json");
  fs.readFile(filePath, "utf-8", (err, raw) => {
    if (err) return next(err);
    try {
      res.json(JSON.parse(raw));
    } catch (parseErr) {
      next(parseErr);
    }
  });
});

// ─── Contest Highlight Route ─────────────────────────────────────────────────
app.get("/api/contest-highlight", (req, res, next) => {
  const filePath = path.join(__dirname, "contestHighlight.json");
  fs.readFile(filePath, "utf-8", (err, raw) => {
    if (err) return next(err);
    try {
      res.json(JSON.parse(raw));
    } catch (parseErr) {
      next(parseErr);
    }
  });
});

// ─── Seed list of pro surfers ────────────────────────────────────────────────
const surfers = [
  "Kelly Slater",
  "Stephanie Gilmore",
  "John John Florence",
  "Carissa Moore",
  "Gabriel Medina"
];

// ─── Start Server & Kick Off Jobs ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);

  // existing video jobs
  runDailyJob();
  runContestJob();

  // new: fetch and upsert each surfer profile
  surfers.forEach(name => {
    fetchSurferProfile(name)
      .catch(err => console.error(`❌ Error fetching profile for ${name}:`, err));
  });
});

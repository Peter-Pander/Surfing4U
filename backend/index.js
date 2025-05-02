// backend/index.js

require("dotenv").config();
const mongoose = require("mongoose");
const express  = require("express");
const cors     = require("cors");
const path     = require("path");
const fs       = require("fs");

const { runDailyJob }   = require("./dailyVideoJob");
const { runContestJob } = require("./contestVideoJob");

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
      const data = JSON.parse(raw);
      res.json(data);
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
      const data = JSON.parse(raw);
      res.json(data);
    } catch (parseErr) {
      next(parseErr);
    }
  });
});

// ─── Start Server & Kick Off Jobs ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  runDailyJob();
  runContestJob();
});

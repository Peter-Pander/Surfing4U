// backend/index.js
require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const fs      = require("fs");

const { runDailyJob }   = require("./dailyVideoJob");
const { runContestJob } = require("./contestVideoJob");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

// Serve the latest Surf Video of the Day
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

// Serve the latest Contest Highlight
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

// Start server and kick off both jobs immediately
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  runDailyJob();
  runContestJob();
});

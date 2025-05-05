#!/usr/bin/env node
const path = require("path");
// Load the root .env so OPENAI_API_KEY and others are available
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });


const mongoose           = require("mongoose");
const fs                 = require("fs");
const pathModule         = require("path");
const surferEntries      = require("../data/surfers.json");
const fetchSurferProfile = require("../jobs/fetchSurferProfile");

(async () => {
  // ─── 0. Connect to MongoDB ────────────────────────────────────────────────
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for batch dump");
  } catch (connErr) {
    console.error("❌ Could not connect to MongoDB:", connErr);
    process.exit(1);
  }

  // ─── 1. Load existing profiles.json ───────────────────────────────────────
  const outPath = pathModule.join(__dirname, "..", "data", "profiles.json");
  let existingProfiles = [];
  if (fs.existsSync(outPath)) {
    try {
      existingProfiles = JSON.parse(fs.readFileSync(outPath, "utf8"));
    } catch (readErr) {
      console.error("❌ Failed to parse existing profiles.json, starting fresh");
      existingProfiles = [];
    }
  }

  // Build a name→profile map for quick lookup
  const profileMap = new Map(
    existingProfiles.map(p => [p.name, p])
  );

  // ─── 2. Loop surfers.json, fetch only missing/incomplete profiles ─────────
  for (const entry of surferEntries) {
    const name = typeof entry === "string" ? entry : entry.name;
    const already = profileMap.get(name);

    // If we already have bio, insta and at least one video, skip
    if (
      already &&
      already.bio &&
      Array.isArray(already.videos) &&
      already.videos.length > 0 &&
      already.insta
    ) {
      console.log(`⏭️ Skipping ${name}, already in profiles.json`);
      continue;
    }

    console.log(`🔄 Fetching profile for ${name}…`);
    // force:false so it’ll still skip in Mongo if full already there,
    // but mainly drives our file-based logic
    const profile = await fetchSurferProfile(name, { force: false });
    if (profile) {
      profileMap.set(name, profile);
      console.log(`✅ Got profile for ${name}`);
    }
  }

  // ─── 3. Write merged, sorted results back to profiles.json ────────────────
  const merged = Array.from(profileMap.values())
    .sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf8");
  console.log(`✅ Wrote ${merged.length} profiles to ${outPath}`);

  // ─── 4. Disconnect and exit ────────────────────────────────────────────────
  await mongoose.disconnect();
  console.log("🔌 MongoDB connection closed");
  process.exit(0);

})().catch(err => {
  console.error("❌ Unhandled error in fetchAllProfiles:", err);
  process.exit(1);
});

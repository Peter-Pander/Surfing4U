// scripts/mergeSurfspots.js
const fs = require("fs");
const path = require("path");

// point at your frontend data folder
const dataDir = path.join(__dirname, "../frontend/src/data");
const basePath = path.join(dataDir, "surfspots-base.json");
const additionsPath = path.join(dataDir, "surfspots-additions.json");
const videosPath = path.join(dataDir, "surfspot-videos.json");
const outputPath = path.join(dataDir, "surfspots.json");

try {
  const base = JSON.parse(fs.readFileSync(basePath, "utf-8"));
  const additions = JSON.parse(fs.readFileSync(additionsPath, "utf-8"));

  // load video map if available
  let videosMap = {};
  if (fs.existsSync(videosPath)) {
    try {
      videosMap = JSON.parse(fs.readFileSync(videosPath, "utf-8"));
    } catch (err) {
      console.warn(`⚠️ Could not parse surfspot-videos.json: ${err.message}`);
    }
  } else {
    console.warn("⚠️ surfspot-videos.json not found—continuing without videos.");
  }

  // helper to normalize strings for fuzzy matching
  const normalize = str => str
    .toString()
    .toLowerCase()
    .normalize("NFD")                   // decompose accents
    .replace(/[\u0300-\u036f]/g, "")    // remove accents
    .replace(/[^a-z0-9]/g, "");         // remove non-alphanumeric

  // remove any additions that duplicate an existing base spot (fuzzy)
  const baseKeys = new Set(
    base.map(b => `${normalize(b.name)}|${normalize(b.country)}`)
  );
  const dedupedAdditions = additions.filter(add => {
    const key = `${normalize(add.name)}|${normalize(add.country)}`;
    return !baseKeys.has(key);
  });
  if (dedupedAdditions.length < additions.length) {
    const skipped = additions.length - dedupedAdditions.length;
    console.log(`⏭️ Skipped ${skipped} duplicate addition${skipped > 1 ? "s" : ""}.`);
  }

  // merge all entries
  const combined = [...base, ...dedupedAdditions];

  // drop any entries missing required fields
  const filtered = combined.filter((spot, idx) => {
    const missing = [];
    if (!spot.name)    missing.push("name");
    if (!spot.country) missing.push("country");
    if (!spot.lat)     missing.push("lat");
    if (!spot.lng)     missing.push("lng");
    if (missing.length) {
      console.warn(
        `⚠ Skipping spot missing [${missing.join(", ")}] at index ${idx}:`,
        spot
      );
      return false;
    }
    return true;
  });

  // dedupe on name + country (exact match)
  const unique = filtered.filter(
    (spot, i, arr) =>
      i === arr.findIndex((s) => s.name === spot.name && s.country === spot.country)
  );

  // sort alphabetically by name (now guaranteed to exist)
  unique.sort((a, b) => a.name.localeCompare(b.name));

  // inject up to 4 videos per spot
  unique.forEach(spot => {
    const vids = videosMap[spot.name];
    if (Array.isArray(vids) && vids.length > 0) {
      spot.videos = vids.slice(0, 4);
    }
  });

  // write final file
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2), "utf-8");
  console.log("✅ surfspots.json updated!");
} catch (err) {
  console.error("❌ failed to merge surfspots:", err.message);
  process.exit(1);
}

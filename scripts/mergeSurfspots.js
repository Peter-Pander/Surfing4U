// scripts/mergeSurfspots.js
const fs = require("fs");
const path = require("path");

// point at your frontend data folder
const dataDir = path.join(__dirname, "../frontend/src/data");
const basePath = path.join(dataDir, "surfspots-base.json");
const additionsPath = path.join(dataDir, "surfspots-additions.json");
const outputPath = path.join(dataDir, "surfspots.json");

try {
  const base = JSON.parse(fs.readFileSync(basePath, "utf-8"));
  const additions = JSON.parse(fs.readFileSync(additionsPath, "utf-8"));

  // merge all entries
  const combined = [...base, ...additions];

  // drop any entries missing required fields
  const filtered = combined.filter((spot, idx) => {
    const missing = [];
    if (!spot.name)    missing.push("name");
    if (!spot.country) missing.push("country");
    if (!spot.lat)     missing.push("lat");
    if (!spot.lng)     missing.push("lng");
    if (missing.length) {
      console.warn(`⚠ Skipping spot missing [${missing.join(", ")}] at index ${idx}:`, spot);
      return false;
    }
    return true;
  });

  // dedupe on name + country
  const unique = filtered.filter(
    (spot, i, arr) =>
      i === arr.findIndex((s) => s.name === spot.name && s.country === spot.country)
  );

  // sort alphabetically by name (now guaranteed to exist)
  unique.sort((a, b) => a.name.localeCompare(b.name));

  // write final file
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2), "utf-8");
  console.log("✅ surfspots.json updated!");
} catch (err) {
  console.error("❌ failed to merge surfspots:", err.message);
  process.exit(1);
}

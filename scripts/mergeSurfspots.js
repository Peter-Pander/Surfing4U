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

  // merge
  const combined = [...base, ...additions];

  // dedupe on name + country
  const unique = combined.filter(
    (spot, i, all) =>
      i === all.findIndex((s) => s.name === spot.name && s.country === spot.country)
  );

  // sort by name
  unique.sort((a, b) => a.name.localeCompare(b.name));

  // write
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2), "utf-8");
  console.log("✅ surfspots.json updated!");
} catch (err) {
  console.error("❌ failed to merge surfspots:", err.message);
  process.exit(1);
}

// backend/jobs/previewDailyJob.js
require("dotenv").config();           // load .env in any environment
const { runDailyJob } = require("./dailyVideoJob");

runDailyJob()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Preview run failed:", err);
    process.exit(1);
  });

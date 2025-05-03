// backend/scripts/fetchAllSurfers.js

require('dotenv').config();
const fs    = require('fs');
const path  = require('path');
const axios = require('axios');

async function fetchRawNames() {
  console.log('🔍 Fetching raw link titles from Wikipedia API…');
  const names = new Set();
  let plcontinue = null;

  do {
    const res = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action:  'query',
        titles:  'List_of_surfers',
        prop:    'links',
        pllimit: 'max',
        format:  'json',
        ...(plcontinue && { plcontinue })
      }
    });

    const page = res.data.query.pages[Object.keys(res.data.query.pages)[0]];
    page.links.forEach(({ title }) => {
      const t = title.trim();
      // only multi-word, capitalized titles
      if (/^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/.test(t)) {
        names.add(t);
      }
    });

    plcontinue = res.data.continue?.plcontinue;
  } while (plcontinue);

  console.log(`  → ${names.size} raw candidates found.`);
  return Array.from(names);
}

async function filterByCategory(names) {
  console.log('🔍 Filtering by category (must have a “Surfers” category)…');
  const valid = [];
  const pattern = /surfers/i;

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    try {
      const resp = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action:  'query',
          titles:  name,
          prop:    'categories',
          cllimit: 'max',
          format:  'json'
        }
      });

      const page = resp.data.query.pages[Object.keys(resp.data.query.pages)[0]];
      const cats = page.categories?.map(c => c.title) || [];

      if (cats.some(c => pattern.test(c))) {
        valid.push(name);
      }
    } catch (err) {
      // ignore pages that error (redirects, missing, etc)
    }

    // progress every 20
    if ((i + 1) % 20 === 0) {
      console.log(`    ✔️  Checked ${i + 1}/${names.length}`);
    }
  }

  console.log(`  → ${valid.length} names validated in “Surfers” categories.`);
  return valid;
}

(async () => {
  try {
    const raw      = await fetchRawNames();
    const surfers  = await filterByCategory(raw);
    surfers.sort();

    const outPath = path.join(__dirname, '..', 'data', 'surfers.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(surfers, null, 2), 'utf8');

    console.log(`✅ Wrote ${surfers.length} verified surfers to ${outPath}`);
  } catch (err) {
    console.error('❌ Error in fetchAllSurfers.js:', err);
    process.exit(1);
  }
})();

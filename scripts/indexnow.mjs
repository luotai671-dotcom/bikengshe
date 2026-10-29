import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const INDEXNOW_HOST = 'tizibks.com';
const INDEXNOW_KEY = 'd5d201531070f93c4de5ccc3e6d19251';
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function extractUrlsFromSitemap() {
  const distDir = path.join(rootDir, 'dist');
  const urls = new Set();

  const filesToCheck = [
    path.join(distDir, 'sitemap-0.xml'),
    path.join(distDir, 'sitemap.xml'),
    path.join(rootDir, 'public', 'sitemap.xml')
  ];

  for (const filePath of filesToCheck) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const matches = content.matchAll(/<loc>\s*(https?:\/\/[^<\s]+)\s*<\/loc>/gi);
      for (const m of matches) {
        const url = m[1].trim();
        // Skip sitemap index files themselves
        if (!url.endsWith('.xml')) {
          urls.add(url);
        }
      }
    }
  }

  // Always ensure home page is in list
  urls.add(`https://${INDEXNOW_HOST}/`);

  return Array.from(urls);
}

export async function submitIndexNow() {
  console.log(`[IndexNow] Starting URL submission for ${INDEXNOW_HOST}...`);

  const urlList = await extractUrlsFromSitemap();
  console.log(`[IndexNow] Extracted ${urlList.length} unique URLs from sitemap.`);

  if (urlList.length === 0) {
    console.warn('[IndexNow] No URLs found to submit.');
    return;
  }

  // IndexNow allows max 10,000 URLs per post
  const batch = urlList.slice(0, 10000);

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: batch
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'TiziBKS-IndexNow-Pusher/1.0'
      },
      body: JSON.stringify(payload)
    });

    console.log(`[IndexNow] API Response HTTP Status: ${res.status} ${res.statusText}`);

    if (res.status === 200 || res.status === 202) {
      console.log(`[IndexNow] Successfully submitted ${batch.length} URLs to IndexNow!`);
    } else {
      const text = await res.text();
      console.warn(`[IndexNow] Non-success response received (${res.status}): ${text}`);
    }
  } catch (err) {
    console.error(`[IndexNow] Submission failed due to network error:`, err.message);
  }
}

// Auto-run if executed directly via node scripts/indexnow.mjs
if (process.argv[1] === __filename) {
  submitIndexNow();
}

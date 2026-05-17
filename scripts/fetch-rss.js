'use strict';

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'rss-signals.json');

// Each entry can have multiple urls tried in order — first success wins.
// URLs were live-tested 2026-05-17; Medium tag feeds are the most reliable
// public source for these vendors since their own blog RSS feeds are mostly
// behind WAFs or lack RSS entirely.
const FEEDS = [
  {
    competitorId: 'kong',
    name: 'Kong Inc.',
    urls: [
      'https://medium.com/feed/tag/kong',           // Medium tag — confirmed 200
      'https://konghq.com/blog/feed/',               // official (may 404)
    ],
  },
  {
    competitorId: 'apigee',
    name: 'Google Apigee',
    urls: [
      'https://cloud.google.com/feeds/apigee-release-notes.xml', // confirmed 200
      'https://cloudblog.withgoogle.com/products/api-management/rss/',
    ],
  },
  {
    competitorId: 'mulesoft',
    name: 'MuleSoft Anypoint',
    urls: [
      'https://medium.com/feed/tag/mulesoft',        // confirmed 200
      'https://blogs.mulesoft.com/feed/',
    ],
  },
  {
    competitorId: 'solo',
    name: 'Solo.io',
    urls: [
      'https://medium.com/feed/solo-io',             // confirmed 200
      'https://www.solo.io/blog/index.xml',
    ],
  },
  {
    competitorId: 'boomi',
    name: 'Boomi',
    urls: [
      'https://medium.com/feed/tag/boomi',           // confirmed 200
      'https://boomi.com/blog/feed/',
    ],
  },
  {
    competitorId: 'ibm',
    name: 'IBM API Connect',
    urls: [
      'https://medium.com/feed/tag/ibm-api-connect', // confirmed 200
      'https://medium.com/feed/tag/api-connect',
    ],
  },
];

const TIMEOUT_MS = 12000;

const parser = new Parser({
  timeout: TIMEOUT_MS,
  headers: {
    'User-Agent': 'SignalOps-DataFetcher/1.0 (market intelligence dashboard)',
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(text, maxLen = 300) {
  if (!text || text.length <= maxLen) return text ?? '';
  return text.slice(0, maxLen).replace(/\s\S*$/, '') + '…';
}

async function fetchFeed(feed) {
  const urls = feed.urls ?? [feed.url];
  for (const url of urls) {
    console.log(`  Fetching ${feed.name} → ${url}`);
    try {
      const result = await parser.parseURL(url);
      const items = (result.items ?? []).slice(0, 15).map((item, i) => ({
        id: `rss-${feed.competitorId}-${Date.now()}-${i}`,
        competitorId: feed.competitorId,
        competitorName: feed.name,
        source: 'rss',
        title: (item.title ?? '').trim(),
        link: item.link ?? item.guid ?? '',
        publishedAt: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
        summary: truncate(
          stripHtml(item.contentSnippet ?? item.contentEncoded ?? item.content ?? '')
        ),
        feedTitle: result.title ?? feed.name,
        feedUrl: url,
      }));
      console.log(`    ✓ ${items.length} items`);
      return { success: true, competitorId: feed.competitorId, items };
    } catch (err) {
      console.warn(`    ✗ ${url}: ${err.message}`);
    }
  }
  console.warn(`  ✗ All URLs failed for ${feed.name}`);
  return { success: false, competitorId: feed.competitorId, items: [] };
}

async function run() {
  console.log('\n── RSS Feed Fetcher ──');
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));

  const allItems = results.flatMap(r =>
    r.status === 'fulfilled' ? r.value.items : []
  );

  // Sort newest-first
  allItems.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allItems, null, 2));

  const succeeded = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  console.log(`\n  Saved ${allItems.length} items from ${succeeded}/${FEEDS.length} feeds → ${OUTPUT_FILE}`);

  return { succeeded, total: FEEDS.length, itemCount: allItems.length };
}

module.exports = { run };

if (require.main === module) {
  run().catch(err => { console.error(err); process.exit(1); });
}

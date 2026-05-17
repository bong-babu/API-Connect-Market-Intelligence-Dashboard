'use strict';

const fs = require('fs');
const path = require('path');

const METADATA_FILE = path.join(__dirname, '..', 'public', 'data', 'last-updated.json');

async function runFetcher(name, modulePath) {
  const start = Date.now();
  try {
    const { run } = require(modulePath);
    const result = await run();
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n  [${name}] ✓ Done in ${elapsed}s`);
    return { status: 'success', elapsed: parseFloat(elapsed), ...result };
  } catch (err) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.error(`\n  [${name}] ✗ Failed after ${elapsed}s: ${err.message}`);
    return { status: 'error', elapsed: parseFloat(elapsed), error: err.message };
  }
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  SignalOps · Data Pipeline');
  console.log(`  ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════');

  const rssResult     = await runFetcher('RSS Feeds',     './fetch-rss');
  const githubResult  = await runFetcher('GitHub',        './fetch-github');
  const reviewResult  = await runFetcher('G2 Reviews',    './fetch-reviews');

  const metadata = {
    timestamp: new Date().toISOString(),
    results: {
      rss:    rssResult,
      github: githubResult,
      reviews: reviewResult,
    },
  };

  fs.mkdirSync(path.dirname(METADATA_FILE), { recursive: true });
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));

  console.log('\n═══════════════════════════════════════════');
  console.log('  Pipeline complete');
  console.log(`  RSS:     ${rssResult.status}   (${rssResult.itemCount ?? 0} items)`);
  console.log(`  GitHub:  ${githubResult.status}  (${githubResult.succeeded ?? 0}/${githubResult.total ?? 0} repos)`);
  console.log(`  Reviews: ${reviewResult.status}  (${reviewResult.succeeded ?? 0}/${reviewResult.total ?? 0} products with data)`);
  console.log(`  Metadata → ${METADATA_FILE}`);
  console.log('═══════════════════════════════════════════\n');

  const anyError = [rssResult, githubResult, reviewResult].some(r => r.status === 'error');
  process.exit(anyError ? 1 : 0);
}

main();

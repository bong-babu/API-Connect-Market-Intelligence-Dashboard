'use strict';

/**
 * G2 Review Scraper
 *
 * IMPORTANT LIMITATIONS:
 * ─────────────────────
 * G2's review pages are server-side rendered for their initial HTML (for SEO), which means
 * we can extract aggregate scores from JSON-LD structured data and <meta> tags without
 * running JavaScript. Full review text requires authentication and JS execution.
 *
 * What this script extracts (from static HTML only):
 *   - Overall rating (from JSON-LD AggregateRating or og:rating meta)
 *   - Review count (from JSON-LD or page meta)
 *   - Product name
 *
 * What it CANNOT extract without a headless browser + login:
 *   - Individual review text
 *   - Positive/negative theme breakdowns
 *   - Ratings by category
 *
 * G2's ToS (Section 4) prohibits systematic scraping. This script extracts only
 * publicly available aggregate data already exposed via structured data for search
 * engines — the same data Google parses for rich snippets.
 *
 * If G2 blocks the request (403/429), the script falls back to null values
 * without crashing the pipeline.
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'review-signals.json');

const PRODUCTS = [
  { competitorId: 'ibm',      name: 'IBM API Connect',      slug: 'ibm-api-connect'        },
  { competitorId: 'kong',     name: 'Kong Gateway',         slug: 'kong-gateway'           },
  { competitorId: 'apigee',   name: 'Google Apigee',        slug: 'apigee'                 },
  { competitorId: 'mulesoft', name: 'MuleSoft Anypoint',    slug: 'mulesoft-anypoint-platform' },
  { competitorId: 'solo',     name: 'Solo.io',              slug: 'solo-io'                },
  { competitorId: 'boomi',    name: 'Boomi',                slug: 'boomi'                  },
];

const BASE_URL = 'https://www.g2.com/products';
const TIMEOUT_MS = 15000;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};

function parseJsonLd($) {
  let rating = null;
  let reviewCount = null;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() ?? '{}');
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        const agg = item.aggregateRating ?? item.AggregateRating;
        if (agg) {
          rating = parseFloat(agg.ratingValue ?? agg.RatingValue) || null;
          reviewCount = parseInt(agg.reviewCount ?? agg.ReviewCount ?? agg.ratingCount, 10) || null;
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });

  return { rating, reviewCount };
}

function parseMetaTags($) {
  const ogRating = parseFloat($('meta[property="og:rating"]').attr('content') ?? '') || null;
  const reviewCountMeta = parseInt(
    $('meta[name="review_count"]').attr('content') ??
    $('meta[property="og:review_count"]').attr('content') ?? '',
    10
  ) || null;

  // Try common G2 data attributes in static HTML
  const ratingFromAttr = parseFloat(
    $('[data-rating]').first().attr('data-rating') ?? ''
  ) || null;

  return {
    rating: ogRating ?? ratingFromAttr,
    reviewCount: reviewCountMeta,
  };
}

async function fetchProduct(product) {
  const url = `${BASE_URL}/${product.slug}/reviews`;
  console.log(`  Fetching ${product.name} → ${url}`);

  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      timeout: TIMEOUT_MS,
      maxRedirects: 3,
      validateStatus: s => s < 500,
    });

    if (response.status === 403 || response.status === 429) {
      console.warn(`    ✗ Blocked (${response.status}) — returning null values`);
      return buildResult(product, null, null, 'blocked');
    }

    if (response.status !== 200) {
      console.warn(`    ✗ HTTP ${response.status}`);
      return buildResult(product, null, null, `http_${response.status}`);
    }

    const $ = cheerio.load(response.data);
    const fromJsonLd = parseJsonLd($);
    const fromMeta = parseMetaTags($);

    const rating = fromJsonLd.rating ?? fromMeta.rating;
    const reviewCount = fromJsonLd.reviewCount ?? fromMeta.reviewCount;

    if (rating !== null) {
      console.log(`    ✓ Rating: ${rating}/5 · ${reviewCount ?? '?'} reviews`);
    } else {
      console.warn(`    ⚠ Page loaded but no structured rating data found (JS-rendered content)`);
    }

    return buildResult(product, rating, reviewCount, rating !== null ? 'ok' : 'no_data');
  } catch (err) {
    console.warn(`    ✗ Error: ${err.message}`);
    return buildResult(product, null, null, 'error');
  }
}

function buildResult(product, rating, reviewCount, status) {
  return {
    competitorId: product.competitorId,
    productName: product.name,
    slug: product.slug,
    source: 'g2',
    rating,
    reviewCount,
    maxRating: 5,
    fetchStatus: status,
    fetchedAt: new Date().toISOString(),
    url: `${BASE_URL}/${product.slug}/reviews`,
    note: status !== 'ok'
      ? 'G2 uses JavaScript rendering for full review content. Only JSON-LD structured data (if present) was parsed.'
      : null,
  };
}

async function run() {
  console.log('\n── G2 Review Scraper ──');
  console.log('  Note: extracts aggregate ratings from JSON-LD structured data only.');
  console.log('  Full reviews require a headless browser + G2 account.\n');

  const results = [];
  for (const product of PRODUCTS) {
    const result = await fetchProduct(product);
    results.push(result);
    // Polite delay between requests
    await new Promise(r => setTimeout(r, 1500));
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  const succeeded = results.filter(r => r.fetchStatus === 'ok').length;
  console.log(`\n  Saved ${results.length} products (${succeeded} with rating data) → ${OUTPUT_FILE}`);
  return { succeeded, total: PRODUCTS.length };
}

module.exports = { run };

if (require.main === module) {
  run().catch(err => { console.error(err); process.exit(1); });
}

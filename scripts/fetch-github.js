'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data', 'github-signals.json');

// Public GitHub REST API — 60 req/hour unauthenticated (GITHUB_TOKEN in env raises this to 5000).
const REPOS = [
  { competitorId: 'kong',     owner: 'Kong',       repo: 'kong'       },
  // Apigee is closed-source; googleapis/google-cloud-node is the closest public signal.
  { competitorId: 'apigee',   owner: 'googleapis', repo: 'google-cloud-node' },
  { competitorId: 'mulesoft', owner: 'mulesoft',   repo: 'mule'       },
  { competitorId: 'solo',     owner: 'solo-io',    repo: 'gloo'       },
  // Boomi has no significant public OSS repo — skipped as specified.
];

const BASE = 'https://api.github.com';

function githubHeaders() {
  const headers = {
    'User-Agent': 'SignalOps-DataFetcher/1.0',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchRepo({ competitorId, owner, repo }) {
  console.log(`  Fetching ${owner}/${repo}`);
  try {
    const headers = githubHeaders();

    const [repoRes, releaseRes] = await Promise.allSettled([
      axios.get(`${BASE}/repos/${owner}/${repo}`, { headers, timeout: 10000 }),
      axios.get(`${BASE}/repos/${owner}/${repo}/releases/latest`, { headers, timeout: 10000 }),
    ]);

    const repoData = repoRes.status === 'fulfilled' ? repoRes.value.data : null;
    const releaseData = releaseRes.status === 'fulfilled' ? releaseRes.value.data : null;

    if (!repoData) throw new Error(repoRes.reason?.message ?? 'repo fetch failed');

    const result = {
      competitorId,
      owner,
      repo,
      fullName: repoData.full_name,
      description: repoData.description ?? '',
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      watchers: repoData.watchers_count,
      language: repoData.language ?? null,
      topics: repoData.topics ?? [],
      htmlUrl: repoData.html_url,
      latestReleaseTag: releaseData?.tag_name ?? null,
      latestReleaseDate: releaseData?.published_at ?? null,
      latestReleaseName: releaseData?.name ?? null,
      pushedAt: repoData.pushed_at,
      fetchedAt: new Date().toISOString(),
    };

    console.log(`    ✓ ${result.stars.toLocaleString()} stars · ${result.forks.toLocaleString()} forks · latest: ${result.latestReleaseTag ?? 'n/a'}`);
    return { success: true, data: result };
  } catch (err) {
    console.warn(`    ✗ Failed: ${err.message}`);
    return { success: false, competitorId, owner, repo, error: err.message };
  }
}

async function run() {
  console.log('\n── GitHub Signal Fetcher ──');

  const results = [];
  // Sequential to respect rate limits
  for (const repoConfig of REPOS) {
    const result = await fetchRepo(repoConfig);
    if (result.success) results.push(result.data);
    // Small delay between requests
    await new Promise(r => setTimeout(r, 300));
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  console.log(`\n  Saved ${results.length}/${REPOS.length} repos → ${OUTPUT_FILE}`);
  return { succeeded: results.length, total: REPOS.length };
}

module.exports = { run };

if (require.main === module) {
  run().catch(err => { console.error(err); process.exit(1); });
}

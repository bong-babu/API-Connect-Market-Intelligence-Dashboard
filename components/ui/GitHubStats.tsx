'use client';

import { useState, useEffect } from 'react';
import { Star, GitFork, CircleDot, ExternalLink } from 'lucide-react';

type GitHubSignal = {
  competitorId: string;
  fullName: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  latestReleaseTag: string | null;
  latestReleaseDate: string | null;
  htmlUrl: string;
  pushedAt: string;
};

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function GitHubStats({ competitorId }: { competitorId: string }) {
  const [data, setData] = useState<GitHubSignal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/github?competitorId=${competitorId}`)
      .then(r => r.json())
      .then(json => setData((json.data ?? [])[0] ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [competitorId]);

  if (loading) {
    return (
      <div style={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }}>
        Loading…
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }}>
        No GitHub repo tracked.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <a
        href={data.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 11, color: '#0f62fe', fontWeight: 600,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
          wordBreak: 'break-all',
        }}
      >
        {data.fullName}
        <ExternalLink size={10} strokeWidth={2.2} style={{ flexShrink: 0 }} />
      </a>

      {[
        { icon: <Star size={11} strokeWidth={2} />,      label: 'Stars',       value: formatStars(data.stars), color: '#f59e0b' },
        { icon: <GitFork size={11} strokeWidth={2} />,   label: 'Forks',       value: String(data.forks),       color: '#8b5cf6' },
        { icon: <CircleDot size={11} strokeWidth={2} />, label: 'Open Issues', value: String(data.openIssues),  color: '#64748b' },
      ].map(row => (
        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: row.color }}>{row.icon}</span>
            {row.label}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{row.value}</span>
        </div>
      ))}

      {data.latestReleaseTag ? (
        <div style={{
          marginTop: 2, padding: '6px 8px',
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6,
        }}>
          <div style={{ fontSize: 9.5, color: '#64748b', marginBottom: 2 }}>Latest Release</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{data.latestReleaseTag}</div>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>{formatDate(data.latestReleaseDate)}</div>
        </div>
      ) : (
        <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>No public release</div>
      )}

      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>
        Lang: <strong style={{ color: '#64748b' }}>{data.language ?? '—'}</strong>
      </div>
    </div>
  );
}

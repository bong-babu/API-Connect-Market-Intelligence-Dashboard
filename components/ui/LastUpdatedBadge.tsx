'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

type LastUpdatedData = {
  timestamp: string | null;
  ageMinutes: number | null;
  fresh: boolean;
  results: Record<string, { status: string; itemCount?: number; succeeded?: number; total?: number }>;
};

function formatAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function LastUpdatedBadge() {
  const [data, setData] = useState<LastUpdatedData | null>(null);

  useEffect(() => {
    fetch('/api/last-updated')
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || data.timestamp === null) return null;

  const age = data.ageMinutes ?? 0;
  const fresh = data.fresh;
  const color = fresh ? '#10b981' : age < 2880 ? '#f59e0b' : '#dc2626';
  const bg    = fresh ? '#f0fdf4' : age < 2880 ? '#fffbeb' : '#fef2f2';
  const border= fresh ? '#bbf7d0' : age < 2880 ? '#fde68a' : '#fecaca';

  const rss     = data.results?.rss;
  const github  = data.results?.github;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: bg, border: `1px solid ${border}`,
        borderRadius: 20, padding: '3px 10px',
      }}>
        <RefreshCw size={10} color={color} strokeWidth={2.5} />
        <span style={{ fontSize: 11, fontWeight: 600, color }}>
          Refreshed {formatAge(age)}
        </span>
      </div>
      {rss && rss.status === 'success' && (
        <span style={{ fontSize: 10.5, color: '#94a3b8' }}>
          {rss.itemCount ?? 0} RSS signals
        </span>
      )}
      {github && github.status === 'success' && (
        <span style={{ fontSize: 10.5, color: '#94a3b8' }}>
          · {github.succeeded ?? 0}/{github.total ?? 0} repos
        </span>
      )}
    </div>
  );
}

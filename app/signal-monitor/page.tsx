'use client';

import { useState, useMemo } from 'react';
import { Radio } from 'lucide-react';
import SignalItem from '@/components/ui/SignalItem';
import MentionVolumeChart from '@/components/charts/MentionVolumeChart';
import { signals } from '@/data/signals';
import { competitors } from '@/data/competitors';

const ALL_SOURCES = ['all', 'tech-media', 'blog', 'g2', 'trustradius', 'gartner', 'reddit', 'twitter', 'community', 'github'];
const SOURCE_LABELS: Record<string, string> = {
  all: 'All Sources', 'tech-media': 'Tech Media', blog: 'Blog', g2: 'G2',
  trustradius: 'TrustRadius', gartner: 'Gartner', reddit: 'Reddit',
  twitter: 'Twitter/X', community: 'Community', github: 'GitHub',
};
const URGENCY_LEVELS = ['all', 'critical', 'high', 'medium', 'low'];

const COMPETITOR_MAP = Object.fromEntries(competitors.map(c => [c.id, c]));

export default function SignalMonitorPage() {
  const [sourceFilter, setSourceFilter] = useState('all');
  const [competitorFilter, setCompetitorFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const filtered = useMemo(() => {
    return signals.filter(s => {
      if (sourceFilter !== 'all' && s.source !== sourceFilter) return false;
      if (competitorFilter !== 'all' && s.competitorId !== competitorFilter) return false;
      if (urgencyFilter !== 'all' && s.urgency !== urgencyFilter) return false;
      return true;
    }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [sourceFilter, competitorFilter, urgencyFilter]);

  const criticalCount = signals.filter(s => s.urgency === 'critical').length;
  const highCount = signals.filter(s => s.urgency === 'high').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Radio size={18} color="#0f62fe" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Signal Monitor</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Real-time competitive intelligence signals across all sources</p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Signals', value: signals.length, color: '#0f62fe', bg: '#eff6ff' },
          { label: 'Critical', value: criticalCount, color: '#dc2626', bg: '#fef2f2' },
          { label: 'High Priority', value: highCount, color: '#d97706', bg: '#fffbeb' },
          { label: 'This Week', value: signals.filter(s => s.publishedAt >= '2026-05-12').length, color: '#10b981', bg: '#f0fdf4' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8,
            padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, background: stat.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.value}</span>
            </div>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Mention Volume Chart */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Signal Volume by Competitor</div>
        <div style={{ fontSize: 10.5, color: '#94a3b8', marginBottom: 16 }}>Weekly signal count · last 5 weeks</div>
        <MentionVolumeChart />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Source filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ALL_SOURCES.map(s => (
            <button
              key={s}
              onClick={() => setSourceFilter(s)}
              style={{
                padding: '5px 12px', borderRadius: 20, border: '1px solid',
                fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
                background: sourceFilter === s ? '#0f62fe' : '#ffffff',
                color: sourceFilter === s ? '#ffffff' : '#64748b',
                borderColor: sourceFilter === s ? '#0f62fe' : '#e2e8f0',
                transition: 'all 0.12s',
              }}
            >
              {SOURCE_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Competitor + Urgency filters */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={competitorFilter}
            onChange={e => setCompetitorFilter(e.target.value)}
            style={{
              padding: '6px 10px', borderRadius: 7, border: '1px solid #e2e8f0',
              fontSize: 12, color: '#0f172a', background: '#ffffff', cursor: 'pointer',
            }}
          >
            <option value="all">All Competitors</option>
            {competitors.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={urgencyFilter}
            onChange={e => setUrgencyFilter(e.target.value)}
            style={{
              padding: '6px 10px', borderRadius: 7, border: '1px solid #e2e8f0',
              fontSize: 12, color: '#0f172a', background: '#ffffff', cursor: 'pointer',
            }}
          >
            {URGENCY_LEVELS.map(u => (
              <option key={u} value={u}>{u === 'all' ? 'All Urgency' : u.charAt(0).toUpperCase() + u.slice(1)}</option>
            ))}
          </select>

          <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 4 }}>
            Showing {filtered.length} of {signals.length} signals
          </span>
        </div>
      </div>

      {/* Signal list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(signal => {
          const comp = COMPETITOR_MAP[signal.competitorId];
          return (
            <SignalItem
              key={signal.id}
              source={signal.source}
              title={signal.title}
              summary={signal.summary}
              urgency={signal.urgency}
              sentiment={signal.sentiment}
              tags={signal.tags}
              publishedAt={signal.publishedAt}
              competitorName={comp?.name ?? signal.competitorId}
              competitorColor={comp?.color ?? '#94a3b8'}
            />
          );
        })}
        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '48px 0', color: '#94a3b8',
            background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8,
          }}>
            No signals match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

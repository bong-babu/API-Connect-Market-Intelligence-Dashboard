'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { reviews } from '@/data/reviews';
import { competitors } from '@/data/competitors';

const COMP_MAP = Object.fromEntries([
  ...competitors.map(c => [c.id, { name: c.name, color: c.color }]),
  ['ibm', { name: 'IBM API Connect', color: '#0f62fe' }],
]);

const SOURCE_META: Record<string, { label: string; bg: string; color: string }> = {
  g2:          { label: 'G2',           bg: '#f0fdf4', color: '#16a34a' },
  trustradius: { label: 'TrustRadius',  bg: '#faf5ff', color: '#7c3aed' },
  gartner:     { label: 'Gartner PI',   bg: '#eff6ff', color: '#1e40af' },
};

const SENTIMENT_STYLE: Record<string, { bg: string; color: string }> = {
  positive: { bg: '#f0fdf4', color: '#16a34a' },
  neutral:  { bg: '#f8fafc', color: '#64748b' },
  negative: { bg: '#fef2f2', color: '#dc2626' },
};

function StarRating({ rating, max }: { rating: number; max: number }) {
  const pct = (rating / max) * 5;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          fill={i <= Math.floor(pct) ? '#f59e0b' : 'none'}
          color={i <= Math.ceil(pct) ? '#f59e0b' : '#e2e8f0'}
          strokeWidth={1.5}
        />
      ))}
      <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginLeft: 4 }}>
        {rating}<span style={{ color: '#94a3b8', fontWeight: 400 }}>/{max}</span>
      </span>
    </div>
  );
}

export default function ReviewIntelPage() {
  const [sourceFilter, setSourceFilter] = useState<'all' | 'g2' | 'trustradius' | 'gartner'>('all');
  const [competitorFilter, setCompetitorFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  const filtered = reviews.filter(r => {
    if (sourceFilter !== 'all' && r.source !== sourceFilter) return false;
    if (competitorFilter !== 'all' && r.competitorId !== competitorFilter) return false;
    if (sentimentFilter !== 'all' && r.sentiment !== sentimentFilter) return false;
    return true;
  });

  const ibmAvg = (reviews.filter(r => r.competitorId === 'ibm').reduce((s, r) => s + (r.rating / r.maxRating) * 5, 0) /
    reviews.filter(r => r.competitorId === 'ibm').length).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Star size={18} color="#d97706" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Review Intelligence</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>20 reviews across G2, TrustRadius, and Gartner Peer Insights</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Reviews', value: reviews.length, color: '#0f62fe' },
          { label: 'IBM Avg Rating', value: ibmAvg, color: '#10b981', suffix: '/5' },
          { label: 'Positive Reviews', value: reviews.filter(r => r.sentiment === 'positive').length, color: '#10b981' },
          { label: 'Negative Reviews', value: reviews.filter(r => r.sentiment === 'negative').length, color: '#dc2626' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>
              {s.value}<span style={{ fontSize: 13, color: '#94a3b8' }}>{s.suffix ?? ''}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {(['all', 'g2', 'trustradius', 'gartner'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSourceFilter(s)}
            style={{
              padding: '5px 12px', borderRadius: 20, border: '1px solid',
              fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
              background: sourceFilter === s ? '#0f62fe' : '#ffffff',
              color: sourceFilter === s ? '#ffffff' : '#64748b',
              borderColor: sourceFilter === s ? '#0f62fe' : '#e2e8f0',
            }}
          >
            {s === 'all' ? 'All Sources' : SOURCE_META[s].label}
          </button>
        ))}

        <select
          value={competitorFilter}
          onChange={e => setCompetitorFilter(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: 7, border: '1px solid #e2e8f0', fontSize: 12, color: '#0f172a', background: '#ffffff' }}
        >
          <option value="all">All Products</option>
          <option value="ibm">IBM API Connect</option>
          {competitors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select
          value={sentimentFilter}
          onChange={e => setSentimentFilter(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: 7, border: '1px solid #e2e8f0', fontSize: 12, color: '#0f172a', background: '#ffffff' }}
        >
          <option value="all">All Sentiment</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>

        <span style={{ fontSize: 12, color: '#94a3b8' }}>
          {filtered.length} of {reviews.length} reviews
        </span>
      </div>

      {/* Review cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {filtered.map(review => {
          const src = SOURCE_META[review.source];
          const comp = COMP_MAP[review.competitorId] ?? { name: review.competitorId, color: '#94a3b8' };
          const sent = SENTIMENT_STYLE[review.sentiment];
          return (
            <div key={review.id} style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10,
              padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: src.bg, color: src.color }}>
                    {src.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: comp.color, display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{comp.name}</span>
                  </div>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: sent.bg, color: sent.color, flexShrink: 0 }}>
                  {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                </span>
              </div>

              {/* Rating + title */}
              <div>
                <StarRating rating={review.rating} max={review.maxRating} />
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', marginTop: 6, lineHeight: 1.3 }}>
                  {review.title}
                </div>
              </div>

              {/* Reviewer info */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[review.reviewerProfile, review.industry, review.companySize].map(tag => (
                  <span key={tag} style={{ fontSize: 10.5, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 6px' }}>
                    {tag}
                  </span>
                ))}
                <span style={{ fontSize: 10.5, color: '#94a3b8', marginLeft: 'auto' }}>{review.publishedAt}</span>
              </div>

              {/* Verbatim */}
              <blockquote style={{
                margin: 0, padding: '10px 12px', background: '#f8fafc',
                borderLeft: '3px solid #e2e8f0', borderRadius: 4,
                fontSize: 12, color: '#0f172a', lineHeight: 1.6, fontStyle: 'italic',
              }}>
                "{review.verbatim}"
              </blockquote>

              {/* Themes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Positives
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {review.positiveThemes.slice(0, 3).map(t => (
                      <span key={t} style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ color: '#10b981', fontSize: 10 }}>✓</span> {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Negatives
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {review.negativeThemes.slice(0, 3).map(t => (
                      <span key={t} style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ color: '#f87171', fontSize: 10 }}>✕</span> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 10.5, color: '#94a3b8' }}>{review.helpful} people found this helpful</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

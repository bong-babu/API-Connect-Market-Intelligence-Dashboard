'use client';

import { useState } from 'react';
import { GitCompare } from 'lucide-react';
import { features } from '@/data/features';

const CATEGORIES = ['All', 'AI & LLM', 'Developer Experience', 'Security & Compliance',
  'Kubernetes & Cloud-Native', 'Observability', 'Governance', 'Integration',
  'Monetisation', 'Extensibility', 'Pricing', 'Hybrid & Multi-cloud'];

const PRODUCTS: Array<{ key: keyof typeof features[0]['scores']; label: string; color: string }> = [
  { key: 'ibm',      label: 'IBM',      color: '#0f62fe' },
  { key: 'kong',     label: 'Kong',     color: '#dc2626' },
  { key: 'apigee',   label: 'Apigee',   color: '#3b82f6' },
  { key: 'mulesoft', label: 'MuleSoft', color: '#8b5cf6' },
  { key: 'solo',     label: 'Solo.io',  color: '#10b981' },
  { key: 'boomi',    label: 'Boomi',    color: '#f59e0b' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ga:      { bg: '#f0fdf4', color: '#16a34a', label: 'GA' },
  beta:    { bg: '#eff6ff', color: '#0f62fe', label: 'Beta' },
  roadmap: { bg: '#fffbeb', color: '#d97706', label: 'Roadmap' },
  gap:     { bg: '#fef2f2', color: '#dc2626', label: 'Gap' },
};

const IMPORTANCE_COLOR: Record<string, string> = {
  critical: '#dc2626', high: '#d97706', medium: '#0f62fe', low: '#94a3b8',
};

function scoreColor(score: number, isIbm = false): { bg: string; color: string } {
  if (score >= 85) return { bg: isIbm ? '#0f62fe' : '#dcfce7', color: isIbm ? '#fff' : '#15803d' };
  if (score >= 70) return { bg: isIbm ? '#dbeafe' : '#fef9c3', color: isIbm ? '#1d4ed8' : '#854d0e' };
  if (score >= 50) return { bg: '#fff7ed', color: '#9a3412' };
  return { bg: '#fef2f2', color: '#dc2626' };
}

export default function FeatureGapsPage() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? features : features.filter(f => f.category === category);

  const ibmAvg = Math.round(features.reduce((s, f) => s + f.scores.ibm, 0) / features.length);
  const bestAvg = Math.round(features.reduce((s, f) => {
    const best = Math.max(f.scores.kong, f.scores.apigee, f.scores.mulesoft, f.scores.solo, f.scores.boomi);
    return s + best;
  }, 0) / features.length);
  const gapCount = features.filter(f => f.ibmStatus === 'gap').length;
  const criticalGaps = features.filter(f => f.ibmStatus === 'gap' && f.strategicImportance === 'critical').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GitCompare size={18} color="#d97706" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Feature Gap Analysis</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>IBM API Connect capability scores vs. best-in-class across 20 dimensions</p>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'IBM Avg Score', value: ibmAvg, suffix: '/100', color: '#0f62fe', bg: '#eff6ff' },
          { label: 'Best-in-Class Avg', value: bestAvg, suffix: '/100', color: '#10b981', bg: '#f0fdf4' },
          { label: 'Gap Score', value: bestAvg - ibmAvg, suffix: ' pts behind', color: '#d97706', bg: '#fffbeb' },
          { label: 'Critical Gaps', value: criticalGaps, suffix: ` of ${gapCount} gaps`, color: '#dc2626', bg: '#fef2f2' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
              {stat.value}<span style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{stat.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Product legend */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Products:</span>
          {PRODUCTS.map(p => (
            <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: p.color, display: 'inline-block' }} />
              <span style={{ fontSize: 11.5, color: '#64748b', fontWeight: p.key === 'ibm' ? 700 : 400 }}>{p.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            {Object.entries(STATUS_STYLE).map(([k, v]) => (
              <span key={k} style={{ fontSize: 10.5, background: v.bg, color: v.color, padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>
                {v.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '5px 12px', borderRadius: 20, border: '1px solid',
              fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
              background: category === cat ? '#0f62fe' : '#ffffff',
              color: category === cat ? '#ffffff' : '#64748b',
              borderColor: category === cat ? '#0f62fe' : '#e2e8f0',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feature matrix */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 200 }}>Feature</th>
              <th style={{ textAlign: 'left', padding: '12px 10px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 80 }}>Priority</th>
              <th style={{ textAlign: 'left', padding: '12px 10px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 80 }}>IBM Status</th>
              {PRODUCTS.map(p => (
                <th key={p.key} style={{ textAlign: 'center', padding: '12px 8px', minWidth: 68 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: p.color }}>{p.label}</span>
                </th>
              ))}
              <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 70 }}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const bestScore = Math.max(f.scores.kong, f.scores.apigee, f.scores.mulesoft, f.scores.solo, f.scores.boomi);
              const gap = bestScore - f.scores.ibm;
              const status = STATUS_STYLE[f.ibmStatus];
              return (
                <tr key={f.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>{f.name}</div>
                    <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 1 }}>{f.category}</div>
                  </td>
                  <td style={{ padding: '10px 10px' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: IMPORTANCE_COLOR[f.strategicImportance], textTransform: 'capitalize' }}>
                      {f.strategicImportance}
                    </span>
                  </td>
                  <td style={{ padding: '10px 10px' }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, background: status.bg, color: status.color, padding: '2px 7px', borderRadius: 4 }}>
                      {status.label}
                    </span>
                  </td>
                  {PRODUCTS.map(p => {
                    const score = f.scores[p.key];
                    const { bg, color } = scoreColor(score, p.key === 'ibm');
                    return (
                      <td key={p.key} style={{ padding: '10px 8px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block', width: 44, padding: '3px 0',
                          borderRadius: 5, fontSize: 12, fontWeight: 700,
                          background: bg, color,
                        }}>
                          {score}
                        </span>
                      </td>
                    );
                  })}
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: gap > 20 ? '#dc2626' : gap > 0 ? '#d97706' : '#10b981',
                    }}>
                      {gap > 0 ? `−${gap}` : `+${Math.abs(gap)}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

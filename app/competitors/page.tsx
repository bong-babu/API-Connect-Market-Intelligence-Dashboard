import { Swords, TrendingUp, TrendingDown } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import SentimentBar from '@/components/ui/SentimentBar';
import { competitors } from '@/data/competitors';
import { signals } from '@/data/signals';

const ACTION_VARIANT = { escalate: 'escalate', monitor: 'monitor', watch: 'watch' } as const;

export default function CompetitorsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Swords size={18} color="#dc2626" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Competitor Intelligence</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Detailed profiles for 5 tracked competitors · Updated 14 May 2026</p>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {competitors.map(c => (
          <div key={c.id} style={{
            background: '#ffffff', border: '1px solid #e2e8f0', borderTop: `3px solid ${c.color}`,
            borderRadius: 8, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.threatScore}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Threat Score</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: c.threatDelta > 0 ? '#dc2626' : '#10b981' }}>
              {c.threatDelta > 0 ? '↑' : '↓'} {Math.abs(c.threatDelta)} pts WoW
            </div>
          </div>
        ))}
      </div>

      {/* Detailed competitor cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {competitors.map(c => {
          const compSignals = signals.filter(s => s.competitorId === c.id);
          const criticalSignals = compSignals.filter(s => s.urgency === 'critical');
          const negativeSignals = compSignals.filter(s => s.sentiment === 'negative');

          return (
            <div key={c.id} style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: `4px solid ${c.color}`,
              borderRadius: 10, padding: '20px 24px',
            }}>
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#0f172a' }}>{c.name}</h2>
                    <Badge variant={ACTION_VARIANT[c.action]}>
                      {c.action.charAt(0).toUpperCase() + c.action.slice(1)}
                    </Badge>
                    <Badge variant={c.confidence === 'high' ? 'success' : c.confidence === 'medium' ? 'warning' : 'neutral'}>
                      {c.confidence} confidence
                    </Badge>
                  </div>
                  <p style={{ margin: 0, fontSize: 12.5, color: '#64748b', lineHeight: 1.6 }}>
                    <strong style={{ color: '#0f172a' }}>Recent move:</strong> {c.recentMove}
                  </p>
                </div>

                {/* Threat meter */}
                <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Threat Score', value: c.threatScore, color: c.color, suffix: '/100' },
                    { label: 'Market Share', value: `${c.marketShare}%`, color: '#64748b', suffix: '' },
                    { label: 'Signals', value: c.signalCount, color: '#0f172a', suffix: '' },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      textAlign: 'center', background: '#f8fafc', borderRadius: 8,
                      padding: '10px 16px', minWidth: 80,
                    }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                        {stat.value}{stat.suffix}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threat score bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>Threat Level</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{c.threatScore}/100</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${c.threatScore}%`, height: '100%', background: c.color, borderRadius: 4, transition: 'width 0.5s' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 20 }}>
                {/* Sentiment */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                    Review Sentiment
                  </div>
                  <SentimentBar
                    positive={c.sentiment.positive}
                    neutral={c.sentiment.neutral}
                    negative={c.sentiment.negative}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginTop: 10 }}>
                    {[
                      { label: 'Positive', value: c.sentiment.positive, color: '#10b981' },
                      { label: 'Neutral',  value: c.sentiment.neutral,  color: '#94a3b8' },
                      { label: 'Negative', value: c.sentiment.negative, color: '#f87171' },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: 'center', background: '#f8fafc', borderRadius: 6, padding: '6px 0' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}%</div>
                        <div style={{ fontSize: 9.5, color: '#94a3b8' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top topics */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                    Top Topics
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {c.topTopics.map((topic, i) => (
                      <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: '50%', background: c.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 12, color: '#0f172a' }}>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signal breakdown */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                    Signal Breakdown
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { label: 'Total Signals',    value: compSignals.length, color: '#0f172a' },
                      { label: 'Critical Urgency', value: criticalSignals.length, color: '#dc2626' },
                      { label: 'Negative for IBM', value: negativeSignals.length, color: '#f87171' },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{row.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 6 }}>
                      <Badge variant={c.confidence === 'high' ? 'success' : 'warning'}>
                        {c.confidence} data confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

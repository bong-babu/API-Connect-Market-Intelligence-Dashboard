import SentimentBar from '@/components/ui/SentimentBar';
import { competitors } from '@/data/competitors';

export default function SentimentBars() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 4 }}>
        {[
          { label: 'Positive', color: '#10b981' },
          { label: 'Neutral',  color: '#cbd5e1' },
          { label: 'Negative', color: '#f87171' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} />
            <span style={{ fontSize: 10.5, color: '#94a3b8' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {competitors.map(c => (
        <SentimentBar
          key={c.id}
          label={c.name}
          labelColor={c.color}
          positive={c.sentiment.positive}
          neutral={c.sentiment.neutral}
          negative={c.sentiment.negative}
        />
      ))}
    </div>
  );
}

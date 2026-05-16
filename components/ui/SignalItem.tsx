import Badge, { type BadgeVariant } from './Badge';

const SOURCE_META: Record<string, { label: string; bg: string; color: string }> = {
  blog:        { label: 'Blog',         bg: '#eff6ff', color: '#0f62fe' },
  twitter:     { label: 'Twitter/X',    bg: '#f0f9ff', color: '#0ea5e9' },
  reddit:      { label: 'Reddit',       bg: '#fff7ed', color: '#ea580c' },
  g2:          { label: 'G2',           bg: '#f0fdf4', color: '#16a34a' },
  trustradius: { label: 'TrustRadius',  bg: '#faf5ff', color: '#7c3aed' },
  gartner:     { label: 'Gartner',      bg: '#eff6ff', color: '#1e40af' },
  'tech-media':{ label: 'Tech Media',   bg: '#ecfeff', color: '#0891b2' },
  community:   { label: 'Community',    bg: '#eef2ff', color: '#4f46e5' },
  github:      { label: 'GitHub',       bg: '#f8fafc', color: '#374151' },
};

type SignalItemProps = {
  source: string;
  title: string;
  summary: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
  publishedAt: string;
  competitorName: string;
  competitorColor: string;
};

const URGENCY_MAP: Record<string, BadgeVariant> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'low',
};

const SENTIMENT_STYLE: Record<string, { color: string; label: string }> = {
  positive: { color: '#10b981', label: 'Positive' },
  neutral:  { color: '#94a3b8', label: 'Neutral'  },
  negative: { color: '#f87171', label: 'Negative' },
};

export default function SignalItem({
  source, title, summary, urgency, sentiment, tags, publishedAt, competitorName, competitorColor,
}: SignalItemProps) {
  const src = SOURCE_META[source] ?? { label: source, bg: '#f8fafc', color: '#64748b' };
  const sent = SENTIMENT_STYLE[sentiment];

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 10.5, fontWeight: 700, padding: '2px 8px',
            borderRadius: 4, background: src.bg, color: src.color,
            letterSpacing: '0.03em',
          }}
        >
          {src.label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: competitorColor, display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{competitorName}</span>
        </div>
        <Badge variant={URGENCY_MAP[urgency]}>
          {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
        </Badge>
        <span style={{ fontSize: 11, color: sent.color, fontWeight: 600, marginLeft: 'auto' }}>
          ● {sent.label}
        </span>
        <span style={{ fontSize: 10.5, color: '#94a3b8' }}>{publishedAt}</span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{title}</div>

      {/* Summary */}
      <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.6 }}>{summary}</p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tags.slice(0, 4).map(tag => (
          <span
            key={tag}
            style={{
              fontSize: 10, color: '#64748b', background: '#f8fafc',
              border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 6px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

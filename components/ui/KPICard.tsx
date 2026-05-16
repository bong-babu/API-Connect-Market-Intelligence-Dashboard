import Badge, { type BadgeVariant } from './Badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type KPICardProps = {
  title: string;
  value: string | number;
  description: string;
  type: 'leading' | 'lagging';
  owner: string;
  accentColor: string;
  trend: 'up' | 'down' | 'flat';
  trendIsGood: boolean;
  delta?: string;
};

export default function KPICard({
  title, value, description, type, owner, accentColor, trend, trendIsGood, delta,
}: KPICardProps) {
  const trendColor = trendIsGood
    ? '#10b981'
    : trend === 'flat' ? '#94a3b8' : '#dc2626';

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 10,
        borderTop: `3px solid ${accentColor}`,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minWidth: 0,
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: '#64748b', lineHeight: 1.4 }}>
          {title}
        </span>
        <Badge variant={type as BadgeVariant}>
          {type === 'leading' ? 'Leading' : 'Lagging'}
        </Badge>
      </div>

      {/* Value row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <span style={{ fontSize: 34, fontWeight: 700, color: accentColor, lineHeight: 1, letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {delta && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              marginBottom: 5,
              color: trendColor,
            }}
          >
            <TrendIcon size={13} strokeWidth={2.5} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>{delta}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 11.5, color: '#64748b', margin: 0, lineHeight: 1.55 }}>
        {description}
      </p>

      {/* Owner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: '#94a3b8' }}>Owner</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b' }}>{owner}</span>
      </div>
    </div>
  );
}

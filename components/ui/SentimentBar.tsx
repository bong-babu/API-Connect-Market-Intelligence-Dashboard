'use client';

import { useState } from 'react';

type Segment = { key: string; label: string; value: number; color: string };

type SentimentBarProps = {
  positive: number;
  neutral: number;
  negative: number;
  label?: string;
  labelColor?: string;
  height?: number;
};

const SEGMENTS: Array<Pick<Segment, 'key' | 'label' | 'color'>> = [
  { key: 'positive', label: 'Positive', color: '#10b981' },
  { key: 'neutral',  label: 'Neutral',  color: '#cbd5e1' },
  { key: 'negative', label: 'Negative', color: '#f87171' },
];

export default function SentimentBar({
  positive, neutral, negative, label, labelColor, height = 18,
}: SentimentBarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const segments: Segment[] = [
    { ...SEGMENTS[0], value: positive },
    { ...SEGMENTS[1], value: neutral },
    { ...SEGMENTS[2], value: negative },
  ];

  const hoveredSeg = segments.find(s => s.key === hovered);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
      {/* Label */}
      {label && (
        <div
          style={{
            width: 92,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            flexShrink: 0,
          }}
        >
          {labelColor && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: labelColor,
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
          )}
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {label}
          </span>
        </div>
      )}

      {/* Bar */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          style={{
            height,
            display: 'flex',
            borderRadius: 5,
            overflow: 'hidden',
            gap: 1,
          }}
        >
          {segments.map(seg => (
            <div
              key={seg.key}
              onMouseEnter={() => setHovered(seg.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: `${seg.value}%`,
                background: seg.color,
                height: '100%',
                cursor: 'default',
                opacity: hovered && hovered !== seg.key ? 0.45 : 1,
                transition: 'opacity 0.12s',
              }}
            />
          ))}
        </div>

        {/* Tooltip */}
        {hoveredSeg && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: 6,
              background: '#0f172a',
              color: '#f8fafc',
              borderRadius: 6,
              padding: '4px 9px',
              fontSize: 11,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              zIndex: 50,
              pointerEvents: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            {hoveredSeg.label}: {hoveredSeg.value}%
          </div>
        )}
      </div>

      {/* Numeric labels */}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#10b981' }}>{positive}%</span>
        <span style={{ fontSize: 10, color: '#94a3b8' }}>{neutral}%</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#f87171' }}>{negative}%</span>
      </div>
    </div>
  );
}

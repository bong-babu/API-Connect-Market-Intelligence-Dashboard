'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { name: 'Competitor Channels', value: 32, color: '#0f62fe' },
  { name: 'Reviews',             value: 28, color: '#8b5cf6' },
  { name: 'Community',           value: 22, color: '#10b981' },
  { name: 'Tech Media',          value: 18, color: '#f59e0b' },
];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#0f172a',
        color: '#f8fafc',
        borderRadius: 7,
        padding: '6px 10px',
        fontSize: 11.5,
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}
    >
      {payload[0].name}: {payload[0].value}%
    </div>
  );
}

export default function DonutChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={DATA}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={78}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {DATA.map(entry => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 16px',
          marginTop: 4,
        }}
      >
        {DATA.map(entry => (
          <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: entry.color,
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>
              {entry.name}
              <span style={{ fontWeight: 700, color: '#0f172a', marginLeft: 4 }}>
                {entry.value}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

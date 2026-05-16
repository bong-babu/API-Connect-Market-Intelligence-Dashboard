'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';

const DATA = [
  { week: 'Apr 14', Kong: 4, Apigee: 3, MuleSoft: 2, Solo: 1, Boomi: 1 },
  { week: 'Apr 21', Kong: 5, Apigee: 4, MuleSoft: 3, Solo: 2, Boomi: 1 },
  { week: 'Apr 28', Kong: 6, Apigee: 4, MuleSoft: 4, Solo: 2, Boomi: 2 },
  { week: 'May 05', Kong: 7, Apigee: 5, MuleSoft: 4, Solo: 3, Boomi: 1 },
  { week: 'May 12', Kong: 12, Apigee: 7, MuleSoft: 5, Solo: 4, Boomi: 2 },
];

const BARS = [
  { key: 'Kong',     color: '#dc2626' },
  { key: 'Apigee',   color: '#3b82f6' },
  { key: 'MuleSoft', color: '#8b5cf6' },
  { key: 'Solo',     color: '#10b981' },
  { key: 'Boomi',    color: '#f59e0b' },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ name: string; value: number; fill: string }>; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0f172a', borderRadius: 8, padding: '10px 14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
        Week of {label}
      </div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.fill, display: 'inline-block' }} />
          <span style={{ fontSize: 11.5, color: '#f8fafc' }}>{p.name}: <strong>{p.value}</strong></span>
        </div>
      ))}
    </div>
  );
}

export default function MentionVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={DATA} barCategoryGap="30%" barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={28} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
        <Legend
          iconType="square"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, color: '#64748b', paddingTop: 8 }}
        />
        {BARS.map(b => (
          <Bar key={b.key} dataKey={b.key} fill={b.color} radius={[3, 3, 0, 0]} maxBarSize={16} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

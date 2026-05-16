import { BookOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { kpis } from '@/data/kpis';

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; label: string }> = {
  'on-track':  { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', label: 'On Track'  },
  'at-risk':   { bg: '#fffbeb', color: '#d97706', border: '#fde68a', label: 'At Risk'   },
  'off-track': { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', label: 'Off Track' },
};

const FREQ_LABELS: Record<string, string> = {
  daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', quarterly: 'Quarterly',
};

function MiniGauge({ current, target, previous }: { current: number; target: number; previous: number }) {
  const min = 0;
  const max = Math.max(current, target, previous) * 1.2;
  const pctCurrent  = Math.min((current  - min) / (max - min) * 100, 100);
  const pctTarget   = Math.min((target   - min) / (max - min) * 100, 100);
  const pctPrevious = Math.min((previous - min) / (max - min) * 100, 100);
  return (
    <div style={{ position: 'relative', height: 10, background: '#f1f5f9', borderRadius: 5, overflow: 'visible' }}>
      {/* Previous marker */}
      <div style={{
        position: 'absolute', left: `${pctPrevious}%`, top: -2, width: 2, height: 14,
        background: '#cbd5e1', borderRadius: 1, transform: 'translateX(-50%)',
      }} />
      {/* Target marker */}
      <div style={{
        position: 'absolute', left: `${pctTarget}%`, top: -3, width: 2, height: 16,
        background: '#10b981', borderRadius: 1, transform: 'translateX(-50%)',
      }} />
      {/* Current fill */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: `${pctCurrent}%`, height: '100%',
        background: '#0f62fe', borderRadius: 5, transition: 'width 0.4s',
      }} />
    </div>
  );
}

export default function KpiDictionaryPage() {
  const byCategory = kpis.reduce<Record<string, typeof kpis>>((acc, kpi) => {
    if (!acc[kpi.category]) acc[kpi.category] = [];
    acc[kpi.category].push(kpi);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1400 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={18} color="#0f62fe" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>KPI Dictionary</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>12 KPIs with full definitions, formulas, and current tracking data</p>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'On Track',  value: kpis.filter(k => k.status === 'on-track').length,  color: '#16a34a', bg: '#f0fdf4' },
          { label: 'At Risk',   value: kpis.filter(k => k.status === 'at-risk').length,   color: '#d97706', bg: '#fffbeb' },
          { label: 'Off Track', value: kpis.filter(k => k.status === 'off-track').length, color: '#dc2626', bg: '#fef2f2' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* KPIs grouped by category */}
      {Object.entries(byCategory).map(([category, catKpis]) => (
        <div key={category}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            {category}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {catKpis.map(kpi => {
              const status = STATUS_STYLE[kpi.status];
              const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
              const trendColor = kpi.trendIsGood ? '#10b981' : kpi.trend === 'flat' ? '#94a3b8' : '#dc2626';
              const delta = kpi.currentValue - kpi.previousValue;

              return (
                <div key={kpi.id} style={{
                  background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10,
                  padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14,
                }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{kpi.name}</span>
                        <Badge variant={kpi.type}>{kpi.type === 'leading' ? 'Leading' : 'Lagging'}</Badge>
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: '#64748b', lineHeight: 1.55 }}>{kpi.description}</p>
                    </div>
                    <div style={{
                      flexShrink: 0, padding: '6px 10px', borderRadius: 7,
                      background: status.bg, border: `1px solid ${status.border}`,
                      fontSize: 11, fontWeight: 700, color: status.color, whiteSpace: 'nowrap',
                    }}>
                      {status.label}
                    </div>
                  </div>

                  {/* Values */}
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>Current</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                          {kpi.currentValue}
                        </span>
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>{kpi.unit}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: trendColor }}>
                          <TrendIcon size={13} strokeWidth={2.5} />
                          <span style={{ fontSize: 11, fontWeight: 600 }}>
                            {delta > 0 ? '+' : ''}{typeof delta === 'number' && !isNaN(delta) ? delta.toFixed(Math.abs(delta) < 1 ? 2 : 0) : delta}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>
                      <div>Prev: <strong style={{ color: '#64748b' }}>{kpi.previousValue}</strong></div>
                      <div>Target: <strong style={{ color: '#10b981' }}>{kpi.targetValue}</strong></div>
                    </div>
                  </div>

                  {/* Mini gauge */}
                  <div>
                    <MiniGauge current={Math.abs(kpi.currentValue)} target={Math.abs(kpi.targetValue)} previous={Math.abs(kpi.previousValue)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9.5, color: '#94a3b8' }}>
                      <span>━ Previous</span>
                      <span style={{ color: '#10b981' }}>━ Target</span>
                      <span style={{ color: '#0f62fe' }}>━ Current</span>
                    </div>
                  </div>

                  {/* Metadata grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                    {[
                      { label: 'Owner',          value: kpi.owner },
                      { label: 'Update Freq.',   value: FREQ_LABELS[kpi.updateFrequency] },
                      { label: 'Data Source',    value: kpi.dataSource },
                      { label: 'Formula',        value: kpi.formula },
                    ].map(row => (
                      <div key={row.label}>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                          {row.label}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#0f172a', lineHeight: 1.5 }}>{row.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {kpi.notes && (
                    <div style={{ fontSize: 11.5, color: '#64748b', background: '#f8fafc', borderRadius: 6, padding: '8px 10px', borderLeft: '3px solid #e2e8f0', lineHeight: 1.5 }}>
                      <strong style={{ color: '#0f172a' }}>Note: </strong>{kpi.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

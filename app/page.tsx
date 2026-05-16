import { FileText, Shield, Video, Scroll, AlertTriangle, TrendingUp, ExternalLink } from 'lucide-react';
import KPICard from '@/components/ui/KPICard';
import Badge from '@/components/ui/Badge';
import ActionItem from '@/components/ui/ActionItem';
import SentimentBars from '@/components/charts/SentimentBars';
import DonutChart from '@/components/charts/DonutChart';
import { competitors } from '@/data/competitors';
import { kpis } from '@/data/kpis';
import { recommendations } from '@/data/recommendations';
import { topics } from '@/data/topics';

const KPI_CONFIG = [
  {
    id: 'k01',
    accentColor: '#dc2626',
    displayValue: '82',
    delta: '+5 WoW',
    trend: 'up' as const,
    trendIsGood: false,
  },
  {
    id: 'k02',
    accentColor: '#d97706',
    displayValue: '68',
    delta: '+5 MoM',
    trend: 'up' as const,
    trendIsGood: false,
  },
  {
    id: 'k03',
    accentColor: '#dc2626',
    displayValue: '-0.08',
    delta: '-0.03 WoW',
    trend: 'down' as const,
    trendIsGood: false,
  },
  {
    id: 'k04',
    accentColor: '#10b981',
    displayValue: '10',
    delta: '+3 WoW',
    trend: 'up' as const,
    trendIsGood: false,
  },
];

const ACTION_ICONS: Record<string, React.ReactNode> = {
  blog:              <FileText size={15} strokeWidth={1.8} />,
  'demo-video':      <Video size={15} strokeWidth={1.8} />,
  'white-paper':     <Scroll size={15} strokeWidth={1.8} />,
  'battle-card':     <Shield size={15} strokeWidth={1.8} />,
  'comparison-page': <TrendingUp size={15} strokeWidth={1.8} />,
  tutorial:          <FileText size={15} strokeWidth={1.8} />,
  webinar:           <AlertTriangle size={15} strokeWidth={1.8} />,
  'case-study':      <ExternalLink size={15} strokeWidth={1.8} />,
};

function urgencyFromScore(score: number): 'critical' | 'high' | 'medium' | 'low' {
  if (score >= 90) return 'critical';
  if (score >= 80) return 'high';
  if (score >= 70) return 'medium';
  return 'low';
}

const CONFIDENCE_COLOR: Record<string, string> = {
  high: '#10b981', medium: '#f59e0b', low: '#dc2626',
};

const ACTION_VARIANT = {
  escalate: 'escalate',
  monitor: 'monitor',
  watch: 'watch',
} as const;

export default function OverviewPage() {
  const topActions = [...recommendations]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 4);

  const topTopics = [...topics]
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* ── Weekly Intelligence Brief ── */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderLeft: '4px solid #0f62fe',
          borderRadius: 10,
          padding: '16px 20px',
          display: 'flex',
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0f62fe', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Weekly Intelligence Brief
            </span>
            <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Week of 12 May 2026</span>
          </div>
          <p style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.7, margin: 0 }}>
            <strong>Kong&apos;s AI Gateway</strong> hit 1M downloads and entered the Gartner Leaders quadrant — the
            highest-urgency competitive event this quarter. IBM&apos;s Competitive Threat Score rose to{' '}
            <strong style={{ color: '#dc2626' }}>82/100</strong> (+5 WoW), driven by Kong&apos;s IBM-targeted migration tooling and
            a Deutsche Bank displacement. Apigee&apos;s Gemini-powered portal is widening the AI feature gap.{' '}
            <strong>10 recommended actions</strong> require immediate owner assignment. Primary risk vectors: AI gateway
            capability gap and developer portal NPS deficit.
          </p>
        </div>
        <div
          style={{
            flexShrink: 0,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '10px 16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, color: '#dc2626', lineHeight: 1 }}>82</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>Threat Score</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#dc2626', marginTop: 2 }}>↑ +5 WoW</div>
        </div>
      </div>

      {/* ── 4 KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {KPI_CONFIG.map(cfg => {
          const kpi = kpis.find(k => k.id === cfg.id)!;
          return (
            <KPICard
              key={cfg.id}
              title={kpi.name}
              value={cfg.displayValue}
              description={kpi.description}
              type={kpi.type}
              owner={kpi.owner}
              accentColor={cfg.accentColor}
              trend={cfg.trend}
              trendIsGood={cfg.trendIsGood}
              delta={cfg.delta}
            />
          );
        })}
      </div>

      {/* ── Row 3: Competitor Pressure Board + Top Actions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 16 }}>

        {/* Competitor Pressure Board */}
        <Card title="Competitor Pressure Board" subtitle="5 tracked · updated 14 May 2026">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Competitor', 'Threat Score', 'Top Topic', 'Confidence', 'Action'].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '0 10px 10px',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < competitors.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  {/* Name */}
                  <td style={{ padding: '11px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: c.color, display: 'inline-block', flexShrink: 0,
                        }}
                      />
                      <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{c.name}</span>
                    </div>
                  </td>

                  {/* Threat bar */}
                  <td style={{ padding: '11px 10px', minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 7, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${c.threatScore}%`,
                            height: '100%',
                            background: c.threatScore >= 80 ? '#dc2626' : c.threatScore >= 65 ? '#f59e0b' : '#10b981',
                            borderRadius: 4,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', minWidth: 22 }}>{c.threatScore}</span>
                      <span style={{ fontSize: 10, color: c.threatDelta > 0 ? '#dc2626' : '#10b981', fontWeight: 600, minWidth: 24 }}>
                        {c.threatDelta > 0 ? `+${c.threatDelta}` : c.threatDelta}
                      </span>
                    </div>
                  </td>

                  {/* Top topic */}
                  <td style={{ padding: '11px 10px', maxWidth: 160 }}>
                    <span style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.4, display: 'block' }}>
                      {c.topTopics[0]}
                    </span>
                  </td>

                  {/* Confidence dot */}
                  <td style={{ padding: '11px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: CONFIDENCE_COLOR[c.confidence], display: 'inline-block',
                        }}
                      />
                      <span style={{ fontSize: 11, color: '#64748b', textTransform: 'capitalize' }}>
                        {c.confidence}
                      </span>
                    </div>
                  </td>

                  {/* Action badge */}
                  <td style={{ padding: '11px 10px' }}>
                    <Badge variant={ACTION_VARIANT[c.action]}>
                      {c.action.charAt(0).toUpperCase() + c.action.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Top Actions This Week */}
        <Card title="Top Actions This Week" subtitle="10 open · sorted by priority score">
          <div>
            {topActions.map(rec => (
              <ActionItem
                key={rec.id}
                icon={ACTION_ICONS[rec.type] ?? <FileText size={15} strokeWidth={1.8} />}
                title={rec.title}
                urgency={urgencyFromScore(rec.priorityScore)}
                description={rec.rationale}
                owner={rec.owner}
                priorityScore={rec.priorityScore}
                dueDate={rec.dueDate}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 4: Sentiment Bars + Topics + Donut ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 0.7fr', gap: 16 }}>

        {/* Review Sentiment Bars */}
        <Card title="Review Sentiment by Competitor" subtitle="G2 · TrustRadius · Gartner PI">
          <SentimentBars />
        </Card>

        {/* Top Recommended Topics */}
        <Card title="Top Recommended Topics" subtitle="Sorted by opportunity score">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Topic', 'Score', 'Owner', 'Channel'].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '0 8px 10px',
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topTopics.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < topTopics.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <td style={{ padding: '9px 8px' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#0f172a', lineHeight: 1.35, display: 'block' }}>
                      {t.topic}
                    </span>
                  </td>
                  <td style={{ padding: '9px 8px', minWidth: 90 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 52, height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                        <div
                          style={{
                            width: `${t.opportunityScore}%`,
                            height: '100%',
                            background: t.opportunityScore >= 90 ? '#0f62fe' : t.opportunityScore >= 75 ? '#8b5cf6' : '#10b981',
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{t.opportunityScore}</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 8px' }}>
                    <span
                      style={{
                        fontSize: 10, background: '#f0f9ff', color: '#0369a1',
                        border: '1px solid #bae6fd', borderRadius: 20,
                        padding: '1px 6px', fontWeight: 600, whiteSpace: 'nowrap',
                        display: 'inline-block',
                      }}
                    >
                      {t.owner.split(' ')[0]}
                    </span>
                  </td>
                  <td style={{ padding: '9px 8px' }}>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{t.channel[0]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Source Mix Donut */}
        <Card title="Source Mix" subtitle="Signal distribution by channel">
          <DonutChart />
        </Card>
      </div>

    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 10,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

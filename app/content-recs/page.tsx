import { Lightbulb, FileText, Video, Scroll, Shield, TrendingUp, ExternalLink, Radio, Code } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { recommendations } from '@/data/recommendations';
import { competitors } from '@/data/competitors';

const TYPE_META: Record<string, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  blog:              { label: 'Blog Post',       icon: <FileText size={14} strokeWidth={1.8} />,    bg: '#eff6ff', color: '#0f62fe' },
  'white-paper':     { label: 'White Paper',     icon: <Scroll size={14} strokeWidth={1.8} />,      bg: '#faf5ff', color: '#7c3aed' },
  'demo-video':      { label: 'Demo Video',      icon: <Video size={14} strokeWidth={1.8} />,       bg: '#f0fdf4', color: '#16a34a' },
  'battle-card':     { label: 'Battle Card',     icon: <Shield size={14} strokeWidth={1.8} />,      bg: '#fef2f2', color: '#dc2626' },
  'comparison-page': { label: 'Comparison Page', icon: <TrendingUp size={14} strokeWidth={1.8} />,  bg: '#fffbeb', color: '#d97706' },
  tutorial:          { label: 'Tutorial',        icon: <Code size={14} strokeWidth={1.8} />,        bg: '#f0fdf4', color: '#0891b2' },
  webinar:           { label: 'Webinar',         icon: <Radio size={14} strokeWidth={1.8} />,       bg: '#eff6ff', color: '#0f62fe' },
  'case-study':      { label: 'Case Study',      icon: <ExternalLink size={14} strokeWidth={1.8} />,bg: '#fafafa', color: '#374151' },
};

const IMPACT_BADGE = { high: 'high', medium: 'medium', low: 'low' } as const;

const COMP_MAP = Object.fromEntries(competitors.map(c => [c.id, { name: c.name, color: c.color }]));

function PriorityRing({ score }: { score: number }) {
  const color = score >= 90 ? '#dc2626' : score >= 80 ? '#d97706' : score >= 70 ? '#0f62fe' : '#10b981';
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={52} height={52} viewBox="0 0 52 52">
      <circle cx={26} cy={26} r={r} fill="none" stroke="#f1f5f9" strokeWidth={5} />
      <circle
        cx={26} cy={26} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize={11} fontWeight={800} fill={color}>
        {score}
      </text>
    </svg>
  );
}

const sorted = [...recommendations].sort((a, b) => b.priorityScore - a.priorityScore);

export default function ContentRecsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1400 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lightbulb size={18} color="#d97706" strokeWidth={1.8} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Content Recommendations</h1>
          <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>10 strategic content actions · sorted by priority score</p>
        </div>
      </div>

      {/* Priority summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Critical (90+)',  count: sorted.filter(r => r.priorityScore >= 90).length, color: '#dc2626', bg: '#fef2f2' },
          { label: 'High (80-89)',    count: sorted.filter(r => r.priorityScore >= 80 && r.priorityScore < 90).length, color: '#d97706', bg: '#fffbeb' },
          { label: 'Medium (70-79)', count: sorted.filter(r => r.priorityScore >= 70 && r.priorityScore < 80).length, color: '#0f62fe', bg: '#eff6ff' },
          { label: 'Lower (<70)',     count: sorted.filter(r => r.priorityScore < 70).length, color: '#10b981', bg: '#f0fdf4' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.count}</span>
            </div>
            <span style={{ fontSize: 12, color: '#64748b' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recommendation cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sorted.map((rec, i) => {
          const type = TYPE_META[rec.type] ?? { label: rec.type, icon: <FileText size={14} />, bg: '#f8fafc', color: '#64748b' };
          return (
            <div key={rec.id} style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 22px',
              display: 'flex', gap: 18, alignItems: 'flex-start',
            }}>
              {/* Priority ring */}
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <PriorityRing score={rec.priorityScore} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: type.bg, color: type.color }}>
                    {type.icon} {type.label}
                  </span>
                  <Badge variant={IMPACT_BADGE[rec.estimatedImpact]}>
                    {rec.estimatedImpact.charAt(0).toUpperCase() + rec.estimatedImpact.slice(1)} Impact
                  </Badge>
                  <span style={{ fontSize: 10.5, color: '#94a3b8', marginLeft: 'auto' }}>Due {rec.dueDate}</span>
                </div>

                <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                  {i + 1}. {rec.title}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: 12.5, color: '#64748b', lineHeight: 1.6 }}>
                  {rec.rationale}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 1fr', gap: '10px 24px', alignItems: 'start', flexWrap: 'wrap' }}>
                  {/* Angle */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Angle</div>
                    <p style={{ margin: 0, fontSize: 11.5, color: '#0f172a', lineHeight: 1.5, maxWidth: 320 }}>{rec.suggestedAngle}</p>
                  </div>

                  {/* Owner */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Owner</div>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0f62fe' }}>{rec.owner}</span>
                  </div>

                  {/* Competitors targeted */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Targets</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {rec.competitorsTargeted.map(cId => {
                        const c = COMP_MAP[cId];
                        return c ? (
                          <span key={cId} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b' }}>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
                            {c.name.split(' ')[0]}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Channels */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Channels</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {rec.channel.slice(0, 3).map(ch => (
                        <span key={ch} style={{ fontSize: 10.5, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 6px' }}>
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>Keywords:</span>
                  {rec.keywords.map(kw => (
                    <span key={kw} style={{ fontSize: 10, color: '#0f62fe', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 3, padding: '1px 5px' }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

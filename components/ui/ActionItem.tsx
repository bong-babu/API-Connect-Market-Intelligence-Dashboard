import Badge, { type BadgeVariant } from './Badge';

type ActionItemProps = {
  icon: React.ReactNode;
  title: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  owner: string;
  priorityScore: number;
  dueDate?: string;
};

const URGENCY_LABEL: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export default function ActionItem({
  icon, title, urgency, description, owner, priorityScore, dueDate,
}: ActionItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '13px 0',
        borderBottom: '1px solid #f1f5f9',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#64748b',
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>
            {title}
          </span>
          <Badge variant={urgency as BadgeVariant}>{URGENCY_LABEL[urgency]}</Badge>
        </div>
        <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 8px', lineHeight: 1.5 }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 10.5,
              background: '#f0f9ff',
              color: '#0369a1',
              border: '1px solid #bae6fd',
              borderRadius: 20,
              padding: '1px 7px',
              fontWeight: 600,
            }}
          >
            {owner}
          </span>
          <span
            style={{
              fontSize: 10.5,
              background: '#faf5ff',
              color: '#7c3aed',
              border: '1px solid #ddd6fe',
              borderRadius: 20,
              padding: '1px 7px',
              fontWeight: 600,
            }}
          >
            P-Score: {priorityScore}
          </span>
          {dueDate && (
            <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Due {dueDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}

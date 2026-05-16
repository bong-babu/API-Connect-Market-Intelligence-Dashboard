export type BadgeVariant =
  | 'leading' | 'lagging'
  | 'critical' | 'high' | 'medium' | 'low'
  | 'escalate' | 'monitor' | 'watch'
  | 'success' | 'neutral' | 'warning';

const STYLES: Record<BadgeVariant, React.CSSProperties> = {
  leading:  { background: '#eff6ff', color: '#0f62fe', border: '1px solid #bfdbfe' },
  lagging:  { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' },
  critical: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
  high:     { background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' },
  medium:   { background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
  low:      { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' },
  escalate: { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' },
  monitor:  { background: '#eff6ff', color: '#0f62fe', border: '1px solid #bfdbfe' },
  watch:    { background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
  success:  { background: '#f0fdf4', color: '#10b981', border: '1px solid #a7f3d0' },
  neutral:  { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' },
  warning:  { background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
};

export default function Badge({ children, variant = 'neutral', size = 'sm' }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        borderRadius: 20,
        fontSize: size === 'sm' ? 10.5 : 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        lineHeight: 1.5,
        ...STYLES[variant],
      }}
    >
      {children}
    </span>
  );
}

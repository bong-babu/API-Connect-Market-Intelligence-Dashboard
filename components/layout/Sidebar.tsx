'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Radio,
  GitCompare,
  Swords,
  Star,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',                label: 'Overview',      icon: LayoutDashboard },
  { href: '/signal-monitor', label: 'Signal Monitor', icon: Radio },
  { href: '/feature-gaps',   label: 'Feature Gaps',  icon: GitCompare },
  { href: '/competitors',    label: 'Competitors',    icon: Swords },
  { href: '/review-intel',   label: 'Review Intel',  icon: Star },
  { href: '/content-recs',   label: 'Content Recs',  icon: Lightbulb },
  { href: '/kpi-dictionary', label: 'KPI Dictionary', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 175,
        minWidth: 175,
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: '#0f62fe',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="8" cy="8" r="7.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.25" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', letterSpacing: '0.04em', lineHeight: 1.2 }}>
              SignalOps
            </div>
            <div style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '0.02em', lineHeight: 1.2 }}>
              API Connect MI
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 8px 8px' }}>
          Intelligence
        </div>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 10px',
                borderRadius: 6,
                marginBottom: 2,
                textDecoration: 'none',
                background: isActive ? '#eff6ff' : 'transparent',
                color: isActive ? '#0f62fe' : '#64748b',
                fontWeight: isActive ? 600 : 400,
                fontSize: 12.5,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <Icon
                size={15}
                strokeWidth={isActive ? 2.2 : 1.8}
                style={{ flexShrink: 0, color: isActive ? '#0f62fe' : '#94a3b8' }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #e2e8f0',
          fontSize: 10,
          color: '#94a3b8',
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontWeight: 600, color: '#64748b', marginBottom: 2 }}>IBM API Connect</div>
        <div>Market Intelligence</div>
        <div style={{ marginTop: 6, color: '#cbd5e1', fontSize: 9 }}>v1.0 · 2026</div>
      </div>
    </aside>
  );
}

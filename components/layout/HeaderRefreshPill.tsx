'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

function formatAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  const h = Math.round(minutes / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

export default function HeaderRefreshPill() {
  const [ageMinutes, setAgeMinutes] = useState<number | null>(null);
  const [fresh, setFresh] = useState(true);

  useEffect(() => {
    fetch('/api/last-updated')
      .then(r => r.json())
      .then(json => {
        setAgeMinutes(json.ageMinutes ?? null);
        setFresh(json.fresh ?? true);
      })
      .catch(() => {});
  }, []);

  if (ageMinutes === null) return null;

  const color  = fresh ? '#64748b' : ageMinutes < 2880 ? '#d97706' : '#dc2626';
  const label  = `Updated ${formatAge(ageMinutes)}`;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 9px',
        borderRadius: 20,
        background: fresh ? '#f8fafc' : ageMinutes < 2880 ? '#fffbeb' : '#fef2f2',
        border: `1px solid ${fresh ? '#e2e8f0' : ageMinutes < 2880 ? '#fde68a' : '#fecaca'}`,
      }}
    >
      <RefreshCw size={10} color={color} strokeWidth={2.5} />
      <span style={{ fontSize: 11, color, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

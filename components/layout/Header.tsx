import { Bell, Settings, Search } from 'lucide-react';

export default function Header() {
  return (
    <header
      style={{
        height: 56,
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 16,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Title */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
            API Connect
          </span>
          <span style={{ color: '#cbd5e1', fontSize: 14 }}>·</span>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            Market Intelligence Command Centre
          </span>

          {/* Live signal pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 20,
              padding: '3px 10px',
              marginLeft: 4,
            }}
          >
            <LiveDot />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981', letterSpacing: '0.02em' }}>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconButton aria-label="Search">
          <Search size={16} strokeWidth={1.8} />
        </IconButton>
        <IconButton aria-label="Notifications">
          <Bell size={16} strokeWidth={1.8} />
        </IconButton>
        <IconButton aria-label="Settings">
          <Settings size={16} strokeWidth={1.8} />
        </IconButton>

        {/* Avatar */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#0f62fe',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            marginLeft: 4,
            flexShrink: 0,
          }}
        >
          PM
        </div>
      </div>
    </header>
  );
}

function LiveDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .live-ping {
          animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;
        }
      `}</style>
      <span
        className="live-ping"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: '#10b981',
          opacity: 0.75,
        }}
      />
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#10b981',
        }}
      />
    </span>
  );
}

function IconButton({ children, 'aria-label': ariaLabel }: { children: React.ReactNode; 'aria-label': string }) {
  return (
    <button
      aria-label={ariaLabel}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        border: 'none',
        background: 'transparent',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

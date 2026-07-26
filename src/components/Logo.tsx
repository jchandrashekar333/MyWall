import React from 'react'

export function Logo({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', ...style }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#5840FF"/>
        <rect x="4" y="5" width="9" height="6" rx="2" fill="white"/>
        <rect x="14" y="5" width="6" height="6" rx="2" fill="#C2BBFF"/>
        <rect x="4" y="12" width="6" height="6" rx="2" fill="#C2BBFF"/>
        <rect x="11" y="12" width="9" height="6" rx="2" fill="white"/>
      </svg>
      <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em', color: '#0f172a' }}>
        Mywall
      </span>
    </div>
  )
}
